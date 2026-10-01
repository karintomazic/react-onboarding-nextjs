import { z } from "zod";
import { apiFetch } from "./apiFetch";
import { apiUrl } from "./apiUrl";
import { tmdbFetch } from "./tmdbFetch";

type Genre = { id: number; name: string };

const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const genreSchemaArray = z.array(genreSchema);

const genreResponseSchema = z.object({
  genres: z.array(genreSchema),
});

export async function fetchGenres(): Promise<Genre[]> {
  return apiFetch(apiUrl(`genres`), genreSchemaArray);
}

export async function fetchTmdbGenres(): Promise<Genre[]> {
  const data = await tmdbFetch(`/genre/movie/list`, genreResponseSchema);
  return data.genres;
}
