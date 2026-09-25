import db from "@/db";
import argon2 from "argon2";
import { z } from "zod";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { isDrizzleUniqueViolation } from "@/utils/isDrizzleUniqueViolation";
import { internalServerErrorResponse } from "@/utils/internalServerErrorResponse";
import { badRequestError } from "@/utils/badRequestError";
import { registerSchema } from "@/lib/registerSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (session) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  // checks for validation and duplicate email
  try {
    const { email, password } = registerSchema.parse(await request.json());

    // hash the password
    const hashedPassword = await argon2.hash(password);

    const existingUser = db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .get();

    if (existingUser) {
      return Response.json(
        { fieldErrors: { email: ["Email already registered"] } },
        { status: 409 },
      );
    }

    // insert new row into the database - run triggers it
    db.insert(usersTable).values({ email, password: hashedPassword }).run();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const { fieldErrors, formErrors } = z.flattenError(error);
      return Response.json({ fieldErrors, formErrors }, { status: 400 });
    }

    const badRequest = badRequestError(error);
    if (badRequest) return badRequest;

    // the database insert failed
    // keeping it for guarding agains race condition - two users register with the same email at the same time
    if (isDrizzleUniqueViolation(error)) {
      return Response.json(
        { fieldErrors: { email: ["Email already registered"] } },
        { status: 409 },
      );
    }

    return internalServerErrorResponse(error);
  }

  return Response.json({ success: true }, { status: 201 }); // 201 = "Created" -  status specifically for successfully creating a new resource
}
