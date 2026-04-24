const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// Get all properties
router.get('/', async (req, res) => {
    try {
        const properties = await Property.find().sort({ createdAt: -1 });
        res.json(properties);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get property by ID
router.get('/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ message: 'Property not found' });
        res.json(property);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add new property
router.post('/', async (req, res) => {
    const property = new Property({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        location: req.body.location,
        type: req.body.type,
        beds: req.body.beds,
        area: req.body.area,
        image: req.body.image,
        ownerId: req.body.ownerId || 'admin'
    });

    try {
        const newProperty = await property.save();
        res.status(201).json(newProperty);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
