import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchPropertyById } from '../utils/api'
import BookingModal from '../components/BookingModal'
import { MapPin, Bed, Maximize, Building2, ChevronLeft } from 'lucide-react'

export default function PropertyDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetchPropertyById(id).then(data => setProperty(data))
  }, [id])

  if (!property) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-12">
      <button 
        onClick={() => navigate('/listings')} 
        className="flex items-center gap-2 text-slate-500 hover:text-accent mb-8 font-bold transition-colors"
      >
        <ChevronLeft size={20} />
        Back to Listings
      </button>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="bg-slate-100 rounded-[2rem] overflow-hidden min-h-[400px] flex items-center justify-center relative shadow-lg">
          {property.image ? (
            <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
          ) : (
            <div className="text-slate-400 font-bold text-center p-10">
              <Building2 size={80} className="mx-auto mb-4 opacity-20" />
              <p className="text-xl">Preview Image for {property.title}</p>
              <p className="text-sm mt-2 font-medium">(Alt: {property.title})</p>
            </div>
          )}
          <div className="absolute top-6 left-6 bg-accent text-white px-6 py-2 rounded-full font-black text-xl shadow-xl">
            ${property.price.toLocaleString()} <span className="text-xs font-bold">/ night</span>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col">
          <div className="bg-orange-50 text-accent px-4 py-1.5 rounded-full w-fit text-sm font-black uppercase tracking-widest mb-4">
            {property.type || 'Penthuse'}
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-primary leading-tight mb-4">
            {property.title}
          </h1>
          <div className="flex items-center gap-2 text-slate-500 mb-8 font-bold">
            <MapPin size={20} className="text-accent" />
            {property.location}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="card flex flex-col items-center justify-center p-4">
              <Bed className="text-accent mb-2" size={24} />
              <span className="font-black text-lg">{property.beds || '3'}</span>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Bedrooms</span>
            </div>
            <div className="card flex flex-col items-center justify-center p-4">
              <Maximize className="text-accent mb-2" size={24} />
              <span className="font-black text-lg">{property.area || '2400'}</span>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Sq. Ft</span>
            </div>
            <div className="card flex flex-col items-center justify-center p-4">
              <Building2 className="text-accent mb-2" size={24} />
              <span className="font-black text-lg">New</span>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Condition</span>
            </div>
          </div>

          <div className="prose prose-slate mb-10">
            <h3 className="text-xl font-bold mb-4">Description</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              {property.description || "Experience living in this masterfully designed property. It features top-of-the-line amenities, spacious interiors, and is situated in one of the most prestigious neighborhoods."}
            </p>
          </div>

          <div className="mt-auto flex gap-4">
            <button 
              onClick={() => setOpen(true)} 
              className="flex-1 btn-primary !py-5 !text-lg !rounded-2xl shadow-[0_10px_30px_rgba(249,115,22,0.3)]"
            >
              Confirm Booking Now
            </button>
          </div>
        </div>
      </div>

      {open && <BookingModal property={property} onClose={() => setOpen(false)} />}
    </div>
  )
}
