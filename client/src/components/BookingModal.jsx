import React, { useState } from 'react'
import { createBooking } from '../utils/api'
import { getUser } from '../utils/auth'

export default function BookingModal({ property, onClose }){
  const user = getUser()
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)
  const [error, setError] = useState(null)

  async function handleConfirm(){
    if (!user) { setError('Please login to book'); return }
    if (!checkIn || !checkOut) { setError('Please select dates'); return }
    if (new Date(checkOut) <= new Date(checkIn)) { setError('Check-out must be after check-in'); return }

    try {
      const booking = await createBooking({ 
        propertyId: property._id || property.id, 
        checkIn, 
        checkOut, 
        guests 
      })
      
      if (booking._id || booking.id) {
        onClose()
        alert(`Booking confirmed! ID: ${booking._id || booking.id}`)
        window.location.href = '/dashboard' // Redirect to see it
      } else {
        setError(booking.message || 'Booking failed')
      }
    } catch (err) {
      setError('Booking failed. Please try again.')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]">
      <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl transition-all scale-100 border border-slate-100">
        <h3 className="text-lg font-semibold">Book {property.title}</h3>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <input type="date" value={checkIn} onChange={(e)=>setCheckIn(e.target.value)} className="p-2 border rounded" />
          <input type="date" value={checkOut} onChange={(e)=>setCheckOut(e.target.value)} className="p-2 border rounded" />
        </div>
        <div className="mt-3">
          <label className="text-sm">Guests</label>
          <input type="number" min="1" value={guests} onChange={(e)=>setGuests(Number(e.target.value))} className="w-20 p-2 border rounded" />
        </div>
        {error && <div className="text-red-600 mt-2">{error}</div>}
        <div className="mt-4 flex gap-2 justify-end">
          <button onClick={onClose} className="px-3 py-2 border rounded">Cancel</button>
          <button onClick={handleConfirm} className="px-3 py-2 bg-sky-600 text-white rounded">Confirm</button>
        </div>
      </div>
    </div>
  )
}
