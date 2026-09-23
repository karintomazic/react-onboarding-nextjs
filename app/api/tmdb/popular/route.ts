import { fetchTmdbPopularMovies } from "@/utils/fetchPopularMovies";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sortby = searchParams.get("sortBy") ?? "";
  const genreId =
    searchParams.get("genreId")?.split(",").filter(Boolean).map(Number) ?? [];

  try {
    const data = await fetchTmdbPopularMovies(sortby, genreId);
    return Response.json(data);
  } catch {
    return Response.json({ error: "Request failed" }, { status: 502 });
  }
}
