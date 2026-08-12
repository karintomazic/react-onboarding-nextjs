import db from "@/db";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = registerSchema.parse(body);

  // hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // insert into the database
    db.prepare("INSERT INTO users (email, password) VALUES (?, ?)").run(
    email,
    hashedPassword,
  );

  //return success
  return Response.json({ success: true }, { status: 201 });
}
