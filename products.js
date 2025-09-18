const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

let pool;
if(process.env.DATABASE_URL){
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
}

router.get('/', async (req,res)=>{
  if(pool){
    try{
      const r = await pool.query('SELECT product_id, name, price, type, network, size FROM products WHERE active = true ORDER BY product_id');
      return res.json({ products: r.rows });
    }catch(err){
      console.error('DB products error:', err.message);
    }
  }
  const demo = Array.from({length:50}, (_,i)=> {
    const n = i+1;
    const price = (6.00 * n).toFixed(2);
    return { product_id: n, name: `${n}GB Data Bundle`, price: Number(price), type: 'data_bundle', network: 'All', size: `${n}GB` };
  });
  res.json({ products: demo });
});

module.exports = router;
