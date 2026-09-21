import { Metadata } from "next";
import MovieDetailsContent from "./MovieDetailsContent";
import { tmdbFetch } from "@/utils/tmdbFetch";
import { movieSchema } from "@/utils/fetchMovieDetails";

export async function generateMetadata({
  params,
}: PageProps<"/movie/[id]">): Promise<Metadata> {
  const resolvedParams = await params;
  const movieId = resolvedParams.id.match(/^\d+/)?.[0] ?? "";

  const response = await tmdbFetch(
    `/movie/${movieId}?append_to_response=credits,release_dates`,
  );

   const movieDetailsData = movieSchema.parse(await response.json());

  const releaseYear = movieDetailsData.release_date
    ? new Date(movieDetailsData.release_date).getFullYear()
    : null;

  return {
    title: `${movieDetailsData.title} (${releaseYear !== null ? String(releaseYear) : ""})- The Movie Database(TMDB)`,
  };
}

export default async function MovieDetailPage({
  params,
}: PageProps<"/movie/[id]">) {
  const resolvedParams = await params;
  const movieId = resolvedParams.id.match(/^\d+/)?.[0] ?? "";

  return <MovieDetailsContent movieId={Number(movieId)} />;
}
