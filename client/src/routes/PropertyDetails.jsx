import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Home, Bed, Square, IndianRupee, Calendar, Users, Loader2, ArrowLeft, CheckCircle2, ShieldCheck, AlertCircle, Phone, X } from 'lucide-react';

export default function PropertyDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingData, setBookingData] = useState({ checkIn: '', checkOut: '', guests: 1 });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetch(`/api/properties/${id}`)
            .then(res => res.json())
            .then(data => {
                setProperty(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const handleBooking = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Security access required. Please sign in to book.');
            navigate('/auth');
            return;
        }

        if (!bookingData.checkIn || !bookingData.checkOut) {
            alert('Identification of temporal range required (Dates missing).');
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    propertyId: id,
                    ...bookingData 
                })
            });

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => navigate('/dashboard'), 3000);
            } else {
                const err = await res.json();
                alert(err.message || 'Booking synchronization failed.');
            }
        } catch (err) {
            alert('System failure during booking.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
            <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-6" />
            <p className="font-black text-slate-400 uppercase tracking-[0.4em] text-xs">Accessing Nexus Data...</p>
        </div>
    );

    if (!property) return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
            <AlertCircle className="w-16 h-16 text-red-500 mb-6" />
            <h2 className="text-3xl font-black text-slate-900 uppercase mb-4 tracking-tighter">Instance Not Found</h2>
            <button onClick={() => navigate('/listings')} className="text-orange-600 font-bold uppercase tracking-widest text-sm hover:underline underline-offset-8">Return to Archive</button>
        </div>
    );

    return (
        <div className="bg-[#F8FAFC] min-h-screen pb-32">
            {/* Header / Gallery */}
            <header className="relative h-[650px] overflow-hidden group">
                <img src={property.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20"></div>
                
                <div className="absolute top-10 left-10 z-10">
                    <button onClick={() => navigate(-1)} className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white hover:bg-orange-600 transition-all">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                </div>

                <div className="absolute bottom-12 left-10 right-10 z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-2 text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-4">
                            <ShieldCheck className="w-4 h-4" /> Veedoo Verified Collection
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">{property.title}</h1>
                        <div className="flex items-center gap-2 text-slate-300 font-bold mt-6 text-sm italic">
                            <MapPin className="text-orange-500 w-5 h-5" />
                            {property.location}
                        </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-2xl p-8 rounded-[3rem] border border-white/20 text-center shadow-2xl">
                         <div className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-2">Market Price / Night</div>
                         <div className="text-4xl font-black text-white flex items-center justify-center gap-2">
                             <IndianRupee className="w-7 h-7" />
                             {property.price.toLocaleString()}
                         </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 mt-20 grid lg:grid-cols-3 gap-16">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-16">
                    <section>
                         <h2 className="text-xs font-black text-orange-600 uppercase tracking-[0.5em] mb-10 underline decoration-slate-900 underline-offset-8">Property Manifesto</h2>
                         <p className="text-xl text-slate-500 font-medium leading-relaxed tracking-tight first-letter:text-5xl first-letter:font-black first-letter:text-slate-900 first-letter:mr-3 first-letter:float-left">
                             {property.description}
                         </p>
                    </section>

                    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-center transition-all hover:shadow-lg">
                             <Home className="w-8 h-8 text-orange-500 mx-auto mb-4" />
                             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Architecture</div>
                             <div className="text-sm font-black text-slate-900 uppercase italic">{property.type}</div>
                         </div>
                         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-center transition-all hover:shadow-lg">
                             <Bed className="w-8 h-8 text-orange-500 mx-auto mb-4" />
                             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Accommodation</div>
                             <div className="text-sm font-black text-slate-900 uppercase italic">{property.beds} BHK</div>
                         </div>
                         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-center transition-all hover:shadow-lg">
                             <Square className="w-8 h-8 text-orange-500 mx-auto mb-4" />
                             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Spatial Area</div>
                             <div className="text-sm font-black text-slate-900 uppercase italic">{property.area} SQFT</div>
                         </div>
                         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-center transition-all hover:shadow-lg">
                             <CheckCircle2 className="w-8 h-8 text-orange-500 mx-auto mb-4" />
                             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Verification</div>
                             <div className="text-sm font-black text-slate-900 uppercase italic">Digital</div>
                         </div>
                    </section>

                    <section className="bg-slate-900 text-white p-16 rounded-[4rem] relative overflow-hidden">
                         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                             <div>
                                 <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 italic">Concierge Support</h3>
                                 <p className="text-slate-400 font-medium max-w-sm mb-0">Our dedicated team is available 24/7 to manage your transition to this premium space.</p>
                             </div>
                             <button className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all flex items-center gap-3 active:scale-95">
                                 <Phone className="w-5 h-5" /> Schedule Call
                             </button>
                         </div>
                         <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                    </section>
                </div>

                {/* Booking Sidebar */}
                <aside className="relative">
                    <div className="sticky top-32">
                        {!success ? (
                            <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-2xl space-y-10">
                                <div className="text-center">
                                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-2">Reserve Now</h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Temporal Slot Acquisition</p>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-4">Check-In</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-orange-500 w-5 h-5" />
                                            <input 
                                                type="date" 
                                                className="w-full bg-slate-50 p-5 pl-16 rounded-[1.8rem] border border-slate-100 font-black text-slate-900 focus:border-orange-500 transition-all outline-none"
                                                onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-4">Departure</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-orange-500 w-5 h-5" />
                                            <input 
                                                type="date" 
                                                className="w-full bg-slate-50 p-5 pl-16 rounded-[1.8rem] border border-slate-100 font-black text-slate-900 focus:border-orange-500 transition-all outline-none"
                                                onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-4">Guests</label>
                                        <div className="relative">
                                            <Users className="absolute left-6 top-1/2 -translate-y-1/2 text-orange-500 w-5 h-5" />
                                            <input 
                                                type="number" 
                                                min="1" 
                                                className="w-full bg-slate-50 p-5 pl-16 rounded-[1.8rem] border border-slate-100 font-black text-slate-900 focus:border-orange-500 transition-all outline-none"
                                                value={bookingData.guests}
                                                onChange={(e) => setBookingData({...bookingData, guests: parseInt(e.target.value)})}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-6">
                                    <button 
                                        disabled={submitting}
                                        onClick={handleBooking}
                                        className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-orange-600 transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98] flex items-center justify-center gap-3"
                                    >
                                        {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm Process'}
                                    </button>
                                    <button 
                                        onClick={() => navigate('/listings')}
                                        className="w-full bg-white text-slate-400 py-6 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] hover:text-red-500 transition-all flex items-center justify-center gap-3"
                                    >
                                        <X className="w-4 h-4" /> Rescind Order
                                    </button>
                                </div>

                                <div className="p-6 bg-orange-50 border border-orange-100 rounded-3xl text-center">
                                     <p className="text-[9px] font-bold text-orange-700 uppercase leading-relaxed tracking-wider">
                                         Official Confirmation Window: <br/>
                                         Emergency: &lt;30m | Standard: 10h
                                     </p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-slate-900 p-16 rounded-[4rem] border border-white/10 shadow-2xl text-center space-y-8 animate-in zoom-in-95 duration-500">
                                <div className="w-24 h-24 bg-orange-600 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-orange-600/40">
                                    <CheckCircle2 className="w-12 h-12 text-white" />
                                </div>
                                <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Reservation Queued</h3>
                                <p className="text-slate-400 font-medium text-sm leading-relaxed uppercase tracking-widest text-[9px]">
                                    Identity Verified. Processing temporal slot. <br/>
                                    Syncing with dashboard...
                                </p>
                            </div>
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
}
