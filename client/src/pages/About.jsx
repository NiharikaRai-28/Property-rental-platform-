import React from 'react'
import { Info, Target, Users, MapPin, CheckCircle, ShieldCheck } from 'lucide-react'

export default function About() {
  const stats = [
    { label: 'Active Listings', value: '1,200+' },
    { label: 'Happy Tenants', value: '5,000+' },
    { label: 'Cities Covered', value: '25+' },
    { label: 'Verified Hosts', value: '800+' }
  ]

  const features = [
    {
      icon: <ShieldCheck className="text-accent" />,
      title: 'Verified Listings',
      description: 'Every property goes through a rigorous verification process to ensure safety and authenticity.'
    },
    {
      icon: <Users className="text-accent" />,
      title: 'Expert Support',
      description: 'Our dedicated team is available 24/7 to assist you with any questions or concerns during your stay.'
    },
    {
      icon: <Target className="text-accent" />,
      title: 'Easy Booking',
      description: 'Seamless and secure booking process that takes less than 2 minutes to complete.'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-primary">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/hero.png" 
            alt="Hero House" 
            className="w-full h-full object-cover"
          />
          {/* Elegant Dark Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/40 to-primary/80"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent border border-accent/20 text-xs font-black uppercase tracking-widest mb-8 animate-fade-in">
            <Info size={16} />
            About Our Platform
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight drop-shadow-2xl">
            Redefining the <span className="text-accent">Rental Experience</span>.
          </h1>
          <p className="text-xl text-slate-200 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-lg">
            Rentify is a premier property rental platform dedicated to connecting travelers and long-term seekers with the most exquisite stays. Founded on trust and transparency.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-primary mb-1">{stat.value}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black text-primary mb-6">Our Mission</h2>
              <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
                To simplify the property rental process through innovation and technology, making it effortless for people to find their dream spaces and for hosts to manage their properties with confidence.
              </p>
              <div className="space-y-4">
                {['Direct Host Communication', 'Transparent Pricing', 'Verified Reviews', 'Secured Payments'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-primary font-bold">
                    <CheckCircle className="text-accent" size={20} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-slate-200 rounded-3xl overflow-hidden shadow-2xl relative group">
                 {/* Placeholder for an image */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent opacity-20"></div>
                 <img 
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                    alt="Team" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                 />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden sm:block">
                 <div className="flex items-center gap-4">
                    <div className="bg-accent/10 p-3 rounded-xl text-accent">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <div className="font-black text-primary">Headquarters</div>
                      <div className="text-sm font-bold text-slate-500">Varansi, Uttar Pradesh</div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-black text-primary mb-4">Why Choose Rentify?</h2>
            <p className="text-slate-500 font-bold">We provide a platform that benefits both property owners and seekers alike.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {features.map((f, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-xl hover:translate-y-[-8px] transition-all duration-300 border border-slate-100">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-6">
                  {f.icon}
                </div>
                <h3 className="text-xl font-black text-primary mb-3">{f.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
