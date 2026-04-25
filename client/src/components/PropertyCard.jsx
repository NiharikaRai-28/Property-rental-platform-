import React from 'react'
import { Link } from 'react-router-dom'

export default function PropertyCard({ p }){
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <img src={p.image} alt={p.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{p.title}</h3>
          <div className="text-lg font-bold">₹{p.price}/Day</div>
        </div>
        <p className="text-sm text-slate-600 mt-2">{p.location}</p>
        <div className="mt-3 flex justify-between items-center">
          <Link to={`/property/${p.id}`} className="text-sky-600 text-sm">View</Link>
          <div className="text-xs text-slate-500">{p.type || 'Entire place'}</div>
        </div>
      </div>
    </div> 
  )
}
