import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProperty } from '../utils/api'
import { getUser } from '../utils/auth'

export default function AddProperty(){
  const nav = useNavigate()
  const user = getUser()
  const [formData, setFormData] = useState({ title: '', description: '', price: '', location: '', image: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return alert('Login required')
    await createProperty({ ...formData, price: Number(formData.price), owner: user.email })
    nav('/listings')
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Add a property</h2>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <input required value={formData.title} onChange={(e)=>setFormData({...formData, title: e.target.value})} placeholder="Title" className="p-2 border rounded" />
        <input required value={formData.location} onChange={(e)=>setFormData({...formData, location: e.target.value})} placeholder="Location" className="p-2 border rounded" />
        <input required type="number" value={formData.price} onChange={(e)=>setFormData({...formData, price: e.target.value})} placeholder="Price per night" className="p-2 border rounded" />
        <input value={formData.image} onChange={(e)=>setFormData({...formData, image: e.target.value})} placeholder="Image URL (optional)" className="p-2 border rounded" />
        <textarea value={formData.description} onChange={(e)=>setFormData({...formData, description: e.target.value})} placeholder="Description" className="p-2 border rounded"></textarea>
        <div className="flex justify-end mt-3">
          <button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded">Add</button>
        </div>
      </form>
    </div>
  )
}
