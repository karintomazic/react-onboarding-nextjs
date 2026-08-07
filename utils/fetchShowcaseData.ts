import { z } from "zod";

const tmdbMovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
});

const tmdbResponseSchema = z.object({
  results: z.array(tmdbMovieSchema),
});

const tmbUrl = "https://api.themoviedb.org/3";
const tmbImageUrl = "https://image.tmdb.org/t/p/w500";

type Movie = { id: number; url: string; title: string; date: string };

type ShowcaseData = {
  streaming: Movie[];
  rent: Movie[];
  theater: Movie[];
};

async function fetchAndMapMovies(url: string): Promise<Movie[]> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${String(response.status)}`);
  }

  const json: unknown = await response.json();
  const data = tmdbResponseSchema.parse(json);

  return data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    url: movie.poster_path ? `${tmbImageUrl}${movie.poster_path}` : "",
    date: movie.release_date,
  }));
}

export async function fetchShowcaseData(): Promise<ShowcaseData> {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const [streaming, rent, theater] = await Promise.all([
    fetchAndMapMovies(
      `${tmbUrl}/discover/movie?api_key=${apiKey}&watch_region=US&with_watch_monetization_types=flatrate&sort_by=popularity.desc`,
    ),
    fetchAndMapMovies(
      `${tmbUrl}/discover/movie?api_key=${apiKey}&watch_region=US&with_watch_monetization_types=rent&sort_by=popularity.desc`,
    ),
    fetchAndMapMovies(
      `${tmbUrl}/movie/now_playing?api_key=${apiKey}&region=US`,
    ),
  ]);
  return { streaming, rent, theater };
}
