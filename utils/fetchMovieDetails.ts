import { z } from "zod";
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

export async function fetchMovieDetails(id: string) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const response = await fetch(
    `${tmbUrl}/movie/${id}?api_key=${apiKey}&append_to_response=credits,release_dates`,
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${String(response.status)}`);
  }

  const json: unknown = await response.json();
  const data = movieSchema.parse(json);

  return data;
}
