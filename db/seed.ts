import db from "@/db";
import bcrypt from "bcryptjs";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

const fakeUsers = [
  { email: "ana@gmail.com", password: "anapassword" },
  { email: "karin@gmail.com", password: "karinpassword" },
  { email: "test@gmail.com", password: "testpassword" },
];

fakeUsers.forEach(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);

  const existingUser = db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, user.email))
    .get();

  if (existingUser) {
    return;
  }

  db.insert(usersTable)
    .values({ email: user.email, password: hashedPassword })
    .run();
});
