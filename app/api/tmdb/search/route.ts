import { tmdbFetch } from "@/utils/tmdbFetch";
import { movieListSchema } from "@/utils/fetchMovieList";
import { tmdbRouteHandler } from "@/utils/tmdbRouteHandler";

export async function GET(request: Request) {
  return tmdbRouteHandler(async () => {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") ?? "";

    const response = await tmdbFetch(
      `/search/movie?query=${encodeURIComponent(query)}&page=1`,
    );

    const data = movieListSchema.parse(await response.json());

    return data.results.slice(0, 10);
  });
}
