import { z } from "zod";
import { tmdbFetch } from "./tmdbFetch";
import { apiUrl } from "./apiUrl";

type Genre = { id: number; name: string };

const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const genreResponseSchema = z.object({
  genres: z.array(genreSchema),
});

export async function fetchGenres(): Promise<Genre[]> {
  const response = await fetch(apiUrl(`genres`));

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return z.array(genreSchema).parse(await response.json());
}

export async function fetchTmdbGenres(): Promise<Genre[]> {
  const response = await tmdbFetch(`/genre/movie/list`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = genreResponseSchema.parse(await response.json());
  return data.genres;
}
