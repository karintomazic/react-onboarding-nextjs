// users table definition

// Drizzle's SQLite-specific schema-building tools
// sqliteTable - unction you call to define a table
// int,text - column type builders for SQLite
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

// A helper that lets you write a raw SQL fragment directly inside your TypeScript schema
import { sql } from "drizzle-orm";

// Defines a table
// users_table - table name as it exists in the real SQL database
export const usersTable = sqliteTable("users_table", {

  // integer column - tables primary key
  id: int().primaryKey({ autoIncrement: true }),
  email: text().notNull().unique(),
  password: text().notNull(),

  // created_at - column name in the database
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`) // CURRENT_TIMESTAMP - SQLite function
    .notNull(),
});
