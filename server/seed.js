const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Property = require('./models/Property');

dotenv.config(); // Assuming run from project root

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/propertyRental';

const types = ['Apartment', 'Villa', '1BHK', '2BHK', '3BHK', 'Penthuse'];
const locations = ['Varansi, UP', 'Dharamshala, HP', 'Panjim, Goa', 'Mumbai, MH', 'Haridwar, UK', 'Rishikesh, UK', 'Bangalore, KA'];
const prefixes = ['Royal', 'Sunset', 'Crystal', 'Oakwood', 'Golden', 'Emerald', 'Sapphire', 'Willow', 'Maple', 'Cedar'];
const suffixes = ['Estates', 'Apartments', 'Residency', 'Manor', 'Heighs', 'Towers', 'Legacy', 'Villas'];

const houseImages = [
    'https://images.unsplash.com/photo-1580587767503-3d92063e1246?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
];

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to DB for seeding...');

        // Clear existing properties to avoid duplicates in mock-run
        // await Property.deleteMany({}); 

        const count = await Property.countDocuments();
        if (count > 10) {
            console.log('Database already has properties. Skipping seed.');
            process.exit();
        }

        const entries = [];
        for (let i = 1; i <= 50; i++) {
            const type = types[Math.floor(Math.random() * types.length)];
            const loc = locations[Math.floor(Math.random() * locations.length)];
            const name = `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
            
            entries.push({
                title: `${name} ${i}`,
                description: `A masterfully designed ${type} in ${loc}. Features high-end finishes and modern amenities.`,
                price: Math.floor(Math.random() * 5000) + 1500,
                location: `${Math.floor(Math.random() * 999)} Heritage Lane, ${loc}`,
                type: type,
                area: Math.floor(Math.random() * 2000) + 1000,
                beds: type.includes('BHK') ? parseInt(type[0]) : Math.floor(Math.random() * 3) + 2,
                image: houseImages[i % houseImages.length],
                ownerId: 'admin'
            });
        }

        await Property.insertMany(entries);
        console.log('Successfully seeded 50 properties into the database!');
        process.exit();
    } catch (err) {
        console.error('Seed error:', err);
        process.exit(1);
    }
}

seed();
