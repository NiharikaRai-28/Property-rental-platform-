import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, MapPin, IndianRupee, Image as ImageIcon, FileText, ArrowRight, Home, CheckCircle2 } from 'lucide-react';

export default function AddProperty() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        type: 'Apartment',
        beds: '',
        area: '',
        image: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('token');

        try {
            const res = await fetch('/api/properties', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...formData, ownerId: 'admin' })
            });

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => navigate('/listings'), 2000);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (success) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 italic">
            <div className="bg-white p-20 rounded-[4rem] shadow-2xl text-center max-w-xl border border-slate-100">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10">
                    <CheckCircle2 className="w-12 h-12" />
                </div>
                <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Listed Successfully!</h2>
                <p className="text-slate-400 font-bold mb-10">Your property has been added to our premium marketplace. Redirecting to listings...</p>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-green-600 h-full animate-progress-bar"></div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6 italic">
            <div className="max-w-4xl mx-auto">
                <div className="mb-16">
                    <span className="text-orange-600 font-black uppercase tracking-[0.3em] text-sm underline decoration-slate-900 underline-offset-8">Property Submission</span>
                    <h1 className="text-6xl font-black text-slate-900 mt-8 tracking-tighter leading-none mb-4 uppercase">List Your <span className="text-orange-600 italic">Masterpiece.</span></h1>
                    <p className="text-slate-400 font-bold max-w-lg">Complete the details below to showcase your property to thousands of verified renters.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100 space-y-10">
                        {/* Core Info */}
                        <div className="grid md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4">Property Title</label>
                                <div className="bg-slate-50 rounded-2xl p-5 flex items-center gap-3 border border-slate-100 focus-within:border-orange-500 transition-all">
                                    <Building2 className="text-slate-400 w-5 h-5" />
                                    <input 
                                        type="text" 
                                        placeholder="Ex: Oakwood Manor Estates" 
                                        className="bg-transparent border-none focus:outline-none w-full font-bold text-slate-900"
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4">Property Type</label>
                                <div className="bg-slate-50 rounded-2xl p-5 flex items-center gap-3 border border-slate-100 focus-within:border-orange-500 transition-all">
                                    <Home className="text-slate-400 w-5 h-5" />
                                    <select 
                                        className="bg-transparent border-none focus:outline-none w-full font-bold text-slate-900"
                                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                                    >
                                        <option>Apartment</option>
                                        <option>Villa</option>
                                        <option>Penthouse</option>
                                        <option>Room</option>
                                        <option>Studio</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Location and Price */}
                        <div className="grid md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4">Location / Address</label>
                                <div className="bg-slate-50 rounded-2xl p-5 flex items-center gap-3 border border-slate-100 focus-within:border-orange-500 transition-all">
                                    <MapPin className="text-slate-400 w-5 h-5" />
                                    <input 
                                        type="text" 
                                        placeholder="City, Area, Road..." 
                                        className="bg-transparent border-none focus:outline-none w-full font-bold text-slate-900"
                                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4">Monthly Rent (INR)</label>
                                <div className="bg-slate-50 rounded-2xl p-5 flex items-center gap-3 border border-slate-100 focus-within:border-orange-500 transition-all">
                                    <IndianRupee className="text-slate-400 w-5 h-5" />
                                    <input 
                                        type="number" 
                                        placeholder="0.00" 
                                        className="bg-transparent border-none focus:outline-none w-full font-bold text-slate-900"
                                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Specs */}
                        <div className="grid md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4">Bedrooms</label>
                                <div className="bg-slate-50 rounded-2xl p-5 flex items-center gap-3 border border-slate-100 focus-within:border-orange-500 transition-all">
                                    <Building2 className="text-slate-400 w-5 h-5" />
                                    <input 
                                        type="number" 
                                        placeholder="3" 
                                        className="bg-transparent border-none focus:outline-none w-full font-bold text-slate-900"
                                        onChange={(e) => setFormData({...formData, beds: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4">Total Area (sqft)</label>
                                <div className="bg-slate-50 rounded-2xl p-5 flex items-center gap-3 border border-slate-100 focus-within:border-orange-500 transition-all">
                                    <FileText className="text-slate-400 w-5 h-5" />
                                    <input 
                                        type="number" 
                                        placeholder="1200" 
                                        className="bg-transparent border-none focus:outline-none w-full font-bold text-slate-900"
                                        onChange={(e) => setFormData({...formData, area: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Image URL */}
                        <div className="space-y-4">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4">Property Image URL</label>
                            <div className="bg-slate-50 rounded-2xl p-5 flex items-center gap-3 border border-slate-100 focus-within:border-orange-500 transition-all">
                                <ImageIcon className="text-slate-400 w-5 h-5" />
                                <input 
                                    type="text" 
                                    placeholder="https://images.unsplash.com/..." 
                                    className="bg-transparent border-none focus:outline-none w-full font-bold text-slate-900"
                                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                                    required
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-4">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4">Full Description</label>
                            <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100 focus-within:border-orange-500 transition-all">
                                <textarea 
                                    rows="6" 
                                    placeholder="Describe the amenities, nearby landmarks, and condition of the property..." 
                                    className="bg-transparent border-none focus:outline-none w-full font-bold text-slate-900 resize-none"
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="bg-orange-600 text-white px-20 py-8 rounded-[2.5rem] font-black text-xl hover:bg-orange-700 transition-all shadow-2xl shadow-orange-600/20 active:scale-[0.98] flex items-center gap-4 border-b-8 border-orange-800"
                        >
                            {loading ? 'PUBLISHING...' : 'PUBLISH LISTING'}
                            <ArrowRight className="w-6 h-6" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
