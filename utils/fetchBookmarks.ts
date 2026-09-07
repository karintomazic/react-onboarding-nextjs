import { z } from "zod";

type Bookmarks = { id: string; userId: string; movieId: number };

const bookmarksSchema = z.object({
  id: z.uuidv7(),
  userId: z.uuidv7(),
  movieId: z.number(),
});

const bookmarkResponseSchema = z.array(bookmarksSchema); //

export async function fetchBookmarks(): Promise<Bookmarks[]> {
  const response = await fetch("/api/bookmarks");

  if (!response.ok) {
    throw new Error(`Request failed with status ${String(response.status)}`);
  }

  const json: unknown = await response.json();
  const data = bookmarkResponseSchema.parse(json);
  return data;
}
