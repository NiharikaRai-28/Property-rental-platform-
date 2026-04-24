import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './routes/Home'
import Listings from './routes/Listings'
import PropertyDetails from './routes/PropertyDetails'
import AddProperty from './routes/AddProperty'
import Dashboard from './routes/Dashboard'
import Auth from './routes/Auth'
import About from './routes/About'
import NotFound from './routes/NotFound'

export default function App(){
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-x-hidden">
      {!isAuthPage && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/listings" element={<Listings/>} />
          <Route path="/property/:id" element={<PropertyDetails/>} />
          <Route path="/add" element={<AddProperty/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </main>
    </div>
  )
}
