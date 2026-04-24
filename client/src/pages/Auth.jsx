import React, { useState } from 'react'
import { login } from '../utils/auth'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, LogIn, UserPlus, Home } from 'lucide-react'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const nav = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
    try {
      const res = await fetch(`http://127.0.0.1:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (res.ok) {
        if (isLogin) {
          login(data.user)
          localStorage.setItem('token', data.token)
          nav('/')
        } else {
          setIsLogin(true)
          alert('Registration successful! Please login to continue.')
        }
      } else {
        alert(data.message)
      }
    } catch (err) {
      alert('Could not reach server. Please check if your backend is running.')
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex bg-accent/10 p-4 rounded-3xl text-accent mb-4">
             <Home size={40} />
          </div>
          <h1 className="text-4xl font-black text-primary tracking-tight">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h1>
          <p className="text-slate-500 font-bold mt-2 uppercase text-xs tracking-widest">
            {isLogin ? 'Login to manage your premium stays' : 'Join Rentify for a luxury experience'}
          </p>
        </div>

        <div className="card !p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-16 translate-x-16"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-1">
              <label className="text-xs font-black uppercase text-slate-400 ml-1 tracking-tighter">Email Address</label>
              <div className="relative">
                <input 
                  required 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="name@example.com" 
                  className="w-full h-14 pl-12 pr-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-accent outline-none font-bold transition-all" 
                />
                <Mail className="absolute left-4 top-4 text-slate-400" size={20} />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black uppercase text-slate-400 ml-1 tracking-tighter">Password</label>
              <div className="relative">
                <input 
                  required 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••" 
                  className="w-full h-14 pl-12 pr-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-accent outline-none font-bold transition-all" 
                />
                <Lock className="absolute left-4 top-4 text-slate-400" size={20} />
              </div>
            </div>

            <button className="w-full btn-primary h-14 !rounded-2xl shadow-lg flex items-center justify-center gap-3 !text-lg">
              {isLogin ? <LogIn size={22} /> : <UserPlus size={22} />}
              {isLogin ? 'Sign In Now' : 'Create My Account'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-50 text-center">
            <p className="text-slate-500 font-bold text-sm mb-2">
              {isLogin ? "Don't have an account yet?" : "Already a member?"}
            </p>
            <button 
              type="button" 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-accent font-black text-lg hover:underline underline-offset-4"
            >
              {isLogin ? "Join Rentify Today" : "Login to Your Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
