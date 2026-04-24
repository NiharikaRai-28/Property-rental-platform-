import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Home as HomeIcon, Target, Award, ArrowRight, CheckCircle2, Search, Calendar, Key, MapPin, Star, MousePointer2, User } from 'lucide-react';

const steps = [
    { title: 'Search Property', desc: 'Find your perfect home from our curated list of elite properties.', icon: <Search className="w-10 h-10" /> },
    { title: 'Book Your Stay', desc: 'Secure your spot with a single click using our verified checkout.', icon: <Calendar className="w-10 h-10" /> },
    { title: 'Get Your Keys', desc: 'Move in instantly with digital documentation and smart access.', icon: <Key className="w-10 h-10" /> },
];

export default function About() {
    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Hero Section - Balanced & Clean */}
            <section className="relative h-[60vh] flex items-center justify-center pt-20 overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=80" 
                    alt="Luxury Home" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/20"></div>
                <div className="relative z-10 text-center px-4 w-full max-w-5xl">
                    <span className="bg-orange-600 text-white px-6 py-2.5 rounded-full font-black uppercase tracking-[0.4em] text-[10px] mb-8 inline-block shadow-2xl">The Veedoo Manifesto</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter uppercase drop-shadow-2xl">
                        Our <span className="text-orange-500">Identity.</span>
                    </h1>
                </div>
            </section>

            {/* Our Mission Section */}
            <section className="py-24 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-12">
                    <div>
                        <span className="text-orange-600 font-bold uppercase tracking-[0.4em] text-[11px] mb-4 block underline decoration-slate-900 underline-offset-8">Our Vision</span>
                        <h2 className="text-6xl font-black text-slate-900 mt-10 tracking-tighter leading-none uppercase">Empowering <br/>Premium <span className="text-orange-600 font-normal italic">Living.</span></h2>
                        <p className="text-xl text-slate-500 font-medium leading-relaxed pt-8 tracking-tight">
                            At Veedoo, we believe that finding a home should be as seamless as living in one. We bridge the gap between world-class properties and global citizens through transparent technology.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="p-10 bg-white rounded-[3.5rem] border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:scale-[1.03]">
                            <h4 className="text-3xl font-black text-slate-900 uppercase mb-2">100%</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vetted Properties</p>
                        </div>
                        <div className="p-10 bg-white rounded-[3.5rem] border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:scale-[1.03]">
                            <h4 className="text-3xl font-black text-slate-900 uppercase mb-2">24/7</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Digital Support</p>
                        </div>
                    </div>
                </div>
                <div className="relative group">
                    <img src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80" className="rounded-[4rem] h-[650px] w-full object-cover shadow-2xl transition-transform duration-700" alt="" />
                    <div className="absolute top-1/2 -left-12 bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl rotate-3">
                         <Target className="w-12 h-12 text-orange-500 mb-6" />
                         <div className="text-3xl font-black uppercase leading-[1.1] tracking-tighter">Focused on <br/>Integrity.</div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-24">
                        <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px] block underline decoration-white underline-offset-8">The Process</span>
                        <h2 className="text-6xl font-black mt-10 tracking-tighter uppercase">How It Works.</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-12">
                        {steps.map((step, i) => (
                            <div key={i} className="text-center group p-14 bg-white/5 rounded-[4.5rem] border border-white/10 hover:bg-orange-600 transition-all duration-500 hover:scale-[1.02]">
                                <div className="w-24 h-24 bg-white/10 rounded-[2rem] flex items-center justify-center mx-auto mb-12 group-hover:bg-white group-hover:text-orange-600 transition-all rotate-3 group-hover:rotate-12 border border-white/5">
                                    {step.icon}
                                </div>
                                <h4 className="text-3xl font-black uppercase mb-4 tracking-tighter">{step.title}</h4>
                                <p className="text-slate-400 group-hover:text-white/90 font-medium transition-colors leading-relaxed text-sm">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px]"></div>
            </section>

            {/* Standards Section */}
            <section className="py-32 max-w-7xl mx-auto px-6">
                <div className="bg-white rounded-[5rem] p-24 shadow-xl border border-slate-100 grid lg:grid-cols-3 gap-20 items-center">
                    <div className="lg:col-span-2">
                        <span className="text-orange-600 font-bold uppercase tracking-widest text-[11px] mb-6 block">Veedoo Standards</span>
                        <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Excellence Is Consistent.</h2>
                        <div className="grid md:grid-cols-2 gap-10 mt-16">
                            <div className="flex items-start gap-4">
                                <CheckCircle2 className="text-orange-600 w-6 h-6 flex-shrink-0 mt-1" />
                                <span className="font-semibold text-slate-600 tracking-tight">High-speed gigabit fiber infrastructure.</span>
                            </div>
                            <div className="flex items-start gap-4">
                                <CheckCircle2 className="text-orange-600 w-6 h-6 flex-shrink-0 mt-1" />
                                <span className="font-semibold text-slate-600 tracking-tight">Curated furnishing by global designers.</span>
                            </div>
                            <div className="flex items-start gap-4">
                                <CheckCircle2 className="text-orange-600 w-6 h-6 flex-shrink-0 mt-1" />
                                <span className="font-semibold text-slate-600 tracking-tight">Biometric and digital smart security.</span>
                            </div>
                            <div className="flex items-start gap-4">
                                <CheckCircle2 className="text-orange-600 w-6 h-6 flex-shrink-0 mt-1" />
                                <span className="font-semibold text-slate-600 tracking-tight">Professional on-demand housekeeping.</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                         <div className="w-56 h-56 bg-slate-900 rounded-full flex items-center justify-center p-10 text-white text-center shadow-2xl relative">
                             <div className="text-2xl font-black uppercase leading-tight tracking-tighter">Veedoo <br/> Certified <br/> <span className="text-orange-500 font-normal italic lowercase border-t border-white/20 mt-2 block pt-2">Nexus</span></div>
                             <div className="absolute inset-0 border-4 border-orange-600 border-dashed rounded-full animate-[spin_20s_linear_infinite]"></div>
                         </div>
                    </div>
                </div>
            </section>

             {/* Footer - Elegant & Minimal */}
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
                            Establishing the digital frontier for global living and professional rental access.
                        </p>
                        <div className="flex gap-4">
                             <div className="w-12 h-12 bg-white/5 rounded-[1rem] border border-white/10 flex items-center justify-center hover:bg-orange-600 transition-all cursor-pointer"></div>
                             <div className="w-12 h-12 bg-white/5 rounded-[1rem] border border-white/10 flex items-center justify-center hover:bg-orange-600 transition-all cursor-pointer"></div>
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
                        <h4 className="text-xs font-black mb-10 uppercase tracking-[0.4em] text-orange-500 underline decoration-white underline-offset-[12px]">Base Ops</h4>
                        <ul className="space-y-6 text-slate-400 font-bold uppercase tracking-tight text-xs text-white">
                            <li className="flex items-center gap-4">
                                <MapPin className="text-orange-500 w-4 h-4" />
                                123 Sky Tower, Bangalore
                            </li>
                            <li className="flex items-center gap-4">
                                <Star className="text-orange-500 w-4 h-4" />
                                HQ@VEEDOO.COM
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="text-center pt-10 border-t border-white/5 text-slate-700 font-black text-[9px] uppercase tracking-[1.1em]">
                    © 2026 Veedoo Nexus Collective. Secure Terminal.
                </div>
            </footer>
        </div>
    );
}
