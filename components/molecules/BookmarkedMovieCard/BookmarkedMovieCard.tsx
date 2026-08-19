"use client";

import styles from "./BookmarkedMovieCard.module.scss";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetails } from "@/utils/fetchMovieDetails";
import MovieCard from "@/components/atoms/MovieCard/MovieCard";
import Spinner from "@/components/atoms/Spinner/Spinner";
const tmbImageUrl = "https://image.tmdb.org/t/p/w500";

export default function BookmarkedMovieCard({ movieId }: { movieId: string }) {
  const { data } = useQuery({
    queryKey: ["bookmarks-cards", movieId],
    queryFn: () => fetchMovieDetails(movieId),
  });

  if (!data) {
    return <Spinner variant="smallSpinner" />;
  }

  return (
    <div className={styles.bookmarksGrid}>
      <MovieCard
        id={String(data.id)}
        imageUrl={`${tmbImageUrl}${data.poster_path}`}
        title={data.title}
        date={data.release_date}
        content={data.overview}
      ></MovieCard>
    </div>
  );
}
