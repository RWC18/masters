# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

V.Ai is a full-stack AI creative studio — a monorepo with a Next.js frontend (`client/`) and an Express.js backend (`server/`). It offers AI-powered tools (text-to-image, avatar creation, logo generation, background removal, image-to-image) backed by the PicsArt API, with user authentication and a credit-based billing system.

## Commands

### Client (Next.js, port 3000)
```bash
cd client
npm run dev      # Dev server with Turbopack
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint
npx jest         # Run all tests
npx jest --testPathPattern="ComponentName"  # Run a single test suite
```

### Server (Express, port 7777)
```bash
cd server
npm start        # Dev server with nodemon
npm run build    # TypeScript compile to dist/
npm run start:prod  # Run compiled output
npx tsc --noEmit    # Type-check without emitting
```

## Architecture

### Request Flow
The client routes all API calls through `/api/v1/` — Next.js rewrites these to `http://localhost:7777` (configured in `client/next.config.ts`). This means the client never directly exposes the backend URL in the browser.

### Frontend (`client/src/`)
- **`app/`** — Next.js App Router pages; each route maps to a feature (t2i, avatar, logo-gen, remove-bg, billing, history)
- **`views/`** — Page-level React components consumed by app/ route files
- **`components/`** — Shared UI components (Header, Button, Input, SignIn, PopUp, etc.)
- **`redux/`** — Redux Toolkit store; `Actions/` holds thunks that call the backend or PicsArt directly; `Reducers/` holds slices per feature (t2i, avatar, logo, removeBg, main)
- **`lib/`** — ThemeRegistry (MUI + Emotion SSR setup), Providers wrapper, AppShell layout
- **`i18n/`** — i18next config (supports Armenian and other languages)
- **`theme/`** — MUI theme customization

### Backend (`server/src/`)
- **`controller/`** — Express route handlers; `index.ts` mounts all routes
- **`services/`** — Business logic; each AI feature has its own service that calls the PicsArt API; `AuthService` handles JWT + bcrypt; `CreditService` deducts credits on each generation
- **`models/`** — Mongoose schemas: `users`, `history`, `creditTransaction`
- **`middleware/`** — Custom `HttpError` class + centralized error handler
- **`constants/`** — PicsArt API headers, URLs, and default request bodies

### Key Environment Variables
- `client/.env`: `BACKEND_URL`, `NEXT_PUBLIC_API_AUTH`, `NEXT_PUBLIC_AI_URL`, PicsArt auth tokens (copy from `client/.env.local.example`)
- `server/.env`: `PORT=7777`, `MONGO_URL` (MongoDB Atlas connection string), `SECRET_KEY` (JWT), AI service auth keys

### State Management Pattern
All async AI calls go through Redux thunks in `client/src/redux/Actions/`. Each feature reducer tracks `loading`, `error`, and result state. Components dispatch thunks and read state via `useSelector`.

### Deployment
- Docker: separate Dockerfiles for client and server (Alpine-based)
- CI/CD: `.github-ci.yml` builds Docker images and deploys to Kubernetes via Kustomize configs in `server/deployment/`
- Also configured for Render.com (`render.yaml`)
