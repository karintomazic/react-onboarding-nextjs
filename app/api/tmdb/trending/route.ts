import { tmdbFetch } from "@/utils/tmdbFetch";
import { movieListSchema } from "@/utils/fetchMovieList";

export async function GET() {
  const response = await tmdbFetch("/trending/movie/day");
  const data = movieListSchema.parse(await response.json());

  return Response.json(data.results.slice(0, 10));
}
