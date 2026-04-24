const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Property = require('../models/Property');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const { sendBookingConfirmationEmail, notifyAdminOfBooking } = require('../utils/emailService');

// Get bookings for a user (Secured)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });
        const bookings = await Booking.find({ userId: userId }).populate('propertyId');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a booking (Secured & Dynamic Email)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; 
        if (!userId) {
            console.error('UserId missing from token payload:', req.user);
            return res.status(401).json({ message: 'User identification failed. Please re-login.' });
        }
        const { propertyId, checkIn, checkOut, guests } = req.body;

        // 1. Fetch user email dynamically from DB
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // 2. Clear property details
        const property = await Property.findById(propertyId);
        if (!property) return res.status(404).json({ message: 'Property not found' });

        // 3. Logic for Emergency (if check-in is within 2 days)
        const checkInDate = new Date(checkIn);
        const today = new Date();
        const diffDays = Math.ceil((checkInDate - today) / (1000 * 60 * 60 * 24));
        const isEmergency = diffDays <= 2;

        // 4. Save Booking
        const booking = new Booking({
            propertyId,
            userId,
            checkIn,
            checkOut,
            guests,
            isEmergency,
            status: 'pending'
        });
        const newBooking = await booking.save();

        // 5. Automation: Confirm after delay (Simulated with Timeout for Demo)
        // In production, use BullMQ/Cron.
        const delayMs = isEmergency ? 30 * 60 * 1000 : 10 * 60 * 60 * 1000;
        
        setTimeout(async () => {
             try {
                const b = await Booking.findById(newBooking._id);
                if (b && b.status === 'pending') {
                    b.status = 'confirmed';
                    b.confirmedAt = new Date();
                    await b.save();
                    
                    // Send Confirmation Emails now
                    sendBookingConfirmationEmail(user.email, b, property);
                    console.log(`[AUTO-PILOT] Booking ${b._id} confirmed after ${isEmergency ? '30m' : '10h'} delay.`);
                }
             } catch (err) {
                 console.error('Auto-confirmation error:', err.message);
             }
        }, delayMs);

        // Notify Admin immediately of the REQUEST
        notifyAdminOfBooking(property, newBooking, user.email);

        res.status(201).json(newBooking);
    } catch (err) {
        console.error('Booking Process Error:', err.message);
        res.status(400).json({ message: err.message });
    }
});

// Cancel a booking (24h rule)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        // Security check: only the owner can cancel
        if (booking.userId !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const now = new Date();
        const createdTime = new Date(booking.createdAt);
        const diffInHours = (now - createdTime) / (1000 * 60 * 60);

        if (diffInHours > 24) {
            return res.status(403).json({ message: 'Cancellation window (24 hours) has expired.' });
        }

        await Booking.findByIdAndDelete(req.params.id);
        res.json({ message: 'Booking cancelled successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
