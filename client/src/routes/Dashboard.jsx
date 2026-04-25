import React, { useState, useEffect } from 'react';
import { Calendar, Home, MapPin, Loader2, AlertCircle, User, LogOut, ArrowRight, CheckCircle2, Building2, UserCircle, X } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function Dashboard() {
    const [bookings, setBookings] = useState([]);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    let user = {};
    try {
        const storedUser = localStorage.getItem('user');
        if (storedUser && storedUser !== 'undefined') {
            user = JSON.parse(storedUser);
        }
    } catch (e) {
        console.error('Failed to parse user from localStorage', e);
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/auth';
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/auth');
                    return;
                }

                const [bookingsRes, propertiesRes] = await Promise.all([
                    fetch('/api/bookings', {
                        headers: { 
                            'Authorization': `Bearer ${token}`,
                            'Cache-Control': 'no-cache'
                        }
                    }),
                    fetch('/api/properties')
                ]);

                if (bookingsRes.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/auth');
                    return;
                }
                
                const bookingsData = await bookingsRes.json();
                const propertiesData = await propertiesRes.json();

                setBookings(Array.isArray(bookingsData) ? bookingsData : []);
                setProperties(Array.isArray(propertiesData) ? propertiesData : []);
            } catch (err) {
                console.error('Fetch error:', err);
                setError('Failed to sync dashboard data. Please check your connection.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const handleCancel = async (bookingId) => {
        if (!window.confirm('Are you sure you want to rescind this reservation? This action is irreversible.')) return;
        
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`/api/bookings/${bookingId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                setBookings(bookings.filter(b => b._id !== bookingId));
                alert('Reservation successfully rescinded.');
            } else {
                const err = await res.json();
                alert(err.message || 'Cancellation window expired or system failure.');
            }
        } catch (err) {
            alert('Cancellation sync failed.');
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
            <Loader2 className="w-12 h-12 animate-spin mb-6 text-orange-500" />
            <p className="font-semibold text-slate-500 uppercase tracking-[0.2em] text-xs">Accessing Nexus Core...</p>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
            <div className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                <h2 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tighter">System Error</h2>
                <p className="text-slate-500 font-medium mb-10">{error}</p>
                <button onClick={() => window.location.reload()} className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold hover:bg-orange-700 transition-all">
                    Retry Synchronization
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-3">
                            <UserCircle className="w-4 h-4" /> User Control Center
                        </div>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tight uppercase">
                            Dashboard
                        </h1>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => navigate('/add')}
                            className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider hover:bg-orange-600 transition-all flex items-center gap-2 shadow-lg shadow-slate-900/10"
                        >
                            <Building2 className="w-4 h-4" /> List Property
                        </button>
                        <button 
                            onClick={handleLogout}
                            className="p-4 bg-white text-slate-400 hover:text-red-600 border border-slate-100 rounded-2xl transition-all shadow-sm"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar Stats */}
                    <aside className="space-y-8">
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-50">
                                <div className="w-14 h-14 bg-gradient-to-tr from-orange-600 to-orange-400 text-white rounded-2xl flex items-center justify-center font-black text-xl uppercase shadow-lg shadow-orange-500/20">
                                    {user.name ? user.name[0] : 'U'}
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-slate-900 truncate max-w-[150px]">{user.name}</h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user.role || 'Resident'}</p>
                                </div>
                            </div>
                            <div className="space-y-5">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bookings</span>
                                    <span className="font-black text-slate-900">{bookings.length}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">My Listings</span>
                                    <span className="font-black text-slate-900">{properties.filter(p => p.ownerId === 'admin').length}</span>
                                </div>
                                <div className="pt-5 border-t border-slate-50">
                                    <span className="text-green-600 font-black text-[10px] uppercase tracking-[0.2em] bg-green-50 px-3 py-1.5 rounded-full border border-green-100 flex items-center justify-center gap-1">
                                        <CheckCircle2 className="w-3 h-3" /> Identity Verified
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] relative overflow-hidden group">
                            <div className="relative z-10">
                                <h4 className="text-lg font-black mb-2 uppercase italic tracking-tighter">Upgrade Plan</h4>
                                <p className="text-xs text-slate-400 font-medium mb-6">Unlock priority support and unlimited properties.</p>
                                <button className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 hover:text-white transition-colors flex items-center gap-2">
                                    Learn More <ArrowRight className="w-3 h-3" />
                                </button>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-12">
                        {/* Bookings Section */}
                        <section>
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Active Reservations</h2>
                                <Link to="/listings" className="text-[10px] font-black text-orange-600 uppercase tracking-[.3em] hover:underline underline-offset-8">Explore More</Link>
                            </div>
                            
                            <div className="grid gap-4">
                                {bookings.length === 0 ? (
                                    <div className="bg-white p-16 rounded-[3rem] border border-slate-100 text-center shadow-sm">
                                        <p className="text-slate-400 font-semibold uppercase tracking-widest text-sm mb-6">No properties booked yet.</p>
                                        <Link to="/listings" className="bg-slate-50 text-slate-600 px-8 py-3 rounded-xl font-bold hover:bg-orange-50 hover:text-orange-600 transition-all border border-slate-100">
                                            Start Your Search
                                        </Link>
                                    </div>
                                ) : (
                                    bookings.map(booking => {
                                        const prop = properties.find(p => p._id === (booking.propertyId?._id || booking.propertyId));
                                        return (
                                            <div key={booking._id} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 hover:border-orange-200 transition-all flex flex-col md:flex-row items-center gap-6 group">
                                                <div className="relative w-full md:w-32 h-32 flex-shrink-0 overflow-hidden rounded-[1.5rem]">
                                                    <img 
                                                        src={prop?.image || 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=200'} 
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                                        alt="" 
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-xl font-black text-slate-900 mb-2 truncate uppercase tracking-tighter">{prop?.title || 'Nexus Property'}</h4>
                                                    <div className="flex flex-wrap items-center gap-6">
                                                        <div className="flex items-center gap-1.5 text-slate-400 font-bold text-xs">
                                                            <MapPin className="text-orange-500 w-3.5 h-3.5" />
                                                            {prop?.location || 'Coordinate Unset'}
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-slate-900 font-black text-xs uppercase italic tracking-tighter">
                                                            <Calendar className="text-orange-500 w-3.5 h-3.5" />
                                                            {booking.checkIn} - {booking.checkOut}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-3 min-w-[150px]">
                                                    <div className="bg-slate-50 px-6 py-4 rounded-2xl text-center w-full border border-slate-100 shadow-sm group-hover:bg-white transition-colors">
                                                        <div className="text-[9px] font-black text-orange-600 uppercase tracking-widest mb-1">Status</div>
                                                        <div className={`text-sm font-black uppercase italic ${booking.status === 'confirmed' ? 'text-green-600' : 'text-slate-900'}`}>
                                                            {booking.status || 'Verified'}
                                                        </div>
                                                    </div>
                                                    {booking.status !== 'confirmed' && (
                                                        <button 
                                                            onClick={() => handleCancel(booking._id)}
                                                            className="text-[9px] font-black text-slate-400 hover:text-red-600 uppercase tracking-widest transition-colors flex items-center gap-1"
                                                        >
                                                            <X className="w-3 h-3" /> Rescind Request
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </section>

                        {/* Managed Listings Section */}
                        <section>
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Managed Portfolio</h2>
                                <Link to="/add" className="w-10 h-10 bg-white text-slate-400 hover:text-orange-600 rounded-full border border-slate-100 flex items-center justify-center transition-all shadow-sm">
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {properties.filter(p => p.ownerId === 'admin').length === 0 ? (
                                     <div className="md:col-span-2 bg-slate-50/50 p-10 rounded-[3rem] border border-dashed border-slate-200 text-center">
                                         <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Your portfolio is empty.</p>
                                     </div>
                                ) : (
                                    properties.filter(p => p.ownerId === 'admin').map(property => (
                                        <div key={property._id} className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-lg transition-all border-l-8 border-l-slate-900 hover:border-l-orange-500">
                                            <div>
                                                <h4 className="font-black text-slate-900 text-lg uppercase tracking-tighter mb-1">{property.title}</h4>
                                                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                                                    <MapPin className="w-3.5 h-3.5 text-orange-500" />
                                                    {property.location}
                                                </div>
                                            </div>
                                            <button className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all shadow-sm">
                                                <ArrowRight className="w-5 h-5 pointer-events-none" />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
