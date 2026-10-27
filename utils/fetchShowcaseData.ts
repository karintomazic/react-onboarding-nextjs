import { z } from "zod";
import { apiFetch } from "./apiFetch";
import { apiUrl } from "./apiUrl";
import { tmdbFetch } from "./tmdbFetch";
import { getTmdbImageUrl } from "@/utils/tmdbImage";

const tmdbMovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
});

const tmdbResponseSchema = z.object({
  results: z.array(tmdbMovieSchema),
});

const showcaseMovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  url: z.string(),
  date: z.string(),
});

const showcaseMoviesSchema = z.array(showcaseMovieSchema);

const showcaseDataSchema = z.object({
  streaming: showcaseMoviesSchema,
  rent: showcaseMoviesSchema,
  theater: showcaseMoviesSchema,
});

type Movie = z.infer<typeof showcaseMovieSchema>;
type ShowcaseData = z.infer<typeof showcaseDataSchema>;

async function fetchAndMapTmdbMovies(url: string): Promise<Movie[]> {
  const data = await tmdbFetch(url, tmdbResponseSchema);

  return showcaseMoviesSchema.decode(
    data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      url: getTmdbImageUrl(movie.poster_path),
      date: movie.release_date,
    })),
  );
}

export async function fetchShowcaseDataFromApi(): Promise<ShowcaseData> {
  return apiFetch(apiUrl(`showcase`), showcaseDataSchema);
}

export async function fetchShowcaseDataFromTmdb(): Promise<ShowcaseData> {
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
