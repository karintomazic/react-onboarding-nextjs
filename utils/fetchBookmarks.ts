import { z } from "zod";
import { apiFetch } from "./apiFetch";

const bookmark = z.object({
  id: z.uuidv7(),
  userId: z.uuidv7(),
  movieId: z.number(),
});

const bookmarksSchema = z.array(bookmark);

type Bookmark = z.infer<typeof bookmark>;

export async function fetchBookmarks(): Promise<Bookmark[]> {
  return apiFetch(`/api/bookmarks`, bookmarksSchema);
}
