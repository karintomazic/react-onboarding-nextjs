import { z } from "zod";
import { apiFetch } from "./apiFetch";
import { apiUrl } from "./apiUrl";

const tmdbMovieSchema = z.object({
  title: z.string(),
  id: z.number(),
});

const tmdbMovieSchemaArray = z.array(tmdbMovieSchema);

export const movieListSchema = z.object({
  results: z.array(tmdbMovieSchema),
});

export async function fetchMovieList(path: string) {
  return apiFetch(apiUrl(path), tmdbMovieSchemaArray);
}
