# Calma Data Xpress Hub — Expanded Repo
This archive contains a starter full-stack project with:
- Backend (Express) with Paystack integration endpoint (initiate)
- Frontend (Vite + React) with Store, Checkout, and Admin pages
- SQL schema with 50 data bundles pre-seeded (prices 6 * GB)

## Quick start (backend)
1. cd backend
2. npm install
3. Copy .env.example to .env and set PAYSTACK_SECRET_KEY (optional for demo)
4. npm start
   - Backend runs on port 4000 by default.

## Quick start (frontend)
1. cd frontend
2. npm install
3. npm run dev
   - Frontend uses VITE_API_URL to call the backend (default http://localhost:4000)

## Notes
- Paystack integration uses the initialize endpoint. Use test keys for development.
- Admin page is not password protected in this starter; secure it before production.
