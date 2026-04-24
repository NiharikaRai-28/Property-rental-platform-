const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
    res.send('Property Rental API is running...');
});

// Import Routes
const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/properties');
const bookingRoutes = require('./routes/bookings');

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/bookings', bookingRoutes);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/propertyRental';

// Start server first so it responds to requests
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Connect to DB in background
mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
        console.log('Ensure your IP is whitelisted in MongoDB Atlas or the connection string is correct.');
    });
