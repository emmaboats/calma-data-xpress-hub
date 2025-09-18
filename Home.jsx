import React from 'react'
export default function Home(){
  return (
    <div className="text-center py-12">
      <h1 className="text-3xl font-bold">Affordable data, delivered instantly.</h1>
      <p className="mt-4">Buy data bundles and mobile vouchers for all networks — fast checkout, secure payments, instant delivery.</p>
      <div className="mt-6">
        <a className="px-6 py-3 rounded bg-indigo-600 text-white" href="/store">Buy Data Now</a>
      </div>
    </div>
  )
}
