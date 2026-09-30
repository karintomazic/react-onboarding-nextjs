import { movieListSchema } from "@/utils/fetchMovieList";
import { tmdbRouteHandler } from "@/utils/tmdbRouteHandler";
import { tmdbFetch } from "@/utils/tmdbFetch";

export async function GET(request: Request) {
  return tmdbRouteHandler(async () => {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") ?? "";

    const data = await tmdbFetch(
      `/search/movie?query=${encodeURIComponent(query)}&page=1`,
      movieListSchema,
    );
    return data.results;
  });
}
