"use client";

import styles from "./BookmarkedMovieCard.module.scss";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMovieDetails } from "@/utils/fetchMovieDetails";
import MovieCard from "@/components/atoms/MovieCard/MovieCard";
import Spinner from "@/components/atoms/Spinner/Spinner";
const tmbImageUrl = "https://image.tmdb.org/t/p/w500";
import {
  faStar,
  faHeart,
  faList,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BookmarkedMovieCard({ movieId }: { movieId: string }) {
  const queryClient = useQueryClient();
  const [error, setError] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["bookmarks-cards", movieId],
    queryFn: () => fetchMovieDetails(movieId),
  });

  const handleBookmarkRemove = async () => {
    const response = await fetch("/api/bookmarks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieId: Number(movieId) }),
    });

    if (!response.ok) {
      const json = await response.json();
      setError(json.error);
    } else {
      setError("");
      queryClient.invalidateQueries({ queryKey: ["bookmarks-page"] });
    }
  };

  if (isLoading) {
    return <Spinner variant="smallSpinner" />;
  }

  if (isError || !data) {
    return <p>Could not load this movie.</p>;
  }

  return (
    <div className={styles.bookmarksGrid}>
      <MovieCard
        id={String(data.id)}
        imageUrl={`${tmbImageUrl}${data.poster_path}`}
        title={data.title}
        date={data.release_date}
        content={data.overview}
        score={data.vote_average}
      ></MovieCard>

      <div className={styles.actionsStrip}>
        <button className={styles.actionButton}>
          <span className={`${styles.actionIcon} ${styles.rateIt}`}>
            <FontAwesomeIcon icon={faStar} />
          </span>
          Rate it!
        </button>
        <button className={styles.actionButton}>
          <span className={`${styles.actionIcon} ${styles.favourite}`}>
            <FontAwesomeIcon icon={faHeart} />
          </span>
          Favourite
        </button>
        <button className={styles.actionButton}>
          <span className={`${styles.actionIcon} ${styles.list}`}>
            <FontAwesomeIcon icon={faList} />
          </span>
          Add to list
        </button>
        <button className={styles.actionButton} onClick={handleBookmarkRemove}>
          <span className={`${styles.actionIcon} ${styles.remove}`}>
            <FontAwesomeIcon icon={faXmark} />
          </span>
          Remove
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
