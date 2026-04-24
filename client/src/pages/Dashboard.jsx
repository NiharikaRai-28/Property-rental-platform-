import React, { useState, useEffect } from 'react'
import { fetchBookings, fetchProperties, deleteBooking } from '../utils/api'
import { getUser } from '../utils/auth'
import { LayoutDashboard, Home, BookOpen, Clock, Trash2, CheckCircle2 } from 'lucide-react'

export default function Dashboard() {
  const [bookings, setBookings] = useState([])
  const [properties, setProperties] = useState([])
  const [msg, setMsg] = useState('')
  const user = getUser()

  useEffect(() => {
    if (user) {
      loadData()
    }
  }, [user])

  const loadData = () => {
    fetchBookings().then(data => setBookings(data))
    fetchProperties().then(data => setProperties(data))
  }

  const handleCancel = async (id) => {
    const res = await deleteBooking(id)
    if (res.message.includes('successfully')) {
      setMsg('Booking cancelled successfully.')
      loadData()
    } else {
      setMsg(res.message)
    }
    setTimeout(() => setMsg(''), 5000)
  }

  const isCancellable = (createdAt) => {
    const now = new Date()
    const created = new Date(createdAt)
    const diff = (now - created) / (1000 * 60 * 60)
    return diff < 24
  }

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 min-h-screen">
      <div className="flex items-center gap-4 mb-10">
        <div className="bg-accent p-3 rounded-2xl text-white shadow-lg">
          <LayoutDashboard size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-primary">User Dashboard</h1>
          <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mt-1">Manage your properties and stays</p>
        </div>
      </div>

      {msg && (
        <div className="mb-6 p-4 bg-orange-50 border border-accent/20 text-accent font-bold rounded-xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 size={20} />
          {msg}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Bookings Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="text-accent" />
            <h2 className="text-2xl font-black text-primary">Your Bookings</h2>
          </div>
          <div className="space-y-4">
            {Array.isArray(bookings) && bookings.length === 0 ? (
              <div className="card p-10 text-center text-slate-400 font-bold">No stays booked yet.</div>
            ) : Array.isArray(bookings) ? (
              bookings.map(b => (
                <div key={b._id || b.id} className="card group hover:border-accent/30 transition-all p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-black text-xl text-primary">
                        {b.propertyId?.title || 'Luxury Property'}
                      </h3>
                      <div className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-tighter">
                        Booking ID: {b._id || b.id}
                      </div>
                    </div>
                    {isCancellable(b.createdAt) ? (
                      <div className="bg-green-50 text-green-600 p-2 rounded-lg flex items-center gap-2 text-xs font-black uppercase">
                        <Clock size={14} /> Cancellable
                      </div>
                    ) : (
                      <div className="bg-slate-50 text-slate-400 p-2 rounded-lg flex items-center gap-2 text-xs font-black uppercase">
                        <CheckCircle2 size={14} /> Confirmed
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-50 p-3 rounded-xl">
                      <div className="text-[10px] font-black text-slate-400 uppercase mb-1">Check In</div>
                      <div className="font-bold text-primary">{new Date(b.checkIn).toLocaleDateString()}</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl">
                      <div className="text-[10px] font-black text-slate-400 uppercase mb-1">Guests</div>
                      <div className="font-bold text-primary">{b.guests} Guests</div>
                    </div>
                  </div>

                  {isCancellable(b.createdAt) && (
                    <button 
                      onClick={() => handleCancel(b._id || b.id)}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-red-100 text-red-600 font-bold hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={18} />
                      Cancel Booking
                    </button>
                  )}
                </div>
              ))
            ) : (
                <div className="card p-10 text-center text-slate-400 font-bold">Failed to load bookings. Please login to view your stays.</div>
            )}
          </div>
        </section>

        {/* Listings Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Home className="text-accent" />
            <h2 className="text-2xl font-black text-primary">My Properties</h2>
          </div>
          <div className="space-y-4">
            {properties.filter(p => p && !(p._id || p.id || '').toString().startsWith('mock-')).length === 0 ? (
              <div className="card p-10 text-center text-slate-400 font-bold">You haven't listed any property yet.</div>
            ) : (
              properties.filter(p => p && !(p._id || p.id || '').toString().startsWith('mock-')).map(p => (
                <div key={p._id || p.id} className="card p-6 flex gap-4 items-center">
                   <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center text-accent">
                      <Home size={24} />
                   </div>
                   <div>
                      <h3 className="font-black text-lg text-primary">{p.title}</h3>
                      <p className="text-sm font-bold text-slate-500">{p.location}</p>
                   </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
