import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Store from './pages/Store'
import Admin from './pages/Admin'

export default function App(){
  return (
    <div>
      <nav className="p-4 bg-white shadow">
        <div className="max-w-4xl mx-auto flex justify-between">
          <Link to="/" className="font-bold text-xl text-indigo-600">Calma Data Xpress Hub</Link>
          <div>
            <Link to="/store" className="mr-4">Store</Link>
            <Link to="/admin" className="mr-4">Admin</Link>
          </div>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </div>
  )
}
