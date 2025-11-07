import React, { useState, useEffect } from 'react'
import PropertyCard from '../components/PropertyCard'
import { loadProperties } from '../utils/storage'

export default function Listings(){
  const [propsList, setPropsList] = useState([])
  const [query, setQuery] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(10000)

  useEffect(()=>{ setPropsList(loadProperties()) }, [])

  const filtered = propsList.filter(p => {
    const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase()) || p.location.toLowerCase().includes(query.toLowerCase())
    const inPrice = p.price >= minPrice && p.price <= maxPrice
    return matchesQuery && inPrice
  })

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex gap-3 mb-4">
        <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search city or title" className="flex-1 p-3 rounded border" />
        <input type="number" value={minPrice} onChange={(e)=>setMinPrice(Number(e.target.value))} className="w-28 p-3 rounded border" />
        <input type="number" value={maxPrice} onChange={(e)=>setMaxPrice(Number(e.target.value))} className="w-28 p-3 rounded border" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map(p => <PropertyCard key={p.id} p={p} />)}
      </div>
    </div>
  )
}
