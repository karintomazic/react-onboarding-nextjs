import { z } from "zod";
import { tmdbFetch } from "./tmdbFetch";
import { apiFetch } from "./apiFetch";
import { apiUrl } from "./apiUrl";

export const movieSchema = z.object({
  id: z.number(),
  overview: z.string(),
  title: z.string(),
  genres: z.array(z.object({ id: z.number(), name: z.string() })),
  release_date: z.string(),
  poster_path: z.string(),
  backdrop_path: z.string(),
  tagline: z.string(),
  runtime: z.number(),
  credits: z.object({
    crew: z.array(
      z.object({ id: z.number(), name: z.string(), job: z.string() }),
    ),
  }),
  vote_average: z.number(),
});

export async function fetchMovieDetails(
  id: number | string,
): Promise<z.infer<typeof movieSchema>> {
  const idNumber = typeof id === "string" ? Number(id) : id;

  if (idNumber < 0 || !Number.isInteger(idNumber)) {
    throw new Error("Invalid movie id");
  }

  return apiFetch(apiUrl(`movie/${idNumber}`), movieSchema);
}

export async function fetchTmdbMovieDetails(
  id: number | string,
): Promise<z.infer<typeof movieSchema>> {
  const response = await tmdbFetch(
    `/movie/${id}?append_to_response=credits,release_dates`,
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return movieSchema.parse(await response.json());
}
