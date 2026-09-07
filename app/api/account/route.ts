import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { internalServerErrorResponse } from "@/utils/internalServerErrorResponse";

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return Response.json({ error: "You must be logged in" }, { status: 401 });
    }

    const user = db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, session.user.email))
      .get();

    if (!user) {
      return Response.json({ error: "Account not found" }, { status: 404 });
    }

    db.delete(usersTable).where(eq(usersTable.id, user.id)).run();
  } catch (error) {
    return internalServerErrorResponse(error);
  }

  return new Response(null, { status: 204 });
}
