import db from "@/db";
import argon2 from "argon2";
import { usersTable } from "@/db/schema";

const fakeUsers = [
  { email: "ana@nowhere.never", password: "anapassword" },
  { email: "karin@nowhere.never", password: "karinpassword" },
  { email: "test@nowhere.never", password: "testpassword" },
];

// delete all data from usersTable
db.delete(usersTable).run();

// top level await - works because of "type": "module" in package.json
await Promise.all(
  fakeUsers.map(async (user) => {
    const hashedPassword = await argon2.hash(user.password);
    db.insert(usersTable)
      .values({ email: user.email, password: hashedPassword })
      .run();
  }),
);
