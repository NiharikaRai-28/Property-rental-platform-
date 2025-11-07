import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addProperty } from '../utils/storage'

export default function AddProperty(){
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [price, setPrice] = useState(1000)
  const [image, setImage] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e){
    e.preventDefault()
    const prop = { id: 'p' + Date.now(), title, location, price: Number(price), image: image || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=60', description: '' }
    addProperty(prop)
    navigate('/listings')
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Add a property</h2>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <input required value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" className="p-2 border rounded" />
        <input required value={location} onChange={(e)=>setLocation(e.target.value)} placeholder="Location" className="p-2 border rounded" />
        <input required type="number" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Price per night" className="p-2 border rounded" />
        <input value={image} onChange={(e)=>setImage(e.target.value)} placeholder="Image URL (optional)" className="p-2 border rounded" />
        <div className="flex justify-end mt-3">
          <button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded">Add</button>
        </div>
      </form>
    </div>
  )
}
