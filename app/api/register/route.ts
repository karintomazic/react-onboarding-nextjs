// registration Route Handler

import db from "@/db"; // Drizzle connection
import bcrypt from "bcryptjs"; // password-hashing library
import { z } from "zod"; // validation library
import { usersTable } from "@/db/schema"; // table definition to insert into

// Defines what counts as valid registration input — checked against whatever the client
// sends, before any hashing or database work happens.
const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  const body = await request.json();

  // checks for validation and duplicate email
  try {
    const { email, password } = registerSchema.parse(body);

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // hashes the password before it goes into the database - 10 is the "salt rounds"
    // -  how slow the hash is to compute - harder to brute-force

    // insert new row into the database - run triggers it
    db.insert(usersTable).values({ email, password: hashedPassword }).run();
  } catch (error) {
    // the input itself was invalid
    if (error instanceof z.ZodError) {
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    // the database insert failed

    if (
      error instanceof Error &&
      error.cause instanceof Error &&
      "code" in error.cause &&
      error.cause.code === "SQLITE_CONSTRAINT_UNIQUE"
    ) {
      return Response.json(
        { error: "Email already registered" },
        { status: 409 },
      );
    }

    return Response.json(
      { error: "Something went wrong, please try again" },
      { status: 500 },
    );
  }

  //return success
  return Response.json({ success: true }, { status: 201 }); // 201 = "Created" -  status specifically for successfully creating a new resource
}
