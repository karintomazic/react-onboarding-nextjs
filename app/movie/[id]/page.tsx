import { Metadata } from "next";
import MovieDetailsContent from "./MovieDetailsContent";
import { fetchMovieDetailsFromTmdb } from "@/utils/fetchMovieDetails";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cache } from "react";
import { notFound } from "next/navigation";
import { isPositiveInteger } from "@/utils/isPositiveInteger";
import { TmdbError } from "@/utils/tmdbFetch";

const getMovieDetails = cache(fetchMovieDetailsFromTmdb);

async function getMovieId(params: PageProps<"/movie/[id]">["params"]) {
  const resolvedParams = await params;
  return Number(resolvedParams.id.match(/^\d+/)?.[0] ?? "");
}

export async function generateMetadata({
  params,
}: PageProps<"/movie/[id]">): Promise<Metadata> {
  const movieId = await getMovieId(params);

  if (!isPositiveInteger(movieId)) {
    notFound();
  }

  let movieDetailsData;

  try {
    movieDetailsData = await getMovieDetails(movieId);
  } catch (error) {
    if (error instanceof TmdbError && error.status === 404) {
      notFound();
    } else {
      throw error;
    }
  }

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

  if (!isPositiveInteger(movieId)) {
    notFound();
  }

  const queryClient = new QueryClient();

  try {
    await queryClient.fetchQuery({
      queryKey: ["movie-detail", movieId],
      queryFn: () => getMovieDetails(movieId),
    });
  } catch (error) {
    if (error instanceof TmdbError && error.status === 404) {
      notFound();
    } else {
      throw error;
    }
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MovieDetailsContent movieId={movieId} />
    </HydrationBoundary>
  );
}
