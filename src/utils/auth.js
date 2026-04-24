export function getUser(){ return JSON.parse(localStorage.getItem('user') || 'null') }
export function login(user){ localStorage.setItem('user', JSON.stringify(user)) }
export function logout(){ localStorage.removeItem('user') }
