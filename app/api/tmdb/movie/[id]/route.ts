import { fetchTmdbMovieDetails } from "@/utils/fetchMovieDetails";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const idNumber = Number(id);

  if (idNumber < 0 || !Number.isInteger(idNumber)) {
    return Response.json({ error: "Invalid movie id" }, { status: 400 });
  }

  try {
    const data = await fetchTmdbMovieDetails(idNumber);
    return Response.json(data);
  } catch {
    return Response.json({ error: "Request failed" }, { status: 502 });
  }
}
