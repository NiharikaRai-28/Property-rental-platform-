const mongoose = require('mongoose');
const dotenv = require('dotenv');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

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
    },
    // New Properties
    {
        title: 'Heritage Heights 3BHK',
        description: 'Spacious 3BHK apartment in a heritage building with high ceilings and classic teak wood flooring.',
        price: 12500,
        location: 'Colaba, Mumbai',
        type: 'Apartment',
        beds: 3,
        area: 1800,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
        ownerId: 'admin'
    },
    {
        title: 'Silicon Valley 2BHK',
        description: 'Smart tech-enabled apartment near IT hubs. Featuring automated lighting and climate control.',
        price: 9500,
        location: 'Whitefield, Bangalore',
        type: 'Apartment',
        beds: 2,
        area: 1250,
        image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
        ownerId: 'admin'
    },
    {
        title: 'SafeStay Single Room',
        description: 'Secure and clean single room in a gated community. Ideal for students and young professionals.',
        price: 1500,
        location: 'Kothrud, Pune',
        type: 'Room',
        beds: 1,
        area: 300,
        image: 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?w=800&q=80',
        ownerId: 'admin'
    },
    {
        title: 'Premier Executive Room',
        description: 'Fully furnished executive room with attached bath and kitchenette. Includes weekly cleaning.',
        price: 2500,
        location: 'Banjara Hills, Hyderabad',
        type: 'Room',
        beds: 1,
        area: 400,
        image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
        ownerId: 'admin'
    },
    {
        title: 'Azure Coast Villa',
        description: 'A Mediterranean-style villa with direct beach access and a large infinity pool.',
        price: 42000,
        location: 'Pondicherry, Tamil Nadu',
        type: 'Villa',
        beds: 4,
        area: 4500,
        image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80',
        ownerId: 'admin'
    },
    {
        title: 'Royal Palms Estate',
        description: 'Colonial-era estate spread over 2 acres. Features a private tennis court and library.',
        price: 60000,
        location: 'Civil Lines, Delhi',
        type: 'Villa',
        beds: 6,
        area: 8000,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        ownerId: 'admin'
    },
    {
        title: 'Industrial Loft Studio',
        description: 'Chic industrial loft with exposed brick walls and open floor plan in the arts district.',
        price: 5500,
        location: 'Salt Lake City, Kolkata',
        type: 'Studio',
        beds: 1,
        area: 600,
        image: 'https://images.unsplash.com/photo-1536376074432-bf121780c7b3?w=800&q=80',
        ownerId: 'admin'
    },
    {
        title: 'Zen Garden Studio',
        description: 'Peaceful studio apartment with a private Japanese-style Garden. Perfect for writers and creators.',
        price: 4800,
        location: 'Auroville, Pondicherry',
        type: 'Studio',
        beds: 1,
        area: 500,
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80',
        ownerId: 'admin'
    },
    {
        title: 'Observation Deck Penthouse',
        description: 'Features a private 360-degree observation deck on the top floor of the city\'s tallest tower.',
        price: 25000,
        location: 'Worli, Mumbai',
        type: 'Penthouse',
        beds: 4,
        area: 3500,
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
        ownerId: 'admin'
    },
    {
        title: 'Glass House Penthouse',
        description: 'Living room features floor-to-ceiling glass on all sides. Luxury defined in the skyline.',
        price: 22000,
        location: 'Hitech City, Hyderabad',
        type: 'Penthouse',
        beds: 3,
        area: 3200,
        image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80',
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
