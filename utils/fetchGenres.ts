import { z } from "zod";

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
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const response = await fetch(`${tmbUrl}/genre/movie/list?api_key=${apiKey}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${String(response.status)}`);
  }

  const json: unknown = await response.json();
  const data = genreResponseSchema.parse(json);

  return data.genres;
}
