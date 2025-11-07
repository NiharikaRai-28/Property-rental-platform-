import React from 'react'
import { loadBookings, loadProperties } from '../utils/storage'

export default function Dashboard(){
  const bookings = loadBookings()
  const properties = loadProperties()

  return (
    <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2">
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold">Your Bookings</h3>
        <ul className="mt-3 space-y-2">
          {bookings.length === 0 && <li className="text-slate-500">No bookings yet</li>}
          {bookings.map(b => (
            <li key={b.id} className="border rounded p-2">
              <div>Booking: {b.id}</div>
              <div>Property: {properties.find(p=>p.id===b.propertyId)?.title || b.propertyId}</div>
              <div>{b.checkIn} → {b.checkOut}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold">Your Listings</h3>
        <ul className="mt-3 space-y-2">
          {properties.map(p => (
            <li key={p.id} className="border rounded p-2">
              <div className="font-medium">{p.title}</div>
              <div className="text-sm text-slate-600">{p.location}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
