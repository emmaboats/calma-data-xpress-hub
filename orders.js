const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

let pool;
if(process.env.DATABASE_URL){
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
}

router.post('/', async (req,res)=>{
  const { product_id, quantity=1, phone, email, total_amount } = req.body;
  if(!pool){
    return res.json({ order_id: Date.now(), status: 'pending' });
  }
  try{
    const r = await pool.query(
      `INSERT INTO orders (user_id, product_id, quantity, total_amount, status, phone, email)
       VALUES (NULL,$1,$2,$3,$4,$5) RETURNING order_id, status`, [product_id, quantity, total_amount, 'pending', phone, email]
    );
    res.json(r.rows[0]);
  }catch(err){
    console.error('Order insert error', err.message);
    res.status(500).json({ error: 'Order creation failed' });
  }
});

router.get('/', async (req,res)=>{
  if(!pool) return res.json({ orders: [] });
  try{
    const r = await pool.query('SELECT o.*, p.name as product_name FROM orders o JOIN products p ON o.product_id=p.product_id ORDER BY created_at DESC');
    res.json({ orders: r.rows });
  }catch(err){
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
