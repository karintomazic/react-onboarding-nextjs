import { Metadata } from "next";
import MovieDetailsContent from "./MovieDetailsContent";
import { fetchTmdbMovieDetails } from "@/utils/fetchMovieDetails";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cache } from "react";

const getMovieDetails = cache(fetchTmdbMovieDetails);

async function getMovieId(params: PageProps<"/movie/[id]">["params"]) {
  const resolvedParams = await params;
  return Number(resolvedParams.id.match(/^\d+/)?.[0] ?? "");
}

export async function generateMetadata({
  params,
}: PageProps<"/movie/[id]">): Promise<Metadata> {
  const movieId = await getMovieId(params);

  const movieDetailsData = await getMovieDetails(movieId);

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
  const movieId = await getMovieId(params);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["movie-detail", movieId],
    queryFn: () => getMovieDetails(movieId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MovieDetailsContent movieId={movieId} />
    </HydrationBoundary>
  );
}
