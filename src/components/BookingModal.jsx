import React, { useState } from 'react'
import { bookProperty } from '../utils/storage'

export default function BookingModal({ property, onClose }){
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)
  const [error, setError] = useState(null)

  function handleConfirm(){
    if (!checkIn || !checkOut) { setError('Please select dates'); return }
    if (new Date(checkOut) <= new Date(checkIn)) { setError('Check-out must be after check-in'); return }

    const booking = bookProperty({ propertyId: property.id, checkIn, checkOut, guests })
    onClose()
    alert(`Booking confirmed: ${booking.id}`)
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-lightblue rounded-lg p-6 max-w-md w-full">
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
