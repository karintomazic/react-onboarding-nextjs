// loads env vars from .env.local
// drizzle-kit runs as its own standalone CLI process, completely separate from Next.js,
// so it never gets the automatic .env.local loading Next.js provides on its own.
import { config } from "dotenv";
config({ path: ".env.local" });

// helper from drizzle-kit that gives you type-checking/autocomplete for the config object
// makes sure you don't misspell a key or pass the wrong shape of value.
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle", // The folder where drizzle-kit generate would write versioned migration SQL files. part of the required config shape.
  schema: "./db/schema.ts", // Tells drizzle-kit where to find your schema definition — the file describing what the database should look like - usersTable.
  dialect: "sqlite", // which database system i am using
  dbCredentials: { // Tells drizzle-kit where the actual database file lives on disk, so it knows what to connect to
    url: process.env.DB_FILE_NAME!,
  },
});
