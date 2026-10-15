import { z } from "zod";
import { apiFetch } from "./apiFetch";
import { apiUrl } from "./apiUrl";
import { tmdbFetch } from "./tmdbFetch";
import { getTmdbImageUrl } from "@/utils/tmdbImage";

const tmdbMovieSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    poster_path: z.string().nullable(),
    release_date: z.string().optional(), // some movies dont have the release date
  }),
);

const tmdbResponseSchema = z.object({
  results: tmdbMovieSchema,
  total_pages: z.number(),
});

const popularMoviesSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    url: z.string(),
    date: z.string(),
  }),
);

const popularResultSchema = z.object({
  results: popularMoviesSchema,
  totalPages: z.number(),
});

type PopularResult = z.infer<typeof popularResultSchema>;

export async function fetchPopularMoviesFromApi(
  sortBy: string,
  genreId: number[],
  page: number,
): Promise<PopularResult> {
  const genreParam = genreId.length > 0 ? `&genreId=${genreId.join(",")}` : "";

  return apiFetch(
    apiUrl(`popular?sortBy=${sortBy}${genreParam}&page=${page}`),
    popularResultSchema,
  );
}

export async function fetchPopularMoviesFromTmdb(
  sortBy: string,
  genreId: number[],
  page: number,
): Promise<PopularResult> {
  const genreParam =
    genreId.length > 0 ? `&with_genres=${genreId.join(",")}` : "";

  const data = await tmdbFetch(
    `/discover/movie?sort_by=${sortBy}${genreParam}&page=${page}`,
    tmdbResponseSchema,
  );

  const popularResults = {
    results: popularMoviesSchema.decode(
      data.results.map((m) => ({
        id: m.id,
        title: m.title,
        url: getTmdbImageUrl(m.poster_path),
        date: m.release_date ?? "",
      })),
    ),
    totalPages: data.total_pages,
  };

  return popularResults;
}
