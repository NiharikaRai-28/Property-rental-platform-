import React, { useState } from 'react'
import { login } from '../utils/auth'
import { useNavigate } from 'react-router-dom'

export default function Auth(){
  const [name, setName] = useState('')
  const nav = useNavigate()

  function handleSubmit(e){
    e.preventDefault()
    login({ name })
    nav('/')
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Login / Sign up </h2>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your name" className="p-2 border rounded" />
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-sky-600 text-white rounded">Continue</button>
        </div>
      </form>
    </div>
  )
}
