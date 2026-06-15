# Better Wallet — Backend

NestJS API backed by Firebase Admin SDK and Firestore.

## Setup

```bash
npm install
```

Create `backend/.env`:

```env
GOOGLE_APPLICATION_CREDENTIALS=/absolute/path/to/serviceAccountKey.json
FIREBASE_PROJECT_ID=your-firebase-project-id
PORT=3000
```

## Running

```bash
npm run start:dev   # watch mode
npm run start       # production
npm run build       # compile to dist/
```
