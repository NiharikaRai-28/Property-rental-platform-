import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="max-w-6xl mx-auto grid gap-6">
      <section className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-xl p-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Find & Book Your Next Stay</h1>
          <p className="mt-2 text-slate-100 max-w-xl">List your place or book homes, apartments and rooms — built for students and professionals.</p>
          <div className="mt-4">
            <Link to="/listings" className="px-4 py-2 bg-white text-sky-600 rounded">Explore listings</Link>
          </div>
        </div>
        <div className="hidden md:block w-1/3">
        <div className="flex items-center justify-between">
        
          <img src="https://th.bing.com/th/id/OIP.xDnOsFyipZ0f_gFzdmFJ0wHaFJ?w=203&h=150&c=6&o=7&pid=1.7&rm=3" alt="stay" className="rounded-xl shadow-lg" />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Popular near you</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow"><img src="https://th.bing.com/th/id/OIP.xDnOsFyipZ0f_gFzdmFJ0wHaFJ?w=203&h=150&c=6&o=7&pid=1.7&rm=3" alt="stay"  className="rounded-xl shadow-lg"/> <p>Haridwar</p></div>
    
          <div className="bg-white rounded-lg p-4 shadow">Sample Card</div>
          <div className="bg-white rounded-lg p-4 shadow">Sample Card</div>
        </div>
      </section>
    </div>
  );
}
