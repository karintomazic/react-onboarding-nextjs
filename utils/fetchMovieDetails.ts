import { z } from "zod";
import { tmdbApiKey } from "./tmdbApiKey";

const tmbUrl = "https://api.themoviedb.org/3";

const movieSchema = z.object({
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

export async function fetchMovieDetails(id: number | string) {
  const idNumber = typeof id === "string" ? Number(id) : id;

  if (idNumber < 0 || !Number.isInteger(idNumber)) {
    throw new Error("Invalid movie id");
  }

  const response = await fetch(
    `${tmbUrl}/movie/${String(idNumber)}?api_key=${tmdbApiKey}&append_to_response=credits,release_dates`,
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${String(response.status)}`);
  }

  const data = movieSchema.parse(await response.json());

  return data;
}
