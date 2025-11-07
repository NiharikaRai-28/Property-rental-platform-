import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUser, logout } from '../utils/auth'

export default function Navbar(){
  const user = getUser()
  const nav = useNavigate()

  return (
    <nav className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-bold">Rentify</Link>
          <Link to="/listings" className="text-sm text-slate-600">Listings</Link>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/add" className="text-sm px-3 py-1 bg-sky-600 text-white rounded">Add Property</Link>
              <Link to="/dashboard" className="text-sm">Dashboard</Link>
              <button onClick={() => { logout(); nav('/auth') }} className="text-sm">Logout</button>
            </>
          ) : (
            <Link to="/auth" className="text-sm px-3 py-1 border rounded">Login / Sign Up</Link>
          )}
        </div>
      </div>
    </nav>
  )
}
