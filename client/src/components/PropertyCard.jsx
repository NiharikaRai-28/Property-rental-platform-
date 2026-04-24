import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Bed, Maximize, Building2 } from 'lucide-react'

export default function PropertyCard({ p }) {
  // Use a placeholder if image is missing, or respect the user's "alt message in place of image" request
  return (
    <Link to={`/property/${p._id || p.id}`} className="group h-full">
      <div className="card h-full flex flex-col p-0 overflow-hidden border-none shadow-md group-hover:shadow-2xl transition-all">
        {/* Image / Placeholder Section */}
        <div className="relative h-56 w-full bg-slate-200 overflow-hidden">
          {p.image ? (
            <img 
              src={p.image} 
              alt={p.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div className={`absolute inset-0 flex items-center justify-center text-slate-400 font-bold text-lg p-6 text-center ${p.image ? 'hidden' : 'flex'}`}>
            {p.title} - Preview Image (Alt: {p.title})
          </div>
          
          {/* Price Badge */}
          <div className="absolute bottom-4 left-4 bg-primary/80 backdrop-blur-md text-white px-3 py-1.5 rounded-lg font-bold">
            ${p.price.toLocaleString()}
          </div>
        </div>

        {/* Details Section */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="font-bold text-xl text-primary group-hover:text-accent transition-colors line-clamp-1">
            {p.title}
          </h3>
          
          <div className="flex items-center gap-1.5 text-slate-500 mt-2">
            <MapPin size={14} className="text-accent" />
            <span className="text-xs font-semibold line-clamp-1">{p.location}</span>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Building2 size={16} className="text-accent" />
              <span className="text-xs font-bold">{p.type || 'Penthuse'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500">
              <Maximize size={16} className="text-accent" />
              <span className="text-xs font-bold">{p.area || '2400'} Sq</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500">
              <Bed size={16} className="text-accent" />
              <span className="text-xs font-bold">{p.beds || '3'} Beds</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
