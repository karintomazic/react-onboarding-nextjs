import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import db from "@/db";
import { bookmarksTable, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const bookmarkSchema = z.object({
  movieId: z.number(), // we need this movieid fromt he client
});

// const user = db.select().from(usersTable).where(eq(usersTable.email, session.user.email)).get();
//   console.log(user);

export async function POST(request: Request) {
  // const body = await request.json();

  try {
    const body = await request.json();
    const session = await getServerSession(authOptions);
    const { movieId } = bookmarkSchema.parse(body);

    // console.log(id);
    // console.log(session);

    if (!session || !session.user?.email) {
      return Response.json({ error: "Invalid input" }, { status: 401 });
    }

    const user = db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, session.user.email))
      .get();

    if (!user) {
      return Response.json({ error: "No user" }, { status: 401 });
    }

    db.insert(bookmarksTable).values({ movieId, userId: user.id }).run(); // and we get the id from the server 

    console.log(user);
  } catch (error) {
    console.log(error);
    console.log("errorrr");

    return Response.json(
      { error: "Something went wrong, please try again" },
      { status: 500 },
    );
  }

  return Response.json({ success: true }, { status: 201 });
}
