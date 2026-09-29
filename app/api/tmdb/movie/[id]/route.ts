import { fetchTmdbMovieDetails } from "@/utils/fetchMovieDetails";
import { tmdbRouteHandler } from "@/utils/tmdbRouteHandler";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const idNumber = Number(id);

  if (idNumber < 0 || !Number.isInteger(idNumber)) {
    return Response.json({ error: "Invalid movie id" }, { status: 400 });
  }

  return tmdbRouteHandler(() => fetchTmdbMovieDetails(idNumber));
}
