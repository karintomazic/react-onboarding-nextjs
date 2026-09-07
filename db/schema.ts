// users table definition

// Drizzle's SQLite-specific schema-building tools
// sqliteTable - unction you call to define a table
// int,text - column type builders for SQLite
import { int, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { v7 as uuidv7 } from "uuid";

// A helper that lets you write a raw SQL fragment directly inside your TypeScript schema
import { sql } from "drizzle-orm";

// Defines a table
// users_table - table name as it exists in the real SQL database
export const usersTable = sqliteTable("users_table", {
  // run this function (uuidv7()) right before insert and use what it returns
  id: text().primaryKey().$defaultFn(uuidv7),
  email: text().notNull().unique(),
  password: text().notNull(),

  // created_at - column name in the database
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`) // CURRENT_TIMESTAMP - SQLite function
    .notNull(),
});

export const bookmarksTable = sqliteTable(
  "bookmarks_table",
  {
    id: text().primaryKey().$defaultFn(uuidv7),
    userId: text()
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    movieId: int().notNull(),
    createdAt: text("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (t) => [unique().on(t.userId, t.movieId)],
);
