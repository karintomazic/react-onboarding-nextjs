import { Metadata } from "next";
import MovieDetailContent from "./MovieDetailsContent";
import { fetchMovieDetails } from "@/utils/fetchMovieDetails";

export async function generateMetadata({
  params,
}: PageProps<"/movie/[id]">): Promise<Metadata> {
  const resolvedParams = await params;
  const movieId = resolvedParams.id.match(/^\d+/)?.[0] ?? "";

  const movieDetailsData = await fetchMovieDetails(movieId);

  const releaseYear = movieDetailsData.release_date
    ? new Date(movieDetailsData.release_date).getFullYear()
    : null;

  return {
    title: `${movieDetailsData?.title ?? ""} (${releaseYear !== null ? String(releaseYear) : ""})- The Movie Database(TMDB)`,
  };
}

export default async function MovieDetailPage({
  params,
}: PageProps<"/movie/[id]">) {
  const resolvedParams = await params; // returns string (id)
  const movieId = resolvedParams.id.match(/^\d+/)?.[0] ?? "";

  return <MovieDetailContent movieId={Number(movieId)} />;
}
