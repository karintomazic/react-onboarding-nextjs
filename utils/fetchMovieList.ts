import { z } from "zod";

const tmdbMovieSchema = z.object({
  title: z.string(),
  id: z.number(),
});

const movieListSchema = z.object({
  results: z.array(tmdbMovieSchema),
});

export async function fetchMovieList(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${String(response.status)}`);
  }

  const data = movieListSchema.parse(await response.json());

  return data.results.slice(0, 10);
}
