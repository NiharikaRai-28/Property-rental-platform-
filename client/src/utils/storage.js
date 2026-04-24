export function loadProperties(){
  const raw = localStorage.getItem('properties')
  if (!raw) {
    const demo = [
      { id: 'p1', title: 'Cozy Studio in City center', description: 'A compact but comfortable studio...', price: 1500, location: 'Varanasi', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=60' },
      { id: 'p2', title: 'Modern 2BHK', description: 'Spacious 2BHK perfect for families', price: 3000, location: 'Haridwar', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60' }
    ]
    localStorage.setItem('properties', JSON.stringify(demo))
    return demo
  }
  return JSON.parse(raw)
}

export function saveProperties(list){ localStorage.setItem('properties', JSON.stringify(list)) }
export function getPropertyById(id){ return loadProperties().find(p => p.id === id) }
export function addProperty(prop){
  const list = loadProperties()
  list.unshift(prop)
  saveProperties(list)
}
export function updateProperty(updated){
  const list = loadProperties().map(p => p.id === updated.id ? updated : p)
  saveProperties(list)
}
export function deleteProperty(id){
  const list = loadProperties().filter(p => p.id !== id)
  saveProperties(list)
}

export function loadBookings(){ return JSON.parse(localStorage.getItem('bookings') || '[]') }
export function bookProperty({ propertyId, checkIn, checkOut, guests }){
  const bookings = loadBookings()
  const booking = { id: 'b' + Date.now(), propertyId, checkIn, checkOut, guests, createdAt: new Date().toISOString() }
  bookings.unshift(booking)
  localStorage.setItem('bookings', JSON.stringify(bookings))
  return booking
}
