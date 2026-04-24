import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    Search, MapPin, Home as HomeIcon, Building2, Warehouse, Hotel, 
    ArrowRight, Star, Quote, ShieldCheck, Zap, Heart, CheckCircle2, 
    ArrowUpRight, User, MousePointer2 
} from 'lucide-react';

const categories = [
    { name: 'Apartment', icon: <Building2 className="w-6 h-6" />, count: '240' },
    { name: 'Commercial', icon: <Warehouse className="w-6 h-6" />, count: '180' },
    { name: 'Villa', icon: <HomeIcon className="w-6 h-6" />, count: '120' },
    { name: 'Penthouse', icon: <Hotel className="w-6 h-6" />, count: '80' },
    { name: 'Studio', icon: <Building2 className="w-6 h-6" />, count: '150' },
];

const testimonials = [
    { 
        name: 'Amy Williams', 
        role: 'Happy Homeowner', 
        text: 'The process was incredibly smooth. From start to finish, the team at Veedoo was professional and dedicated to helping us find exactly what we needed.', 
        image: 'https://i.pravatar.cc/100?u=amy' 
    },
    { 
        name: 'James Rodriguez', 
        role: 'Luxury Renter', 
        text: 'I found my dream villa in Goa within 48 hours. The verification process gives me peace of mind every time I book.', 
        image: 'https://i.pravatar.cc/100?u=james' 
    },
    { 
        name: 'Sarah Chen', 
        role: 'Property Owner', 
        text: 'Listing my penthouse was easy. Within a week, I had verified professionals interested in a long-term stay.', 
        image: 'https://i.pravatar.cc/100?u=sarah' 
    }
];

export default function Home() {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [selectedType, setSelectedType] = useState('Apartment');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/properties')
            .then(res => res.json())
            .then(data => {
                setProperties(data);
                // Initial filter
                setFilteredProperties(data.filter(p => p.type === 'Apartment').slice(0, 3));
            })
            .catch(err => console.error(err));
    }, []);

    const filterByType = (type) => {
        setSelectedType(type);
        const filtered = properties.filter(p => p.type === type);
        setFilteredProperties(filtered.length > 0 ? filtered.slice(0, 3) : properties.slice(0, 3));
    };

    return (
        <div className="bg-[#F8FAFC]">
            {/* Hero Section */}
            <section className="relative h-[100vh] flex items-center justify-center pt-20">
                <img 
                    src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1920&q=80" 
                    alt="Luxury Home" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/40"></div>
                
                <div className="relative z-10 w-full max-w-7xl px-6">
                    <div className="max-w-3xl mb-16">
                        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.95] mb-8 uppercase">
                            Modern <br/>Living <span className="text-orange-500">Refined.</span>
                        </h1>
                        <p className="text-xl text-white/90 font-medium max-w-xl leading-relaxed">
                            Discover a curated collection of properties designed for those who value elegance, comfort, and professional service.
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-2xl p-3 rounded-[2.5rem] border border-white/20 shadow-2xl flex flex-wrap lg:flex-nowrap items-center gap-3">
                        <div className="flex-1 bg-white rounded-[1.8rem] p-4 flex items-center gap-3 shadow-inner">
                            <Search className="text-orange-500 w-5 h-5 ml-2" />
                            <input type="text" placeholder="Where do you want to live?" className="bg-transparent border-none focus:outline-none w-full font-semibold text-slate-800 placeholder-slate-400" />
                        </div>
                        <div className="flex-1 bg-white rounded-[1.8rem] p-4 flex items-center gap-3 shadow-inner">
                            <Building2 className="text-orange-500 w-5 h-5 ml-2" />
                            <select className="bg-transparent border-none focus:outline-none w-full font-semibold text-slate-800 appearance-none">
                                <option>Select Property Class</option>
                                <option>Apartment</option>
                                <option>Villa</option>
                                <option>Penthouse</option>
                            </select>
                        </div>
                        <button onClick={() => navigate('/listings')} className="bg-orange-600 text-white px-14 py-5 rounded-[1.8rem] font-bold text-sm tracking-widest hover:bg-orange-700 transition-all active:scale-[0.98] whitespace-nowrap uppercase shadow-lg shadow-orange-600/20">
                            Search Properties
                        </button>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-24 max-w-7xl mx-auto px-6 text-center">
                <span className="text-orange-600 font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block underline decoration-slate-900 underline-offset-8">Property Archive</span>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-6 mb-16 tracking-tight uppercase leading-none">Find Your Requirement</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {categories.map((cat, i) => (
                        <div key={i} className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer group text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 group-hover:bg-orange-500 group-hover:text-white transition-all shadow-sm">
                                {cat.icon}
                            </div>
                            <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-tight text-sm">{cat.name}</h4>
                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{cat.count} Units</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* What We Do Section */}
            <section className="py-24 bg-white border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <span className="text-orange-600 font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Our Service</span>
                        <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-[1.1] mb-10 uppercase">Providing Premium <span className="text-orange-600 font-normal italic">Stays.</span></h2>
                        <div className="space-y-10">
                            <div className="flex gap-8 items-start">
                                <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex-shrink-0 flex items-center justify-center text-orange-600 border border-slate-100 shadow-sm"><Zap className="w-8 h-8" /></div>
                                <div>
                                    <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-2">Fast Direct Booking</h4>
                                    <p className="text-slate-500 font-medium leading-relaxed max-w-sm text-sm">Secure your preferred luxury stay in minutes with our transparent, vetted checkout process.</p>
                                </div>
                            </div>
                            <div className="flex gap-8 items-start">
                                <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex-shrink-0 flex items-center justify-center text-orange-600 border border-slate-100 shadow-sm"><ShieldCheck className="w-8 h-8" /></div>
                                <div>
                                    <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-2">Authenticated Collection</h4>
                                    <p className="text-slate-500 font-medium leading-relaxed max-w-sm text-sm">Every property undergoes a rigorous 50-point inspection before it joins our verified portfolio.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80" className="rounded-[4rem] h-[550px] w-full object-cover shadow-2xl" alt="" />
                        <div className="absolute -bottom-8 -left-8 bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl">
                             <div className="text-5xl font-black mb-1">500+</div>
                             <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500">Global Properties</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
                    <div className="text-center md:text-left">
                        <span className="text-orange-600 font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block underline decoration-slate-900 underline-offset-8">Curated Picks</span>
                        <h2 className="text-5xl font-black text-slate-900 mt-6 tracking-tight uppercase leading-none">Global Archive</h2>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 bg-white p-2 rounded-[2rem] border border-slate-200 shadow-sm">
                         {['Apartment', 'Villa', 'Penthouse'].map(type => (
                             <button 
                                key={type}
                                onClick={() => filterByType(type)}
                                className={`px-10 py-4 rounded-[1.5rem] font-bold uppercase tracking-widest text-[11px] transition-all ${selectedType === type ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'bg-transparent text-slate-400 hover:text-slate-900'}`}
                             >
                                 {type}
                             </button>
                         ))}
                    </div>
                </div>
                <div className="grid md:grid-cols-3 gap-10">
                    {filteredProperties.length > 0 ? filteredProperties.map((p, i) => (
                        <Link to={`/property/${p._id}`} key={i} className="bg-white rounded-[3.5rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
                            <div className="relative h-[320px] overflow-hidden">
                                <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="" />
                                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full text-slate-900 font-black border border-slate-100 text-sm shadow-xl">
                                    ₹{p.price.toLocaleString()}
                                </div>
                            </div>
                            <div className="p-10">
                                <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tighter truncate">{p.title}</h3>
                                <div className="flex items-center gap-1.5 text-slate-400 font-bold mb-8 text-xs uppercase tracking-tight">
                                    <MapPin className="w-4 h-4 text-orange-500" />
                                    {p.location}
                                </div>
                                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                    <div className="flex gap-4 font-bold text-slate-500 text-[10px] uppercase tracking-widest">
                                        <span>{p.beds || 3} Bed</span>
                                        <span>{p.area || 1200} sqft</span>
                                    </div>
                                    <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all cursor-pointer shadow-sm border border-slate-50">
                                        <ArrowRight className="w-5 h-5"/>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )) : (
                        <div className="col-span-3 text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200 text-slate-400 font-bold uppercase tracking-[0.3em] text-xs">
                             Category selection empty in current region.
                        </div>
                    )}
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-orange-600 font-bold uppercase tracking-[0.4em] text-[10px] block underline decoration-slate-900 underline-offset-8">Excellence Hub</span>
                    <h2 className="text-5xl font-black text-slate-900 mt-10 tracking-tight uppercase leading-none">The Veedoo Standard.</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-14 rounded-[4.5rem] border border-slate-100 shadow-sm text-center group hover:bg-white hover:shadow-2xl hover:scale-[1.02] transition-all duration-500">
                        <div className="w-20 h-20 bg-orange-50 rounded-[1.8rem] flex items-center justify-center mx-auto mb-10 text-orange-600 transition-all border border-orange-100/50 shadow-inner">
                            <Heart className="w-8 h-8" />
                        </div>
                        <h4 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Premium Collection</h4>
                        <p className="text-slate-500 font-medium text-sm leading-relaxed">Curated for excellence. Only the top 5% of property applications make it to our archive.</p>
                    </div>
                    <div className="bg-white p-14 rounded-[4.5rem] border border-slate-100 shadow-sm text-center group hover:bg-white hover:shadow-2xl hover:scale-[1.02] transition-all duration-500">
                        <div className="w-20 h-20 bg-orange-50 rounded-[1.8rem] flex items-center justify-center mx-auto mb-10 text-orange-600 transition-all border border-orange-100/50 shadow-inner">
                            <Zap className="w-8 h-8" />
                        </div>
                        <h4 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Instant Identity</h4>
                        <p className="text-slate-500 font-medium text-sm leading-relaxed">One profile for all your rental needs. Verification that lasts a lifetime across our network.</p>
                    </div>
                    <div className="bg-white p-14 rounded-[4.5rem] border border-slate-100 shadow-sm text-center group hover:bg-white hover:shadow-2xl hover:scale-[1.02] transition-all duration-500">
                        <div className="w-20 h-20 bg-orange-50 rounded-[1.8rem] flex items-center justify-center mx-auto mb-10 text-orange-600 transition-all border border-orange-100/50 shadow-inner">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h4 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Legacy Security</h4>
                        <p className="text-slate-500 font-medium text-sm leading-relaxed">Military-grade encryption for your documents and encrypted escrow for total financial safety.</p>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-6 text-center mb-16 relative z-10">
                    <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px] block underline decoration-white underline-offset-8">Global Reviews</span>
                    <h2 className="text-5xl font-black mt-10 tracking-tight uppercase leading-none">Trust The Feedback.</h2>
                </div>
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 relative z-10">
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-white/5 backdrop-blur-xl p-12 rounded-[4rem] border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-all duration-500 group">
                            <Quote className="w-12 h-12 text-orange-500 mb-10 group-hover:rotate-12 transition-transform" />
                            <p className="text-lg text-slate-300 font-medium leading-relaxed mb-12 italic">"{t.text}"</p>
                            <div className="flex items-center gap-4">
                                <img src={t.image} className="w-12 h-12 rounded-full border-2 border-white/10 shadow-lg" alt="" />
                                <div>
                                    <div className="font-black text-white uppercase tracking-tighter text-sm">{t.name}</div>
                                    <div className="text-orange-500 text-[9px] font-bold uppercase tracking-widest">{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
            </section>

            {/* CTA Section */}
            <section className="py-32 max-w-7xl mx-auto px-6">
                <div className="bg-orange-600 rounded-[5rem] p-24 text-center relative overflow-hidden shadow-2xl shadow-orange-600/20">
                    <div className="relative z-10">
                        <span className="text-white/80 font-bold uppercase tracking-[0.5em] text-[10px] mb-8 block font-outfit">Priority Access</span>
                        <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase mb-14 leading-none">Secure Your <br/>Premium Stay.</h2>
                        <div className="flex flex-wrap justify-center gap-6">
                            <button 
                                onClick={() => navigate('/listings')}
                                className="bg-white text-orange-600 px-16 py-8 rounded-[2.5rem] font-black text-xl hover:bg-slate-900 hover:text-white transition-all active:scale-[0.98] flex items-center gap-4 shadow-xl shadow-white/10"
                            >
                                Book Now <ArrowUpRight className="w-8 h-8" />
                            </button>
                            <button className="bg-slate-950 text-white px-16 py-8 rounded-[2.5rem] font-black text-xl border border-white/10 hover:bg-white hover:text-slate-950 transition-all active:scale-[0.98]">
                                Contact Expert
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-950 text-white pt-40 pb-12 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-[180px] bg-white rounded-b-[120px]"></div>
                 <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-4 gap-20 mb-24 relative z-10">
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-12 h-12 bg-orange-600 rounded-[1.2rem] flex items-center justify-center shadow-lg shadow-orange-500/20">
                                <HomeIcon className="text-white w-6 h-6" />
                            </div>
                            <span className="text-4xl font-black tracking-tighter uppercase">Veedoo</span>
                        </div>
                        <p className="text-lg text-slate-400 font-medium max-w-sm mb-12 leading-relaxed">
                            Fine-tuning the rental interface for the next generation of global citizens. Modern architecture, seamless access.
                        </p>
                        <div className="flex gap-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-12 h-12 bg-white/5 rounded-[1rem] border border-white/10 flex items-center justify-center hover:bg-orange-600 transition-all cursor-pointer group">
                                    <div className="w-5 h-5 bg-slate-500 rounded-sm group-hover:bg-white"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xs font-black mb-10 uppercase tracking-[0.4em] text-orange-500 underline decoration-white underline-offset-[12px]">Directory</h4>
                        <ul className="space-y-6 text-slate-400 font-bold uppercase tracking-tight text-xs">
                            <li><Link to="/" className="hover:text-white transition-colors">Digital Home</Link></li>
                            <li><Link to="/about" className="hover:text-white transition-colors">Manifesto</Link></li>
                            <li><Link to="/listings" className="hover:text-white transition-colors">Archive</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xs font-black mb-10 uppercase tracking-[0.4em] text-orange-500 underline decoration-white underline-offset-[12px]">Base Location</h4>
                        <ul className="space-y-6 text-slate-400 font-bold uppercase tracking-tight text-xs">
                            <li className="flex items-center gap-4">
                                <MapPin className="text-orange-500 w-4 h-4 shadow-orange-500/10" />
                                123 Sky Tower, Bangalore
                            </li>
                            <li className="flex items-center gap-4">
                                <Star className="text-orange-500 w-4 h-4 shadow-orange-500/10" />
                                CONNECT@VEEDOO.COM
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="text-center pt-10 border-t border-white/5 text-slate-700 font-black text-[9px] uppercase tracking-[1em]">
                    © 2026 Veedoo Nexus Collective. All Rights Reserved.
                </div>
            </footer>
        </div>
    );
}
