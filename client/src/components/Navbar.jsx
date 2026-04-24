import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUser, logout } from '../utils/auth'
import { Home, LogOut, LayoutDashboard, PlusCircle, UserCircle } from 'lucide-react'

export default function Navbar() {
  const user = getUser()
  const nav = useNavigate()

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-black tracking-tighter flex items-center gap-2 text-primary">
            <div className="bg-accent p-1.5 rounded-lg text-white">
              <Home size={22} />
            </div>
            RENTIFY
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 mr-4 border-r border-slate-100 pr-6">
            <Link to="/listings" className="font-bold text-slate-600 hover:text-accent transition-colors text-sm uppercase tracking-tighter">Listings</Link>
            <Link to="/about" className="font-bold text-slate-600 hover:text-accent transition-colors text-sm uppercase tracking-tighter">About</Link>
            <Link to="/dashboard" className="font-bold text-slate-600 hover:text-accent transition-colors text-sm uppercase tracking-tighter">Bookings</Link>
          </div>

          <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/add" className="hidden sm:flex items-center gap-2 btn-primary !py-2 !px-4">
                <PlusCircle size={18} />
                List Property
              </Link>
              <div className="h-8 w-[1px] bg-slate-200"></div>
              <div className="flex items-center gap-3 group cursor-pointer relative">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-accent">
                  <UserCircle size={24} />
                </div>
                <div className="hidden lg:block">
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Account</div>
                  <div className="text-sm font-bold text-primary truncate max-w-[100px]">{user.email || 'User'}</div>
                </div>
                
                {/* Minimal Dropdown Simulation with CSS Hover */}
                <div className="absolute top-12 right-0 w-48 bg-white rounded-xl shadow-xl border border-slate-100 p-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all transform translate-y-2 group-hover:translate-y-0">
                  <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-sm font-semibold">
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => { logout(); nav('/auth') }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 text-sm font-semibold mt-1"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/auth" className="flex items-center gap-2 font-bold text-primary hover:text-accent transition-colors">
              <UserCircle size={20} />
              Login / Sign Up
            </Link>
          )}
        </div>
      </div>
    </div>
  </nav>
)
}
