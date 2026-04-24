const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

/**
 * Sends a professional confirmation email to the customer
 */
const sendBookingConfirmationEmail = async (userEmail, bookingDetails, property) => {
    if (!process.env.EMAIL_USER || process.env.EMAIL_USER.includes('your-email')) {
        console.warn('--- NODEMAILER: Skipping user email (Placeholder credentials used) ---');
        return;
    }

    const mailOptions = {
        from: `"Veedoo Luxury" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: `Confirmed: Your Stay at ${property.title}`,
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #f1f5f9; border-radius: 20px; overflow: hidden;">
                <div style="background-color: #0f172a; padding: 40px; text-align: center;">
                    <img src="https://via.placeholder.com/150x50/0f172a/f97316?text=VEEDOO" alt="Veedoo" style="margin-bottom: 20px;">
                    <h1 style="color: #f97316; margin: 0; font-size: 24px; letter-spacing: -1px;">BOOKING CONFIRMED</h1>
                </div>
                <div style="padding: 40px; background-color: #ffffff;">
                    <p style="font-size: 16px; color: #475569; line-height: 1.6;">Your stay is locked in! We're excited to host you at <strong>${property.title}</strong>.</p>
                    
                    <div style="background-color: #f8fafc; border-radius: 16px; padding: 25px; margin: 30px 0; border: 1px solid #f1f5f9;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px 0; color: #94a3b8; font-size: 13px; font-weight: bold; text-transform: uppercase;">Check-in</td>
                                <td style="padding: 10px 0; color: #1e293b; font-weight: bold; text-align: right;">${bookingDetails.checkIn}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #94a3b8; font-size: 13px; font-weight: bold; text-transform: uppercase;">Check-out</td>
                                <td style="padding: 10px 0; color: #1e293b; font-weight: bold; text-align: right;">${bookingDetails.checkOut}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #94a3b8; font-size: 13px; font-weight: bold; text-transform: uppercase;">Location</td>
                                <td style="padding: 10px 0; color: #1e293b; font-weight: bold; text-align: right;">${property.location}</td>
                            </tr>
                        </table>
                    </div>

                    <div style="text-align: center;">
                        <a href="http://localhost:5173/dashboard" style="display: inline-block; background-color: #f97316; color: white; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: 800; font-size: 14px;">MANAGE BOOKING</a>
                    </div>
                </div>
                <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #f1f5f9;">
                    <p style="font-size: 12px; color: #94a3b8; margin: 0;">© 2026 Veedoo Luxury Rentals. Quality stays guaranteed.</p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`[OK] User Confirmation sent to: ${userEmail}`);
    } catch (err) {
        console.error(`[ERROR] User Email Failed: ${err.message}`);
    }
};

/**
 * Sends an urgent notification to the admin
 */
const notifyAdminOfBooking = async (property, booking, customerEmail) => {
    if (!process.env.EMAIL_USER || process.env.EMAIL_USER.includes('your-email')) {
        console.warn('--- NODEMAILER: Skipping admin notification (Placeholder credentials used) ---');
        return;
    }

    const mailOptions = {
        from: `"Veedoo Alerts" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `NEW BOOKING: ${property.title}`,
        html: `
            <div style="font-family: sans-serif; padding: 20px; border: 2px solid #f97316; border-radius: 10px;">
                <h2 style="color: #0f172a;">New Reservation Received!</h2>
                <hr style="border: 1px solid #f1f5f9;">
                <p><strong>Property:</strong> ${property.title}</p>
                <p><strong>Customer:</strong> ${customerEmail}</p>
                <p><strong>Guests:</strong> ${booking.guests}</p>
                <p><strong>Dates:</strong> ${booking.checkIn} to ${booking.checkOut}</p>
                <br>
                <p style="font-size: 12px; color: #64748b;">This is an automated system alert.</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`[OK] Admin Notification sent to: ${process.env.ADMIN_EMAIL}`);
    } catch (err) {
        console.error(`[ERROR] Admin Notification Failed: ${err.message}`);
    }
};

module.exports = {
    sendBookingConfirmationEmail,
    notifyAdminOfBooking
};
