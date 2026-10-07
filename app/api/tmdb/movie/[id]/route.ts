import { fetchTmdbMovieDetails } from "@/utils/fetchMovieDetails";
import { tmdbRouteHandler } from "@/utils/tmdbRouteHandler";
import { isPositiveInteger } from "@/utils/isPositiveInteger";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const idNumber = Number(id);

  if (!isPositiveInteger(idNumber)) {
    return Response.json({ error: "Invalid movie id" }, { status: 400 });
  }

  return tmdbRouteHandler(() => fetchTmdbMovieDetails(idNumber));
}
