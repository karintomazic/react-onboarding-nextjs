import { z } from "zod";
import { apiFetch } from "./apiFetch";
import { apiUrl } from "./apiUrl";
import { tmdbFetch } from "./tmdbFetch";
import { isPositiveInteger } from "./isPositiveInteger";

export const movieSchema = z.object({
  id: z.number(),
  overview: z.string(),
  title: z.string(),
  genres: z.array(z.object({ id: z.number(), name: z.string() })),
  release_date: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  tagline: z.string(),
  runtime: z.number(),
  credits: z.object({
    crew: z.array(
      z.object({ id: z.number(), name: z.string(), job: z.string() }),
    ),
  }),
  vote_average: z.number(),
});

export async function fetchMovieDetailsFromApi(
  id: number,
): Promise<z.infer<typeof movieSchema>> {
  if (!isPositiveInteger(id)) {
    throw new Error("Invalid movie id");
  }
  return apiFetch(apiUrl(`movie/${id}`), movieSchema);
}

export async function fetchMovieDetailsFromTmdb(
  id: number,
): Promise<z.infer<typeof movieSchema>> {
  return tmdbFetch(
    `/movie/${id}?append_to_response=credits,release_dates`,
    movieSchema,
  );
}
