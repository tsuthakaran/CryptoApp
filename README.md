# Better Wallet

A full-stack crypto wallet platform. Manage digital assets, track live prices, and transfer funds between wallets.

## Tech Stack

**Frontend** — React 19, TypeScript, Vite, Tailwind CSS, Recharts  
**Backend** — NestJS, Firebase Admin SDK, Firestore  
**Auth** — Firebase Authentication (email/password)  
**Market data** — Binance REST API + WebSocket (real-time prices & charts)

## Project Structure

```
w4llet/
├── frontend/     # Vite + React app
└── backend/      # NestJS API
```

## Prerequisites

- Node.js 18+
- A [Firebase project](https://console.firebase.google.com) with **Email/Password auth** enabled and **Firestore** in the database
- A Firebase **service account key** JSON (from Project Settings → Service Accounts → Generate new private key)

## Environment Setup

### Backend — `backend/.env`

```env
GOOGLE_APPLICATION_CREDENTIALS=/absolute/path/to/serviceAccountKey.json
FIREBASE_PROJECT_ID=your-firebase-project-id
PORT=3000
```

### Frontend — `frontend/.env.local`

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...

VITE_API_URL=http://localhost:3000
```

Get the Firebase web config values from Project Settings → General → Your apps.

## Running Locally

```bash
# Install dependencies for both
cd backend && npm install
cd ../frontend && npm install

# Start backend (from /backend)
npm run start:dev

# Start frontend (from /frontend)
npm run dev
```

Frontend runs on `http://localhost:5173`, backend on `http://localhost:3000`.

## Features

- **Auth** — register, login, forgot/reset password via Firebase
- **Wallet** — auto-created on first login, unique wallet address per user
- **Transactions** — Deposit, Withdraw, Send (by wallet address), Request funds, Swap between assets
- **Pending requests** — incoming fund requests can be approved or denied in real time
- **Portfolio** — live USD values, 24h change, allocation breakdown per asset
- **Explore** — live price charts (1H / 1D / 7D / 14D / 1M / 1Y / ALL) powered by Binance WebSocket
- **Support** — FAQ + feedback form that posts to the backend

## API

All endpoints (except wallet creation on register) require a Firebase ID token as a Bearer token in the `Authorization` header.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/wallet` | Create wallet (called on registration) |
| `GET` | `/wallet/me` | Get current user's wallet and balances |
| `GET` | `/wallet/address/:wAddress` | Look up a wallet by its address |
| `POST` | `/transactions` | Create a transaction |
| `GET` | `/transactions` | Get all transactions for the current user |
| `GET` | `/transactions/:id` | Get a specific transaction |
| `PATCH` | `/transactions/:id/respond` | Approve or deny a pending request |
| `POST` | `/support/threads` | Submit a support message |
| `GET` | `/support/threads` | List all support threads (admin) |
| `GET` | `/support/threads/:id` | Get a specific thread |
| `POST` | `/support/threads/:id/messages` | Add a reply to a thread |

### Transaction payload (`POST /transactions`)

```json
{
  "type": "Deposit | Withdraw | Send | Request | Swap",
  "currency": "BTC",
  "amount": 0.5,
  "recipient": "W4ABC1",
  "exchangeRate": 29.4
}
```

`recipient` is the target wallet address for Send/Request, or the target currency symbol for Swap. `exchangeRate` is required for Swap (fetched from Binance on the frontend).
