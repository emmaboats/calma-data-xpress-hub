const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Routes
const productsRouter = require('./routes/products');
const paymentsRouter = require('./routes/payments');
const ordersRouter = require('./routes/orders');

app.use('/api/products', productsRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/orders', ordersRouter);

app.get('/api/health', (req,res)=> res.json({ok:true}));

app.get('/', (req,res)=> res.send('Calma Data Xpress Hub Backend (Expanded)'));

app.listen(PORT, ()=> console.log(`Backend listening on ${PORT}`));
