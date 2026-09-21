import { tmdbFetch } from "@/utils/tmdbFetch";
import { movieSchema } from "@/utils/fetchMovieDetails";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const idNumber = Number(id);

  if (idNumber < 0 || !Number.isInteger(idNumber)) {
    return Response.json({ error: "Invalid movie id" }, { status: 400 });
  }

  const response = await tmdbFetch(
    `/movie/${String(idNumber)}?append_to_response=credits,release_dates`,
  );

  if (!response.ok) {
    return Response.json(
      { error: "Request failed" },
      { status: response.status },
    );
  }

  const data = movieSchema.parse(await response.json());

  return Response.json(data);
}
