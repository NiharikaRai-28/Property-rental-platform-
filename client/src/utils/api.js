const API_URL = 'http://localhost:5000/api';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

// Generate 50+ mock properties for a rich UI experience
const generateMockProperties = () => {
    const types = ['Apartment', 'Villa', '1BHK', '2BHK', '3BHK', 'Penthuse'];
    const locations = ['Varansi, UP', 'Dharamshala, HP', 'Panjim, Goa', 'Mumbai, MH', 'Haridwar, UK', 'Rishikesh, UK', 'Bangalore, KA'];
    const prefixes = ['Royal', 'Sunset', 'Crystal', 'Oakwood', 'Golden', 'Emerald', 'Sapphire', 'Willow', 'Maple', 'Cedar'];
    const suffixes = ['Estates', 'Apartments', 'Residency', 'Manor', 'Heighs', 'Towers', 'Legacy', 'Villas'];

    const mocks = [];
    for (let i = 1; i <= 60; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        const loc = locations[Math.floor(Math.random() * locations.length)];
        const name = `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
        
        mocks.push({
            id: `mock-${i}`,
            _id: `mock-${i}`,
            title: `${name} ${i}`,
            description: `A beautiful ${type} located in the heart of ${loc.split(',')[0]}. Perfect for those seeking luxury and comfort.`,
            price: Math.floor(Math.random() * 5000) + 1500,
            location: `${Math.floor(Math.random() * 999)} Main Street, ${loc}`,
            type: type,
            area: Math.floor(Math.random() * 2000) + 1000,
            beds: type.includes('BHK') ? parseInt(type[0]) : Math.floor(Math.random() * 3) + 2,
            image: null,
            createdAt: new Date().toISOString()
        });
    }
    return mocks;
};

export const fetchProperties = async () => {
    try {
        const res = await fetch(`${API_URL}/properties`);
        const data = await res.json();
        if (!data || data.length === 0) return generateMockProperties();
        return data;
    } catch (err) {
        return generateMockProperties();
    }
};

export const fetchPropertyById = async (id) => {
    try {
        if (id.startsWith('mock-')) {
            return generateMockProperties().find(p => p.id === id);
        }
        const res = await fetch(`${API_URL}/properties/${id}`);
        return res.json();
    } catch (err) {
        return generateMockProperties().find(p => p.id === id);
    }
};

export const createProperty = async (data) => {
    const res = await fetch(`${API_URL}/properties`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    });
    return res.json();
};

export const fetchBookings = async () => {
    // userId no longer needed as parameter, server gets it from token
    const res = await fetch(`${API_URL}/bookings`, {
        headers: getHeaders()
    });
    return res.json();
};

export const createBooking = async (data) => {
    const res = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    });
    return res.json();
};

export const deleteBooking = async (id) => {
    const res = await fetch(`${API_URL}/bookings/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    });
    return res.json();
};
