import { fetchTmdbAllCounts } from "@/utils/fetchFilterLinks";
import { tmdbRouteHandler } from "@/utils/tmdbRouteHandler";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") ?? "";
  return tmdbRouteHandler(() => fetchTmdbAllCounts(query));
}
