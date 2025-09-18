const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
require('dotenv').config();

router.post('/initiate', async (req,res)=>{
  const { amount, email } = req.body;
  if(!process.env.PAYSTACK_SECRET_KEY){
    return res.status(500).json({ error: 'PAYSTACK_SECRET_KEY not configured. For demo, use backend without payments.' });
  }
  try{
    const payload = {
      email: email || 'no-reply@calma.local',
      amount: Math.round(amount * 100),
      callback_url: (process.env.FRONTEND_URL || 'http://localhost:5173') + '/?payment=callback'
    };
    const resp = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const data = await resp.json();
    res.json(data);
  }catch(err){
    console.error('Paystack init error', err.message);
    res.status(500).json({ error: 'Payment initiation failed' });
  }
});

module.exports = router;
