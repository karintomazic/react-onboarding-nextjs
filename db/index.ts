// Drizzle database connection

// Imports Drizzles wrapper specifically for the better-sqlite3 driver
// better-sqlite3 is the library reading/writing the SQLite file on disk
// Drizzle supports many different databases
import { drizzle } from "drizzle-orm/better-sqlite3";

// Creates the database connection
// ! - TypeScript non-null assertion - will be defined
const db = drizzle(process.env.DB_FILE_NAME!);

export default db;
