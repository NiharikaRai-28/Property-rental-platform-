import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Home, ShieldCheck } from 'lucide-react';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'buyer' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
        
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            
            if (res.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                // Use a hard redirect to ensure the entire App state (including Navbar) resets properly
                window.location.href = '/';
            } else {
                setError(data.message || 'Authentication failed');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 italic">
            <div className="bg-white w-full max-w-5xl rounded-[4rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-auto min-h-[700px] border border-slate-100">
                {/* Visual Side */}
                <div className="md:w-1/2 relative bg-slate-900 p-16 flex flex-col justify-between overflow-hidden">
                    <img 
                        src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1000&q=80" 
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                        alt=""
                    />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-600/30 rotate-3 transition-transform hover:rotate-12 cursor-pointer" onClick={() => navigate('/')}>
                                <Home className="text-white w-6 h-6 -rotate-3" />
                            </div>
                            <span className="text-3xl font-black text-white tracking-tighter uppercase">Veedoo</span>
                        </div>
                        <h2 className="text-5xl font-black text-white leading-tight mb-6 tracking-tighter underline underline-offset-[12px] decoration-orange-600">
                            Join Our <br/>Premium <br/>Ecosystem.
                        </h2>
                    </div>
                    
                    <div className="relative z-10 bg-white/10 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/20">
                        <div className="flex items-center gap-2 text-orange-500 mb-3">
                            <ShieldCheck className="w-5 h-5" />
                            <span className="text-xs font-black uppercase tracking-[0.2em]">Secure Access</span>
                        </div>
                        <p className="text-white/80 font-bold leading-relaxed tracking-tight">
                            "The modern standard for elite property management. Experience the future of living today."
                        </p>
                    </div>
                </div>

                {/* Form Side */}
                <div className="md:w-1/2 p-12 md:p-20 bg-white flex flex-col justify-center">
                    <div className="mb-12">
                        <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-2 uppercase">
                            {isLogin ? 'Authenticating' : 'Registration'}
                        </h3>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                            {isLogin ? 'Enter access codes for Nexus Core.' : 'Register unique identifier for global access.'}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-8 p-4 bg-red-100/50 border-l-4 border-red-500 text-red-700 font-bold rounded-r-xl text-xs italic uppercase tracking-widest">
                            ERROR: {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4 italic">Full Identity Name</label>
                                <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3 border border-slate-100 focus-within:border-orange-500 transition-all">
                                    <User className="text-slate-400 w-5 h-5" />
                                    <input 
                                        type="text" 
                                        placeholder="EX: ALEXANDER DRAKE" 
                                        className="bg-transparent border-none focus:outline-none w-full font-black text-slate-900 uppercase italic tracking-tighter"
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4 italic">Encrypted Email</label>
                            <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3 border border-slate-100 focus-within:border-orange-500 transition-all">
                                <Mail className="text-slate-400 w-5 h-5" />
                                <input 
                                    type="email" 
                                    placeholder="IDENTITY@VEEDOO.COM" 
                                    className="bg-transparent border-none focus:outline-none w-full font-black text-slate-900 uppercase italic tracking-tighter"
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4 italic">Access Key</label>
                            <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3 border border-slate-100 focus-within:border-orange-500 transition-all">
                                <Lock className="text-slate-400 w-5 h-5" />
                                <input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="bg-transparent border-none focus:outline-none w-full font-black text-slate-900 uppercase italic tracking-tighter"
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    required
                                />
                            </div>
                        </div>

                        {!isLogin && (
                            <div className="space-y-2">
                                <div className="flex gap-4">
                                    <button 
                                        type="button"
                                        onClick={() => setFormData({...formData, role: 'buyer'})}
                                        className={`flex-1 py-5 rounded-2xl font-black border transition-all uppercase italic tracking-tighter text-sm ${formData.role === 'buyer' ? 'bg-orange-600 text-white border-orange-600 shadow-xl shadow-orange-600/20' : 'bg-white text-slate-400 border-slate-100'}`}
                                    >
                                        RENTER
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setFormData({...formData, role: 'seller'})}
                                        className={`flex-1 py-5 rounded-2xl font-black border transition-all uppercase italic tracking-tighter text-sm ${formData.role === 'seller' ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/20' : 'bg-white text-slate-400 border-slate-100'}`}
                                    >
                                        OWNER
                                    </button>
                                </div>
                            </div>
                        )}

                        <button 
                            type="submit" 
                            className="w-full bg-orange-600 text-white py-7 rounded-[2rem] font-black text-xl italic hover:bg-orange-700 transition-all shadow-2xl shadow-orange-600/30 active:scale-[0.98] flex items-center justify-center gap-4 uppercase tracking-[0.1em]"
                        >
                            {isLogin ? 'Grant Access' : 'Initialize Account'}
                            <ArrowRight className="w-6 h-6" />
                        </button>
                    </form>

                    <div className="mt-12 text-center">
                        <button 
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-slate-400 font-black hover:text-orange-600 transition-colors uppercase tracking-[0.3em] text-[10px] italic"
                        >
                            {isLogin ? "Generate New Identity" : "Login Secondary Terminal"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
