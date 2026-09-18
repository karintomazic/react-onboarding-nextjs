import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import db from "@/db";
import { bookmarksTable, usersTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { isDrizzleUniqueViolation } from "@/utils/isDrizzleUniqueViolation";
import { internalServerErrorResponse } from "@/utils/internalServerErrorResponse";
import { badRequestError } from "@/utils/badRequestError";

const bookmarkSchema = z.object({
  movieId: z.number(), // we need this movieid fromt he client
});

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { movieId } = bookmarkSchema.parse(await request.json());

    if (!session || !session.user?.email) {
      return Response.json({ error: "You must be logged in" }, { status: 401 });
    }

    const user = db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, session.user.email))
      .get();

    if (!user) {
      return Response.json({ error: "No user" }, { status: 401 });
    }

    const existingBookmark = db
      .select()
      .from(bookmarksTable)
      .where(
        and(
          eq(bookmarksTable.userId, user.id),
          eq(bookmarksTable.movieId, movieId),
        ),
      )
      .get();

    if (existingBookmark) {
      return Response.json(
        { error: "Movie already bookmarked" },
        { status: 409 },
      );
    }

    db.insert(bookmarksTable).values({ movieId, userId: user.id }).run(); // and we get the id from the server
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const badRequest = badRequestError(error);
    if (badRequest) return badRequest;

    if (isDrizzleUniqueViolation(error)) {
      return Response.json(
        { error: "Movie already bookmarked" },
        { status: 409 },
      );
    }

    return internalServerErrorResponse(error);
  }

  return Response.json({ success: true }, { status: 201 });
}

export async function GET() {
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
      return Response.json({ error: "No user" }, { status: 401 });
    }

    const allBookmarks = db
      .select()
      .from(bookmarksTable)
      .where(eq(bookmarksTable.userId, user.id))
      .all(); // .all = give me every matching row as an array of objects

    return Response.json(allBookmarks);
  } catch (error) {
    return internalServerErrorResponse(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { movieId } = bookmarkSchema.parse(await request.json());

    if (!session || !session.user?.email) {
      return Response.json({ error: "You must be logged in" }, { status: 401 });
    }
    const user = db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, session.user.email))
      .get();

    if (!user) {
      return Response.json({ error: "No user" }, { status: 401 });
    }

    db.delete(bookmarksTable)
      .where(
        and(
          // need both so we dont delete the worng one
          eq(bookmarksTable.userId, user.id), // this users row
          eq(bookmarksTable.movieId, movieId), // for thsi sepcific movie
        ),
      )
      .run();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const badRequest = badRequestError(error);
    if (badRequest) return badRequest;

    return internalServerErrorResponse(error);
  }

  return new Response(null, { status: 204 });
}
