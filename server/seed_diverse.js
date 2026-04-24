const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

// Direct Schema definition in seed script to avoid path issues
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

const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);

const properties = [
    {
        title: 'Sunset Studio - Sea View',
        description: 'A minimalist Studio apartment with breathtaking sunset views over the Arabian Sea. Perfect for solo travellers or couples.',
        price: 4500,
        location: 'Marine Drive, Mumbai',
        type: 'Studio',
        beds: 1,
        area: 450,
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
        ownerId: 'admin'
    },
    {
        title: 'Magnolia Villa & Spa',
        description: 'Elite luxury villa featuring a private heated pool, organic garden, and 24/7 dedicated butler service.',
        price: 35000,
        location: 'Assagao, Goa',
        type: 'Villa',
        beds: 4,
        area: 4200,
        image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80',
        ownerId: 'admin'
    },
    {
        title: 'Skyline Penthouse',
        description: 'Triple-height ceilings and panoramic city views. The ultimate urban luxury experience in the heart of Bangalore.',
        price: 18000,
        location: 'Indiranagar, Bangalore',
        type: 'Penthouse',
        beds: 3,
        area: 2800,
        image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80',
        ownerId: 'admin'
    },
    {
        title: 'Cozy Solo Room',
        description: 'A professionally managed single room in a secure apartment building. High-speed internet and prime location included.',
        price: 1200,
        location: 'Sector 62, Noida',
        type: 'Room',
        beds: 1,
        area: 250,
        image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80',
        ownerId: 'admin'
    },
    {
        title: 'Parkside 2BHK Apartment',
        description: 'Modern 2BHK apartment overlooking the Cubbon Park. Family friendly with modern modular kitchen.',
        price: 8500,
        location: 'MG Road, Bangalore',
        type: 'Apartment',
        beds: 2,
        area: 1100,
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
        ownerId: 'admin'
    },
    {
        title: 'Elite 5BHK Mansion',
        description: 'Bespoke mansion with private cinema, wine cellar, and state-of-the-art security systems.',
        price: 55000,
        location: 'Golf Course Road, Gurgaon',
        type: 'Villa',
        beds: 5,
        area: 6500,
        image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
        ownerId: 'admin'
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');
        
        await Property.deleteMany({});
        console.log('Cleared existing properties.');
        
        await Property.insertMany(properties);
        console.log('Seeded diverse properties successfully.');
        
        process.exit();
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedDB();
