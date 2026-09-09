// registration Route Handler

import db from "@/db"; // Drizzle connection
import argon2 from "argon2"; // password-hashing library
import { z } from "zod"; // validation library
import { usersTable } from "@/db/schema"; // table definition to insert into
import { eq } from "drizzle-orm";
import { isDrizzleUniqueViolation } from "@/utils/isDrizzleUniqueViolation";
import { internalServerErrorResponse } from "@/utils/internalServerErrorResponse";

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
    const hashedPassword = await argon2.hash(password); // hashes the password before it goes into the database

    // here check for error here first before inserting
    const existingUser = db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .get();

    if (existingUser) {
      return Response.json(
        { error: "Email already registered" },
        { status: 409 },
      );
    }

    // insert new row into the database - run triggers it
    db.insert(usersTable).values({ email, password: hashedPassword }).run();
  } catch (error) {
    // the input itself was invalid
    if (error instanceof z.ZodError) {
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    // the database insert failed
    // keeping it for guarding agains race condition - two users register with the same email at the same time
    if (isDrizzleUniqueViolation(error)) {
      return Response.json(
        { error: "Email already registered" },
        { status: 409 },
      );
    }

    return internalServerErrorResponse(error);
  }

  //return success
  return Response.json({ success: true }, { status: 201 }); // 201 = "Created" -  status specifically for successfully creating a new resource
}
