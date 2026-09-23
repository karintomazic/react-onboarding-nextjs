import { z } from "zod";
import { tmdbFetch } from "./tmdbFetch";
const tmbImageUrl = "https://image.tmdb.org/t/p/w500";

type Movie = { id: number; url: string; title: string; date: string };

const tmdbMovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
  release_date: z.string().optional(), // some movies dont have the release date
});

const tmdbResponseSchema = z.object({
  results: z.array(tmdbMovieSchema),
});

const popularMoviesSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    url: z.string(),
    date: z.string(),
  }),
);

export async function fetchPopularMovies(
  sortBy: string,
  genreId: number[],
): Promise<Movie[]> {
  const genreParam =
    genreId.length > 0 ? `&genreId=${genreId.join(",")}` : "";

  const response = await fetch(
    `/api/tmdb/popular?sortBy=${sortBy}${genreParam}`,
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${String(response.status)}`);
  }

  const data = tmdbResponseSchema.parse(await response.json());

  return popularMoviesSchema.decode(
    data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      url: movie.poster_path ? `${tmbImageUrl}${movie.poster_path}` : "",
      date: movie.release_date ?? "",
    })),
  );
}

export async function fetchTmdbPopularMovies(
  sortBy: string,
  genreId: number[],
): Promise<Movie[]> {
  const genreParam =
    genreId.length > 0 ? `&with_genres=${genreId.join(",")}` : "";

  const response = await tmdbFetch(
    `/discover/movie?sort_by=${sortBy}${genreParam}`,
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${String(response.status)}`);
  }

  const data = tmdbResponseSchema.parse(await response.json());

  return popularMoviesSchema.decode(
    data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      url: movie.poster_path ? `${tmbImageUrl}${movie.poster_path}` : "",
      date: movie.release_date ?? "",
    })),
  );
}
