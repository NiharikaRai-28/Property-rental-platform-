import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Listings from './pages/Listings'
import PropertyDetails from './pages/PropertyDetails'
import AddProperty from './pages/AddProperty'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import About from './pages/About'
import NotFound from './pages/NotFound'

export default function App(){
  const location = useLocation()
  const isAuthPage = location.pathname === '/auth'

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/listings" element={<Listings/>} />
          <Route path="/property/:id" element={<PropertyDetails/>} />
          <Route path="/add" element={<AddProperty/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="/about" element={<About/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  )
}
