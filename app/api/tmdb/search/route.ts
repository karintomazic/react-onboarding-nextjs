import { tmdbFetch } from "@/utils/tmdbFetch";
import { movieListSchema } from "@/utils/fetchMovieList";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") ?? "";

  const response = await tmdbFetch(
    `/search/movie?query=${encodeURIComponent(query)}&page=1`,
  );

  const data = movieListSchema.parse(await response.json());

  return Response.json(data.results.slice(0, 10));
}
