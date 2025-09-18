import React, {useEffect,useState} from 'react'
import axios from 'axios'

export default function Store(){
  const [products,setProducts] = useState([])
  useEffect(()=>{
    const base = import.meta.env.VITE_API_URL || 'http://localhost:4000'
    axios.get(`${base}/api/products`).then(r=>{
      setProducts(r.data.products || r.data)
    }).catch(e=>console.error(e))
  },[])
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Store</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map(p=>(
          <div key={p.product_id} className="border p-4 rounded bg-white">
            <h3 className="font-semibold">{p.name}</h3>
            <p>GHS {p.price}</p>
            <button className="mt-2 px-3 py-2 rounded bg-indigo-600 text-white" onClick={()=>{
              const base = import.meta.env.VITE_API_URL || 'http://localhost:4000'
              axios.post(`${base}/api/orders`, { product_id: p.product_id, total_amount: p.price, phone: '', email: '' })
                .then(ord=>{
                  axios.post(`${base}/api/payments/initiate`, { amount: p.price, email: 'test@example.com' })
                    .then(pay=>{
                      if(pay.data && pay.data.data && pay.data.data.authorization_url){
                        window.location = pay.data.data.authorization_url
                      } else {
                        alert('Payment not configured. Backend returned: ' + JSON.stringify(pay.data))
                      }
                    }).catch(err=>{ alert('Payment initiation failed: ' + err.message) })
                }).catch(err=>{ alert('Order creation failed: ' + err.message) })
            }}>Buy</button>
          </div>
        ))}
      </div>
    </div>
  )
}
