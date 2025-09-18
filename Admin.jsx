import React, {useEffect,useState} from 'react'
import axios from 'axios'

export default function Admin(){
  const [products,setProducts] = useState([])
  useEffect(()=>{
    const base = import.meta.env.VITE_API_URL || 'http://localhost:4000'
    axios.get(`${base}/api/products`).then(r=> setProducts(r.data.products || r.data)).catch(()=>{})
  },[])
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <p className="mb-4">This admin page is not password protected in the starter. Please secure in production.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map(p=>(
          <div key={p.product_id} className="border p-4 rounded bg-white">
            <div className="flex justify-between"><strong>{p.name}</strong><span>GHS {p.price}</span></div>
          </div>
        ))}
      </div>
    </div>
  )
}
