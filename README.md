# Three Landing Pages (Next.js App Router)

This repository contains three distinct landing page versions built with Next.js + Tailwind CSS using the App Router (`src/app`).

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

## Run Locally (Development)

2. Start dev server with hot reload:
   ```bash
   npm run dev
   ```
   Open: http://localhost:3000

## Run Locally (Production)

3. Build and start production server on port 3000:
   ```bash
   npm run build && npm run start
   ```
   Open: http://localhost:3000

4. Start production server on alternate local port 8080:
   ```bash
   npm run start:local
   ```
   Open: http://localhost:8080

## Routes

- `/` - Version 1, Minimal Brutalist
- `/v2` - Version 2, Glassmorphism + Gradient
- `/v3` - Version 3, Neobrutalism / Bento Grid

## Local Hosting (Custom Node Server)

A standalone custom server is included at `server.js` (Node `http` module + `next()`).

Example usage:

```bash
npm run build
node server.js
```

Set a custom port if needed:

```bash
set PORT=8080 && node server.js
```

## Deploy to Vercel

Vercel zero-config deployment options:

1. Push this repository to GitHub and import it in the Vercel dashboard.
2. Or deploy from CLI:
   ```bash
   npx vercel
   ```

`next.config.ts` uses `output: "standalone"` so production artifacts are generated for self-contained hosting.
