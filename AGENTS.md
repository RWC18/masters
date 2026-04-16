# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

V.Ai is an AI Creative Studio monorepo with two services:

| Service | Directory | Port | Dev command |
|---------|-----------|------|-------------|
| Express backend | `server/` | 7777 | `npm start` (uses nodemon) |
| Next.js frontend | `client/` | 3000 | `npm run dev` (Turbopack) |

### Dependencies

- **Node.js 20+** (Dockerfiles specify node:20-alpine; v22 also works)
- **MongoDB** must be running locally on default port 27017. Install the `mongod` binary from the official tarball if not present, then start with `mongod --dbpath /data/db --logpath /var/log/mongodb/mongod.log --fork`.

### Environment files

- `server/.env` — requires `PORT`, `MONGO_URL`, `SECRET_KEY`. API keys (`AUTH_TOKEN`, `AI_AUTH`, `X_APP_AUTH`) can be placeholders for local dev; AI generation features will fail without real keys but auth and health endpoints work.
- `client/.env.local` — copy from `client/.env.local.example`. Set `BACKEND_URL=http://localhost:7777` so Next.js rewrites proxy API calls to the backend.

### Starting services

1. Start MongoDB first (backend crashes without it).
2. Start the backend: `cd server && npm start`
3. Start the frontend: `cd client && npm run dev`
4. Verify: `curl http://localhost:7777/api/v1/health` should return `{"status":"ok"}`, and `http://localhost:3000` should return 200.

### Lint and build

- **Client lint**: `next lint` was removed in Next.js 16. There is no ESLint config in the client.
- **Client build**: `cd client && npm run build`
- **Server type-check**: `cd server && npx tsc --noEmit`
- **Server build**: `cd server && npm run build`

### Tests

- Client tests use Jest + ts-jest + jsdom. Run with `cd client && npx jest`.
- Jest, ts-jest, @testing-library/react, @testing-library/dom, @testing-library/jest-dom, and jest-environment-jsdom are devDependencies. A `jest.config.js` in the client root configures them.
- 2 of 12 test suites have pre-existing failures due to missing jsdom APIs (`URL.revokeObjectURL`, `import.meta.env`); 46/48 tests pass.
- The server has no automated tests; `npm test` runs `tsc` (build).
