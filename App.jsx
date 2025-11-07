import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './routes/Home'
import Listings from './routes/Listings'
import PropertyDetails from './routes/PropertyDetails'
import AddProperty from './routes/AddProperty'
import Dashboard from './routes/Dashboard'
import Auth from './routes/Auth'
import NotFound from './routes/NotFound'

export default function App(){
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="p-4 md:p-8">
        <Routes>
          <Route path="/" element={<Home/>} />
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
