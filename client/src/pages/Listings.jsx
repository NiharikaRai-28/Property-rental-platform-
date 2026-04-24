import React, { useState, useEffect } from 'react'
import PropertyCard from '../components/PropertyCard'
import { fetchProperties } from '../utils/api'
import { Search, MapPin, Building2, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Listings() {
  const [propsList, setPropsList] = useState([])
  const [query, setQuery] = useState('')
  const [type, setType] = useState('All')
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(true)
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  useEffect(() => {
    fetchProperties().then(data => {
      setPropsList(data)
      setLoading(false)
    })
  }, [])

  const filtered = propsList.filter(p => {
    const matchesQuery = (p.title || '').toLowerCase().includes(query.toLowerCase())
    const matchesType = type === 'All' || p.type === type
    const matchesLoc = (p.location || '').toLowerCase().includes(location.toLowerCase())
    return matchesQuery && matchesType && matchesLoc
  })

  // Pagination Logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedItems = filtered.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Banner - Clearer Image */}
      <section className="relative h-96 flex items-center justify-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80" 
            className="w-full h-full object-cover" 
            alt="header" 
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-black tracking-tight mb-2 drop-shadow-lg">Property Listings</h1>
          <p className="text-slate-200 font-bold bg-black/20 px-4 py-1 rounded-full backdrop-blur-sm inline-block">Home • Property Listings</p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="max-w-6xl mx-auto w-full px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-4 flex flex-wrap md:flex-nowrap gap-4 items-center">
          <div className="flex-1 min-w-[200px] relative">
            <input 
              value={query} 
              onChange={(e) => { setQuery(e.target.value); setCurrentPage(1); }} 
              placeholder="Filter Keyword" 
              className="w-full p-3 pl-10 rounded-xl bg-slate-50 border border-slate-100 focus:border-accent outline-none font-bold"
            />
            <Search size={18} className="absolute left-3 top-3.5 text-slate-400" />
          </div>
          
          <div className="flex-1 min-w-[200px] relative">
            <select 
              value={type} 
              onChange={(e) => { setType(e.target.value); setCurrentPage(1); }} 
              className="w-full p-3 pl-10 rounded-xl bg-slate-50 border border-slate-100 focus:border-accent outline-none font-bold appearance-none"
            >
              <option value="All">Property Type</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="1BHK">1BHK</option>
              <option value="2BHK">2BHK</option>
              <option value="3BHK">3BHK</option>
              <option value="Penthuse">Penthuse</option>
            </select>
            <Building2 size={18} className="absolute left-3 top-3.5 text-slate-400" />
          </div>

          <div className="flex-1 min-w-[200px] relative">
            <input 
              value={location} 
              onChange={(e) => { setLocation(e.target.value); setCurrentPage(1); }} 
              placeholder="Location" 
              className="w-full p-3 pl-10 rounded-xl bg-slate-50 border border-slate-100 focus:border-accent outline-none font-bold"
            />
            <MapPin size={18} className="absolute left-3 top-3.5 text-slate-400" />
          </div>

          <button className="btn-primary flex items-center justify-center gap-2 min-w-[150px]">
            <SlidersHorizontal size={18} />
            Search Property
          </button>
        </div>
      </div>

      {/* Main List */}
      <main className="max-w-6xl mx-auto w-full px-6 py-16 flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            [...Array(8)].map((_, i) => (
              <div key={i} className="h-96 bg-slate-100 animate-pulse rounded-2xl"></div>
            ))
          ) : paginatedItems.length > 0 ? (
            paginatedItems.map(p => <PropertyCard key={p._id || p.id} p={p} />)
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="text-6xl mb-6">🏝️</div>
              <h3 className="text-2xl font-bold text-slate-400">No properties found match your search.</h3>
            </div>
          )}
        </div>

        {/* Real Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-3">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors ${currentPage === 1 ? 'border-slate-100 text-slate-200' : 'border-slate-200 text-slate-400 hover:text-accent'}`}
            >
              <ChevronLeft size={20} />
            </button>
            
            {[...Array(Math.min(totalPages, 5))].map((_, i) => {
               const page = i + 1;
               return (
                <button 
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-bold transition-all ${currentPage === page ? 'bg-accent text-white shadow-lg' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  {page}
                </button>
               )
            })}

            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors ${currentPage === totalPages ? 'border-slate-100 text-slate-200' : 'border-slate-200 text-slate-400 hover:text-accent'}`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
