import { z } from "zod";
import { tmdbApiKey } from "./tmdbApiKey";

const tmbUrl = "https://api.themoviedb.org/3";
type Genre = { id: number; name: string };

const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const genreResponseSchema = z.object({
  genres: z.array(genreSchema),
});

export async function fetchGenres(): Promise<Genre[]> {
  const response = await fetch(
    `${tmbUrl}/genre/movie/list?api_key=${tmdbApiKey}`,
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${String(response.status)}`);
  }

  const data = genreResponseSchema.parse(await response.json());

  return data.genres;
}
