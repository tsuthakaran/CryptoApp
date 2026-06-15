# Better Wallet — Frontend

React 19 + Vite + TypeScript app.

## Setup

```bash
npm install
```

Create `frontend/.env.local` with your Firebase web config and API URL:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...

VITE_API_URL=http://localhost:3000
```

## Running

```bash
npm run dev       # development server on :5173
npm run build     # production build
npm run preview   # preview production build
```
