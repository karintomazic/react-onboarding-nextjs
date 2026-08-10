import { z } from "zod";

const tmbUrl = "https://api.themoviedb.org/3";
const tmbImageUrl = "https://image.tmdb.org/t/p/w500";

type Movie = {
  id: number;
  url: string;
  title: string;
  date: string;
  description: string;
};
type Person = {
  id: number;
  name: string;
  department: string;
  profileImg: string;
  known_for: string[];
};
type SimpleItem = { id: number; name: string };

type SearchResult =
  | { kind: "media"; movies: Movie[]; totalPages: number }
  | { kind: "person"; people: Person[]; totalPages: number }
  | { kind: "simple"; items: SimpleItem[]; totalPages: number };

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
  return z.object({ results: z.array(itemSchema), total_pages: z.number() });
}

export async function fetchSearchMovies(
  page: number,
  filter: string,
  query: string,
): Promise<SearchResult> {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const response = await fetch(
    `${tmbUrl}/search/${filter}?api_key=${apiKey}&query=${query}&page=${String(page)}`,
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${String(response.status)}`);
  }

  const json: unknown = await response.json();

  let searchResult: SearchResult;

  if (filter === "person") {
    const data = responseEnvelope(personItemSchema).parse(json);
    searchResult = {
      kind: "person",
      people: data.results.map((p) => ({
        id: p.id,
        name: p.name,
        department: p.known_for_department ?? "",
        profileImg: p.profile_path ? `${tmbImageUrl}${p.profile_path}` : "",
        known_for: p.known_for.map((k) => k.title ?? k.name ?? ""),
      })),
      totalPages: data.total_pages,
    };
  } else if (filter === "keyword" || filter === "company") {
    const data = responseEnvelope(simpleItemSchema).parse(json);
    searchResult = {
      kind: "simple",
      items: data.results.map((r) => ({ id: r.id, name: r.name })),
      totalPages: data.total_pages,
    };
  } else {
    const data = responseEnvelope(mediaItemSchema).parse(json);
    searchResult = {
      kind: "media",
      movies: data.results.map((m) => ({
        id: m.id,
        title: m.title ?? m.name ?? "",
        url: m.poster_path ? `${tmbImageUrl}${m.poster_path}` : "",
        date: m.release_date ?? m.first_air_date ?? "",
        description: m.overview ?? "",
      })),
      totalPages: data.total_pages,
    };
  }

  return searchResult;
}
