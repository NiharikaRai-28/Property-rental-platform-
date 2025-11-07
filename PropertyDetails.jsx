import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPropertyById } from '../utils/storage'
import BookingModal from '../components/BookingModal'

export default function PropertyDetails(){
  const { id } = useParams()
  const navigate = useNavigate()
  const property = getPropertyById(id)
  const [open, setOpen] = useState(false)

  if (!property) return <div>Property not found</div>

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <img src={property.image} alt={property.title} className="w-full h-80 object-cover rounded" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{property.title}</h2>
          <p className="text-slate-600 mt-2">{property.location}</p>
          <div className="mt-4">{property.description}</div>
          <div className="mt-4 text-xl font-semibold">₹{property.price}/night</div>

          <div className="mt-6 flex gap-2">
            <button onClick={()=> setOpen(true)} className="px-4 py-2 bg-sky-600 text-white rounded">Book Now</button>
            <button onClick={()=> navigate('/listings')} className="px-4 py-2 border rounded">Back</button>
          </div>
        </div>
      </div>

      {open && <BookingModal property={property} onClose={()=> setOpen(false)} />}
    </div>
  )
}
