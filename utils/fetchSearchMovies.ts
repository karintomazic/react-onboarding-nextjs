import { z } from "zod";
import { apiFetch } from "./apiFetch";
import { apiUrl } from "./apiUrl";
import { tmdbFetch } from "./tmdbFetch";
const tmbImageUrl = "https://image.tmdb.org/t/p/w500";

const searchMoviesSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    url: z.string(),
    date: z.string(),
    description: z.string(),
  }),
);

const searchPersonSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    department: z.string(),
    profileImg: z.string(),
    known_for: z.array(z.string()),
  }),
);

const searchSimpleItemSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
  }),
);

export const searchResultsSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("media"),
    movies: searchMoviesSchema,
    totalPages: z.number(),
    totalResults: z.number(),
  }),
  z.object({
    kind: z.literal("person"),
    people: searchPersonSchema,
    totalPages: z.number(),
    totalResults: z.number(),
  }),
  z.object({
    kind: z.literal("simple"),
    items: searchSimpleItemSchema,
    totalPages: z.number(),
    totalResults: z.number(),
  }),
]);

type SearchResult = z.infer<typeof searchResultsSchema>;

const mediaItemSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  name: z.string().optional(),
  poster_path: z.string().nullable().optional(),
  release_date: z.string().optional(),
  first_air_date: z.string().optional(),
  overview: z.string().optional(),
});

const personItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  known_for_department: z.string().optional(),
  profile_path: z.string().nullable().optional(),
  known_for: z.array(
    z.object({
      title: z.string().optional(),
      name: z.string().optional(),
    }),
  ),
});

const simpleItemSchema = z.object({
  id: z.number(),
  name: z.string(),
});

function responseEnvelope<T extends z.ZodType>(itemSchema: T) {
  return z.object({
    results: z.array(itemSchema),
    total_pages: z.number(),
    total_results: z.number(),
  });
}

export async function fetchSearchMovies(
  page: number,
  filter: string,
  query: string,
): Promise<SearchResult> {
  return apiFetch(
    apiUrl(`movie-search?filter=${filter}&query=${query}&page=${page}`),
    searchResultsSchema,
  );
}

export async function fetchTmdbSearchMovies(
  page: number,
  filter: string,
  query: string,
): Promise<SearchResult> {
  let searchResult: SearchResult;

  const pathString = `/search/${filter}?query=${query}&page=${page}`;

  if (filter === "person") {
    const data = await tmdbFetch(
      pathString,
      responseEnvelope(personItemSchema),
    );

    searchResult = {
      kind: "person",
      people: searchPersonSchema.decode(
        data.results.map((p) => ({
          id: p.id,
          name: p.name,
          department: p.known_for_department ?? "",
          profileImg: p.profile_path ? `${tmbImageUrl}${p.profile_path}` : "",
          known_for: p.known_for.map((k) => k.title ?? k.name ?? ""),
        })),
      ),
      totalPages: data.total_pages,
      totalResults: data.total_results,
    };
  } else if (filter === "keyword" || filter === "company") {
    const data = await tmdbFetch(
      pathString,
      responseEnvelope(simpleItemSchema),
    );

    searchResult = {
      kind: "simple",
      items: searchSimpleItemSchema.decode(
        data.results.map((r) => ({ id: r.id, name: r.name })),
      ),
      totalPages: data.total_pages,
      totalResults: data.total_results,
    };
  } else {
    const data = await tmdbFetch(pathString, responseEnvelope(mediaItemSchema));

    searchResult = {
      kind: "media",
      movies: searchMoviesSchema.decode(
        data.results.map((m) => ({
          id: m.id,
          title: m.title ?? m.name ?? "",
          url: m.poster_path ? `${tmbImageUrl}${m.poster_path}` : "",
          date: m.release_date ?? m.first_air_date ?? "",
          description: m.overview ?? "",
        })),
      ),
      totalPages: data.total_pages,
      totalResults: data.total_results,
    };
  }

  return searchResult;
}
