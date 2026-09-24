import { z } from "zod";
import { tmdbFetch } from "./tmdbFetch";

const tmdbMovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
});

const tmdbResponseSchema = z.object({
  results: z.array(tmdbMovieSchema),
});

const tmbImageUrl = "https://image.tmdb.org/t/p/w500";

type Movie = { id: number; url: string; title: string; date: string };

const showcaseMoviesSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    url: z.string(),
    date: z.string(),
  }),
);

type ShowcaseData = {
  streaming: Movie[];
  rent: Movie[];
  theater: Movie[];
};

async function fetchAndMapTmdbMovies(url: string): Promise<Movie[]> {
  const response = await tmdbFetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${String(response.status)}`);
  }

  const data = tmdbResponseSchema.parse(await response.json());

  return showcaseMoviesSchema.decode(
    data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      url: movie.poster_path ? `${tmbImageUrl}${movie.poster_path}` : "",
      date: movie.release_date,
    })),
  );
}

export async function fetchShowcaseData(): Promise<ShowcaseData> {
  const response = await fetch("/api/tmdb/showcase");

  if (!response.ok) {
    throw new Error(`Request failed with status ${String(response.status)}`);
  }

  return response.json() as Promise<ShowcaseData>;
}

export async function fetchTmdbShowcaseData(): Promise<ShowcaseData> {
  const [streaming, rent, theater] = await Promise.all([
    fetchAndMapTmdbMovies(
      `/discover/movie?watch_region=US&with_watch_monetization_types=flatrate&sort_by=popularity.desc`,
    ),
    fetchAndMapTmdbMovies(
      `/discover/movie?watch_region=US&with_watch_monetization_types=rent&sort_by=popularity.desc`,
    ),
    fetchAndMapTmdbMovies(`/movie/now_playing?region=US`),
  ]);
  return { streaming, rent, theater };
}
