import React from 'react'
import { Link } from 'react-router-dom'
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUpRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand & About */}
        <div className="md:col-span-1">
          <Link to="/" className="text-2xl font-black tracking-tighter flex items-center gap-2 mb-6">
            <div className="bg-accent p-1.5 rounded-lg text-white">
              <Home size={22} />
            </div>
            RENTIFY
          </Link>
          <p className="text-slate-400 leading-relaxed mb-6">
            Unlocking the doors to your dream lifestyle. We provide the most seamless experience for renting and selling high-end properties.
          </p>
          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-6">Quick Links</h3>
          <ul className="space-y-4 text-slate-400 font-medium">
            <li><Link to="/listings" className="hover:text-accent transition-colors flex items-center gap-2 group">
              Explore Listings <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
            </Link></li>
            <li><Link to="/add" className="hover:text-accent transition-colors flex items-center gap-2 group">
              List Your Property <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
            </Link></li>
            <li><Link to="/dashboard" className="hover:text-accent transition-colors flex items-center gap-2 group">
              User Dashboard <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
            </Link></li>
            <li><Link to="/auth" className="hover:text-accent transition-colors flex items-center gap-2 group">
              Authentication <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
            </Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-bold mb-6">Support</h3>
          <ul className="space-y-4 text-slate-400 font-medium">
            <li><a href="#" className="hover:text-accent transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Support Ticket</a></li>
          </ul>
        </div>

        {/* Newsletter / Contact */}
        <div>
          <h3 className="text-lg font-bold mb-6">Contact Us</h3>
          <ul className="space-y-4 text-slate-400 font-medium mb-8">
            <li className="flex items-center gap-3">
              <div className="text-accent bg-accent/10 p-2 rounded-lg"><Mail size={18} /></div>
              contact@rentify.com
            </li>
            <li className="flex items-center gap-3">
              <div className="text-accent bg-accent/10 p-2 rounded-lg"><Phone size={18} /></div>
              +91 (555) 000-1234
            </li>
            <li className="flex items-center gap-3">
              <div className="text-accent bg-accent/10 p-2 rounded-lg"><MapPin size={18} /></div>
              Varanasi, Uttar Pradesh, India
            </li>
          </ul>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Your email address" 
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-accent transition-colors"
            />
            <button className="absolute right-2 top-2 bg-accent p-2 rounded-lg hover:bg-orange-600 transition-colors">
              <ArrowUpRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-6xl mx-auto px-6 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-slate-500 text-sm font-medium">
          © 2026 Rentify Real Estate Platform. All rights reserved.
        </p>
        <div className="flex gap-8 text-slate-500 text-sm font-medium">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          <a href="#" className="hover:text-white transition-colors">Sitemap</a>
        </div>
      </div>
    </footer>
  )
}
