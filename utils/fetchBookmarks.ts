import { z } from "zod";
import { apiFetch } from "./apiFetch";

type Bookmarks = { id: string; userId: string; movieId: number };

const bookmarksSchema = z.array(
  z.object({
    id: z.uuidv7(),
    userId: z.uuidv7(),
    movieId: z.number(),
  }),
);

export async function fetchBookmarks(): Promise<Bookmarks[]> {
  return apiFetch(`/api/bookmarks`, bookmarksSchema);
}
