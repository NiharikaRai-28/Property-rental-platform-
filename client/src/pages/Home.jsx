import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, 
  MapPin, 
  Building2, 
  Home as HomeIcon, 
  Waves, 
  TreePine, 
  Warehouse,
  ShieldCheck,
  Award,
  Zap,
  CheckCircle2,
  Users,
  ArrowRight,
  Star,
  Quote,
  ChevronDown,
  HelpCircle
} from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="/hero.png" 
            alt="Hero House" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/30 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl w-full px-6 text-white">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-3xl drop-shadow-2xl">
            Perfect Place For <span className="text-accent underline decoration-accent/30">Selling</span> Or Luxury <span className="text-accent underline decoration-accent/30">Rent</span> And Villas
          </h1>
          <p className="mt-6 text-xl text-slate-100 max-w-xl font-medium drop-shadow-md">
            Discover the most exclusive properties in the world's most sought-after locations. Your dream home is just a search away.
          </p>
          
          {/* Search Bar */}
          <div className="mt-12 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 max-w-4xl">
            <div className="bg-white rounded-xl p-4 flex flex-col md:flex-row gap-4 text-primary shadow-2xl">
              <div className="flex-1 flex items-center gap-3 border-b md:border-b-0 md:border-r border-slate-200 py-2 px-2">
                <MapPin className="text-accent" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">Location</span>
                  <input type="text" placeholder="Where are you looking?" className="outline-none font-bold placeholder:text-slate-400" />
                </div>
              </div>
              <div className="flex-1 flex items-center gap-3 border-b md:border-b-0 md:border-r border-slate-200 py-2 px-2">
                <Building2 className="text-accent" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">Property Type</span>
                  <select className="outline-none font-bold bg-transparent">
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Studio</option>
                  </select>
                </div>
              </div>
              <div className="flex-1 flex items-center gap-3 py-2 px-2">
                <Zap className="text-accent" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">Price Range</span>
                  <input type="text" placeholder="₹10k - ₹50k" className="outline-none font-bold placeholder:text-slate-400" />
                </div>
              </div>
              <button className="bg-accent hover:bg-orange-600 text-white px-8 py-4 rounded-xl flex items-center gap-2 font-bold transition-all transform hover:scale-105">
                <Search size={20} />
                Search Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search by Requirement */}
      <section className="max-w-6xl mx-auto w-full px-6">
        <div className="text-center mb-16">
          <span className="text-accent font-bold tracking-widest uppercase text-sm">Features</span>
          <h2 className="section-title mt-2">Search By Property Requirement</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {[
            { icon: Building2, label: 'Apartment', count: '120+ Listings' },
            { icon: HomeIcon, label: 'Residentials', count: '80+ Listings' },
            { icon: Waves, label: 'Lake View', count: '45+ Listings' },
            { icon: TreePine, label: 'Green Side', count: '60+ Listings' },
            { icon: Warehouse, label: 'Villas', count: '30+ Listings' }
          ].map((item, idx) => (
            <div key={idx} className="card group cursor-pointer hover:bg-primary transition-all duration-300">
              <div className="bg-orange-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-accent transition-colors">
                <item.icon className="text-accent group-hover:text-white transition-colors" size={32} />
              </div>
              <h3 className="font-bold text-lg group-hover:text-white transition-colors">{item.label}</h3>
              <p className="text-sm text-slate-600 group-hover:text-white/80 mt-1 transition-colors">{item.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="bg-white py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img src="/about.png" alt="Living Room" className="w-full h-[500px] object-cover" />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-accent p-8 rounded-3xl text-white shadow-xl hidden lg:block">
              <div className="text-4xl font-bold">15+</div>
              <div className="text-sm uppercase tracking-wider font-semibold opacity-80">Years Experience</div>
            </div>
          </div>
          
          <div>
            {/* <span className="text-accent font-bold tracking-widest uppercase text-sm">About Us</span> */}
            <h2 className="text-4xl font-bold mt-4 mb-6 leading-tight">
              Welcome To Our Luxurious Properties, Apartment & Real Estate Solutions.
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              We provide the most seamless experience for renting and selling high-end properties. Our curated collection of homes and apartments is tailored for those who value luxury, comfort, and state-of-the-art living.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-accent" size={20} />
                <span className="font-bold text-slate-800">Top Rated Properties</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-accent" size={20} />
                <span className="font-bold text-slate-800">Secure Bookings</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-accent" size={20} />
                <span className="font-bold text-slate-800">No Hidden Charges</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-accent" size={20} />
                <span className="font-bold text-slate-800">24/7 Premium Support</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <Link to="/listings" className="btn-primary">Explore Premium Sites</Link>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent">
                  <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="CEO" />
                </div>
                <div>
                  <div className="font-black text-slate-900 leading-none">Niharika Rai</div>
                  <div className="text-xs text-slate-600 font-bold uppercase tracking-widest mt-1">Founder & CEO</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="max-w-6xl mx-auto w-full px-6 py-20 relative overflow-hidden bg-primary rounded-[3rem] text-white">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-accent/20 blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 px-10">
          <div className="max-w-xl">
            <span className="text-accent font-bold tracking-widest uppercase text-sm">Vision & Philosophy</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
              A Single Plate Of Essence For All Of Your Real Estate Needs.
            </h2>
            <p className="mt-6 text-slate-300 text-lg">
              Our mission is to redefine the global real estate landscape by providing transparent, efficient, and luxurious property solutions for everyone.
            </p>
            <div className="mt-10 flex gap-10">
              <div>
                <div className="text-4xl font-black text-accent drop-shadow-md">98%</div>
                <div className="text-sm font-bold text-slate-200 mt-2">Customer Satisfaction</div>
              </div>
              <div className="w-[1px] bg-white/20"></div>
              <div>
                <div className="text-4xl font-black text-accent drop-shadow-md">2.5k+</div>
                <div className="text-sm font-bold text-slate-200 mt-2">Premium Listings</div>
              </div>
            </div>
          </div>
          <div className="relative w-full md:w-1/2 flex justify-center">
             <div className="relative z-10 w-[300px] h-[300px] border-2 border-accent/30 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-[200px] h-[200px] bg-accent rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(249,115,22,0.5)]">
                  <MapPin size={60} />
                </div>
             </div>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[400px] h-[400px] border border-white/5 rounded-full"></div>
             </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-6xl mx-auto w-full px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-accent font-bold tracking-widest uppercase text-sm">Why Choose Us</span>
            <h2 className="text-4xl font-bold mt-4 mb-8">Our Happy Moments & Success Stories</h2>
            
            <div className="space-y-8">
              {[
                { icon: ShieldCheck, title: 'Highly Professional Team', text: 'Our agents have years of expertise in the luxury real estate market.' },
                { icon: Award, title: 'Premium Listings Only', text: 'We only offer verified and top-quality properties to our clients.' },
                { icon: Zap, title: 'Instant Property Buying', text: 'Simplified processes to help you get your dream home faster.' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="bg-accent/10 p-4 rounded-2xl h-fit">
                    <item.icon className="text-accent" size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-200 rounded-[3rem] h-[550px] relative overflow-hidden group shadow-2xl">
            <img 
              src="https://img.staticmb.com/mbcontent/images/uploads/2022/12/tips-to-find-house-for-rent.jpg" 
              className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" 
              alt="modern property"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent"></div>
            <div className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl">
              <h4 className="text-white text-2xl font-black mb-4 leading-tight">Expert Tips to Find Your Perfect Rental Home</h4>
              <p className="text-white/90 text-sm font-medium leading-relaxed mb-6">
                Discover the best strategies for budget planning, location scouting, and property verification to ensure a seamless rental experience.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white shadow-lg">
                  <Quote size={20} />
                </div>
                <div className="text-white">
                  <div className="font-bold text-sm">Rentify Experts</div>
                  <div className="text-[10px] uppercase tracking-widest opacity-60">Verified Guide</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Team Section */}
      <section className="bg-white py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16">
            <span className="text-accent font-bold tracking-widest uppercase text-sm">Our Personnel</span>
            <h2 className="section-title mt-2">Meet Our Real Estate Team</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Sarah J.', role: 'Senior Agent', img: 'https://i.pravatar.cc/150?u=a042581f4e290267042' },
              { name: 'Michael C.', role: 'Listing Manager', img: 'https://i.pravatar.cc/150?u=a042581f4e290267043' },
              { name: 'Elena R.', role: 'Interior Designer', img: 'https://i.pravatar.cc/150?u=a042581f4e290267044' },
              { name: 'David W.', role: 'Support Specialist', img: 'https://i.pravatar.cc/150?u=a042581f4e290267045' }
            ].map((person, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-32 h-32 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border-4 border-slate-100 group-hover:border-accent transition-all duration-300 transform group-hover:scale-105">
                  <img src={person.img} alt={person.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="mt-6 text-xl font-black group-hover:text-accent transition-colors">{person.name}</h3>
                <p className="text-slate-600 font-bold tracking-wide uppercase text-xs">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated Testimonials Section */}
      <section className="bg-slate-50 py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent font-bold tracking-widest uppercase text-sm">Testimonials</span>
            <h2 className="section-title mt-2">What Our Clients Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                text: "The best platform for high-end rentals. The verification process gives me peace of mind every time I book a villa.",
                name: "Sophia Martinez",
                role: "Business Traveler",
                img: "https://i.pravatar.cc/150?u=a042581f4e29026704a"
              },
              { 
                text: "Listing my apartment was incredibly easy. Within 48 hours, I had my first booking. Highly recommended!",
                name: "James Wilson",
                role: "Property Owner",
                img: "https://i.pravatar.cc/150?u=a042581f4e29026704b"
              },
              { 
                text: "Excellent customer service and premium property selections. They really understand what luxury living means.",
                name: "Emily Chen",
                role: "Student",
                img: "https://i.pravatar.cc/150?u=a042581f4e29026704c"
              }
            ].map((t, idx) => (
              <div key={idx} className="card relative transition-transform hover:-translate-y-2">
                <Quote className="text-accent/20 absolute top-4 right-6" size={48} />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-accent text-accent" />)}
                </div>
                <p className="text-slate-600 italic mb-8 relative z-10">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full border-2 border-accent" />
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-xs text-slate-500 font-semibold">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ (FQS) Section */}
      <section className="bg-white py-24 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent font-bold tracking-widest uppercase text-sm">FQS</span>
            <h2 className="section-title mt-2">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "How do I list my property for rent?", a: "To list your property, simply click on the 'List Property' button in the navigation bar. You'll need to create an account, provide property details, upload photos, and set your price." },
              { q: "Is the booking process secure?", a: "Yes, we use industry-standard encryption and verified payment gateways to ensure your transactions and personal data are always protected." },
              { q: "What is the cancellation policy?", a: "Cancellation policies are set by individual property owners. You can find the specific policy for each property on its details page before making a booking." },
              { q: "Are there any hidden service fees?", a: "No, we believe in total transparency. All service fees and taxes are clearly displayed at the final checkout page before you confirm your booking." },
              { q: "How can I contact the host?", a: "Once your booking is confirmed, you will receive the host's direct contact information and can also message them through our integrated dashboard." }
            ].map((faq, idx) => (
              <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden group">
                <button className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="bg-accent/10 p-2 rounded-lg">
                      <HelpCircle size={20} className="text-accent" />
                    </div>
                    <span className="font-bold text-lg text-primary">{faq.q}</span>
                  </div>
                  <ChevronDown size={20} className="text-slate-600 group-hover:text-accent transition-transform group-hover:rotate-180" />
                </button>
                <div className="px-16 pb-6 text-slate-800 font-medium bg-slate-50/50">
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Let's Connect CTA */}
      <section className="max-w-6xl mx-auto w-full px-6 mb-10">
        <div className="bg-accent rounded-[3rem] p-10 md:p-20 text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-[0_20px_50px_rgba(249,115,22,0.3)]">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">Ready To Find Your Dream Property?</h2>
            <p className="mt-4 text-white/80 text-lg">Contact our experts today or list your property for rent with a single click.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Link to="/auth" className="bg-primary text-white px-8 py-4 rounded-2xl font-bold text-center hover:bg-slate-900 transition-all flex items-center justify-center gap-2">
              <Users size={20} />
              List Your Property
            </Link>
            <Link to="/listings" className="bg-white text-accent px-8 py-4 rounded-2xl font-bold text-center hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              Explore Now
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
