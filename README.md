# React Onboarding — Next.js

A movie database app built with Next.js App Router, powered by [TMDB](https://www.themoviedb.org/documentation/api)'s API — a Next.js migration/onboarding project, ported feature-by-feature from an earlier Vite + React Router version.

## Features

- Browse popular movies, search across movies/TV/people, view movie details
- User registration and login (Auth.js Credentials provider, bcrypt-hashed passwords)
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

2. Create a .env.local file with:

```bash
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
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
