const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true, default: 'Apartment' },
    beds: { type: Number, default: 1 },
    area: { type: Number },
    image: { type: String, required: true },
    ownerId: { type: String, default: 'admin' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', propertySchema);
