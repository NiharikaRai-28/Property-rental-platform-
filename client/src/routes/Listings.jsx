import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Building2, SlidersHorizontal, ArrowRight, Home, IndianRupee, ArrowLeft } from 'lucide-react';

export default function Listings() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({ keyword: '', type: '', location: '' });
    
    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        fetch('/api/properties')
            .then(res => res.json())
            .then(data => {
                setProperties(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const filteredProperties = properties.filter(p => {
        const matchesKeyword = p.title.toLowerCase().includes(filter.keyword.toLowerCase());
        const matchesType = filter.type === '' || p.type === filter.type;
        const matchesLocation = filter.location === '' || p.location.toLowerCase().includes(filter.location.toLowerCase());
        return matchesKeyword && matchesType && matchesLocation;
    });

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProperties.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="bg-[#F8FAFC] min-h-screen">
            {/* Header / Banner - Elegant & Dark */}
            <section className="relative h-[450px] flex items-center justify-center pt-24 overflow-hidden shadow-2xl">
                <img 
                    src="/assets/listings-hero.png" 
                    alt="Listings" 
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="absolute inset-0 bg-slate-950/70 z-10"></div>
                <div className="relative z-20 text-center px-4 max-w-4xl">
                    <span className="text-orange-500 font-bold uppercase tracking-[0.5em] text-[10px] mb-6 block">Global Inventory</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4 uppercase">Archive.</h1>
                    <div className="flex items-center justify-center gap-3 text-white/50 font-bold uppercase tracking-widest text-[9px]">
                        <Link to="/" className="hover:text-orange-500 transition-colors">Nexus Home</Link>
                        <span>/</span>
                        <span className="text-white underline decoration-orange-600 underline-offset-[14px]">Global Reach</span>
                    </div>
                </div>
            </section>

            {/* Filter Bar - Clean Design */}
            <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
                <div className="bg-white p-12 rounded-[4rem] shadow-2xl flex flex-wrap lg:flex-nowrap items-end gap-8 border border-slate-100">
                    <div className="flex-1 min-w-[220px]">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-6">Global Search</label>
                        <div className="bg-slate-50 rounded-[1.5rem] p-5 flex items-center gap-3 border border-slate-100 focus-within:border-orange-500 transition-all shadow-inner">
                            <Search className="text-orange-500 w-5 h-5 ml-1" />
                            <input 
                                type="text" 
                                placeholder="Keywords..." 
                                className="bg-transparent border-none focus:outline-none w-full font-bold text-slate-900 placeholder-slate-400"
                                onChange={(e) => {setFilter({...filter, keyword: e.target.value}); setCurrentPage(1);}}
                            />
                        </div>
                    </div>
                    <div className="flex-1 min-w-[220px]">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-6">Category</label>
                        <div className="bg-slate-50 rounded-[1.5rem] p-5 flex items-center gap-3 border border-slate-100 focus-within:border-orange-500 transition-all shadow-inner">
                            <Building2 className="text-orange-500 w-5 h-5 ml-1" />
                            <select 
                                className="bg-transparent border-none focus:outline-none w-full font-bold text-slate-900 appearance-none"
                                onChange={(e) => {setFilter({...filter, type: e.target.value === 'ALL MODULES' ? '' : e.target.value}); setCurrentPage(1);}}
                            >
                                <option>ALL MODULES</option>
                                <option>Apartment</option>
                                <option>Villa</option>
                                <option>Penthouse</option>
                                <option>Room</option>
                                <option>Studio</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex-1 min-w-[220px]">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-6">Location</label>
                        <div className="bg-slate-50 rounded-[1.5rem] p-5 flex items-center gap-3 border border-slate-100 focus-within:border-orange-500 transition-all shadow-inner">
                            <MapPin className="text-orange-500 w-5 h-5 ml-1" />
                            <input 
                                type="text" 
                                placeholder="City or Zip..." 
                                className="bg-transparent border-none focus:outline-none w-full font-bold text-slate-900 placeholder-slate-400"
                                onChange={(e) => {setFilter({...filter, location: e.target.value}); setCurrentPage(1);}}
                            />
                        </div>
                    </div>
                    <button className="bg-slate-900 text-white px-14 py-6 rounded-[1.8rem] font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center gap-3 shadow-xl active:scale-[0.98]">
                        <SlidersHorizontal className="w-5 h-5" />
                        Enter Archive
                    </button>
                </div>
            </div>

            {/* Grid Section */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                {loading ? (
                    <div className="text-center py-32 uppercase tracking-[0.6em] text-slate-400 font-black text-xs animate-pulse">
                        Synchronizing Grid...
                    </div>
                ) : (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                            {currentItems.map((p) => (
                                <Link key={p._id} to={`/property/${p._id}`} className="block group">
                                    <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl transition-all h-full flex flex-col group">
                                        <div className="relative h-[300px] overflow-hidden">
                                            <img 
                                                src={p.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                                                alt={p.title} 
                                            />
                                            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md py-2 px-6 rounded-full text-xs font-black text-slate-900 border border-slate-100 shadow-xl flex items-center gap-1 uppercase tracking-tighter">
                                                <IndianRupee className="w-3.5 h-3.5 text-orange-600" />
                                                {p.price.toLocaleString()}
                                            </div>
                                        </div>
                                        <div className="p-8 flex flex-col flex-1">
                                            <h3 className="text-lg font-black text-slate-900 mb-2 truncate uppercase tracking-tighter group-hover:text-orange-600 transition-colors leading-none">{p.title}</h3>
                                            <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[10px] mb-8 uppercase tracking-widest">
                                                <MapPin className="w-3 h-3 text-orange-500" />
                                                <span className="truncate">{p.location}</span>
                                            </div>
                                            <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
                                                <div className="flex gap-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
                                                    <span>{p.beds || 3} Bed</span>
                                                    <span>{p.type}</span>
                                                </div>
                                                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm border border-slate-50 group-hover:scale-105">
                                                    <ArrowRight className="w-5 h-5"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination Section */}
                        <div className="mt-24 flex items-center justify-center gap-6">
                            <button 
                                onClick={() => {paginate(currentPage - 1); window.scrollTo(0,400);}}
                                disabled={currentPage === 1}
                                className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center border transition-all ${currentPage === 1 ? 'border-slate-50 text-slate-200 cursor-not-allowed' : 'border-slate-100 text-slate-900 bg-white hover:bg-slate-900 hover:text-white shadow-xl'}`}
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            
                            <div className="flex gap-3">
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {paginate(index + 1); window.scrollTo(0,400);}}
                                        className={`w-16 h-16 rounded-[1.5rem] font-bold text-sm transition-all ${currentPage === index + 1 ? 'bg-orange-600 text-white shadow-2xl shadow-orange-600/30 -translate-y-1' : 'bg-white text-slate-400 border border-slate-100 hover:border-slate-300'}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>

                            <button 
                                onClick={() => {paginate(currentPage + 1); window.scrollTo(0,400);}}
                                disabled={currentPage === totalPages}
                                className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center border transition-all ${currentPage === totalPages ? 'border-slate-50 text-slate-200 cursor-not-allowed' : 'border-slate-100 text-slate-900 bg-white hover:bg-slate-900 hover:text-white shadow-xl'}`}
                            >
                                <ArrowRight className="w-6 h-6" />
                            </button>
                        </div>
                    </>
                )}
            </section>
        </div>
    );
}
