import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Search, PlusCircle, LayoutDashboard, User, Info, LogOut, Heart, UserCircle } from 'lucide-react';

export default function Navbar() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');
    
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

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 h-20 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
                <div className="w-11 h-11 bg-slate-900 rounded-[1.2rem] flex items-center justify-center shadow-lg shadow-slate-900/10">
                    <Home className="text-white w-5 h-5" />
                </div>
                <div className="flex flex-col -space-y-1">
                    <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase font-outfit">Veedoo</span>
                    <span className="text-[9px] font-bold text-orange-600 tracking-[0.3em] uppercase">Ecosystem</span>
                </div>
            </Link>

            <div className="hidden lg:flex items-center gap-10 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
                <Link to="/about" className="hover:text-slate-900 transition-colors">About</Link>
                <Link to="/listings" className="hover:text-slate-900 transition-colors">Listing</Link>
                {isLoggedIn && (
                    <>
                        <Link to="/dashboard" className="hover:text-orange-600 text-orange-600 transition-colors border-b-2 border-orange-500/0 hover:border-orange-500 pb-1">My Bookings</Link>
                        <Link to="/add" className="hover:text-slate-900 transition-all flex items-center gap-1.5 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                            <PlusCircle className="w-3.5 h-3.5" />
                            Add Property
                        </Link>
                    </>
                )}
            </div>

            <div className="flex items-center gap-4">
                {isLoggedIn ? (
                    <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100 shadow-inner">
                        <Link to="/dashboard" className="h-9 px-4 flex items-center gap-2 text-slate-500 hover:text-slate-900 hover:bg-white rounded-xl transition-all font-bold text-[10px] uppercase">
                            <UserCircle className="w-4 h-4" />
                            {user.name?.split(' ')[0] || 'User'}
                        </Link>
                        <button 
                            onClick={handleLogout}
                            className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-white rounded-xl transition-all"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <Link to="/auth" className="flex items-center gap-3 bg-slate-900 text-white px-8 py-3.5 rounded-[1.2rem] font-bold text-xs hover:bg-orange-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95 uppercase tracking-widest">
                        <User className="w-4 h-4" />
                        Sign In / Join
                    </Link>
                )}
            </div>
        </nav>
    );
}
