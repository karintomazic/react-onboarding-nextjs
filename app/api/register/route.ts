import db from "@/db";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { usersTable } from "@/db/schema";

const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const { email, password } = registerSchema.parse(body);

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert into the database
    db.insert(usersTable).values({ email, password: hashedPassword }).run();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    return Response.json(
      { error: "Email already registered" },
      { status: 409 },
    );
  }

  //return success
  return Response.json({ success: true }, { status: 201 });
}
