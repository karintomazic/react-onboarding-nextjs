# React Onboarding — Next.js

A movie database app built with Next.js App Router, powered by [TMDB](https://www.themoviedb.org/documentation/api)'s API — a Next.js migration/onboarding project, ported feature-by-feature from an earlier Vite + React Router version.

## Features

- Browse popular movies, search across movies/TV/people, view movie details
- User registration and login (Auth.js Credentials provider, argon2-hashed passwords)
- Session-aware header (logged-in dropdown with logout)
- Component library documented in Storybook

## Tech stack

- **Framework:** Next.js (App Router)
- **Auth:** next-auth (Credentials provider), Drizzle ORM + SQLite for the local user store
- **Data fetching:** TanStack Query
- **Styling:** CSS Modules + SCSS
- **Component docs/testing:** Storybook, MSW (mocked network requests in stories)

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Create `.env` file with:

```bash
TMDB_ACCESS_TOKEN=your_tmdb_access_token
DB_FILE_NAME=local.db
NEXTAUTH_SECRET=your_generated_secret
```

- Generate NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

3. Create the database tables:

```bash
npx drizzle-kit push
```

4. Run the dev server:

```bash
npm run dev
```

Open http://localhost:3000.

## Scripts

Start the dev server

```bash
npm run dev
```

Production build

```bash
npm run build
```

Type-check, lint, and run unit tests

```bash
npm run check
```

ESLint

```bash
npm run lint
```

Format with Prettier

```bash
npm run format:write
```

Run Storybook locally

```bash
npm run storybook
```

## Troubleshooting

**`npm run dev` fails with a css error that doesn't make sense (e.g. referencing `package.json` or `globals.css` with no real syntax error in either file)**

This is usually a stale Turbopack build cache. Clear the cache and restart:

```bash
rm -rf .next
npm run dev
```

**Local database errors like `no such table: users_table`, or data that doesn't match what you expect**

Local SQLite file (`local.db`) can fall out of sync with the current schema. Reset it and reseed some test data:

```bash
rm local.db
npm run db:create
npm run db:seed
```

**Drizzle Studio (`npm run db:inspect`) shows old/stale data, or fails to start with `EADDRINUSE: address already in use 127.0.0.1:4983`**

A previous `drizzle-kit studio` process is still running in the background and is still connected to the old state of `local.db`. Kill it and start a fresh one:

```bash
pkill -f "drizzle-kit studio"
npm run db:inspect
```
