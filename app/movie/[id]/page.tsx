"use client";

// import { useParams } from "react-router";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import styles from "./page.module.scss";
import SingleColumn from "@/components/templates/SingleColumn/SingleColumn";
import UserScore from "@/components/molecules/UserScore/UserScore";
import MovieActions from "@/components/molecules/MovieActions/MovieActions";
import MovieInfo from "@/components/molecules/MovieInfo/MovieInfo";
import CrewGrid from "@/components/molecules/CrewGrid/CrewGrid";
import { UseDocumentTitle } from "../../../hooks/useDocumentTitle";
import { movieInfoLabels, movieActionsLabels } from "../../../data/labels";
import { fetchMovieDetails } from "@/utils/fetchMovieDetails";
import Spinner from "@/components/atoms/Spinner/Spinner";
import Image from "next/image";
import { useState } from "react";
import { fetchBookmarks } from "@/utils/fetchBookmarks";
import { useQueryClient } from "@tanstack/react-query";
import { toggleBookmark } from "@/utils/toggleBookmark";

const tmbImageUrl = "https://image.tmdb.org/t/p/w500";
const tmbBackdropUrl = "https://image.tmdb.org/t/p/w1280";

export default function MovieDetailPage() {
  const movieIdParams = useParams();
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const { data: bookmarksData } = useQuery({
    queryKey: ["bookmarks-page"],
    queryFn: fetchBookmarks,
  });

  const bookmarkMovieIds = bookmarksData?.map((m) => {
    return m.movieId;
  });

  const movieId = Array.isArray(movieIdParams.id)
    ? movieIdParams.id[0]?.match(/^\d+/)?.[0]
    : movieIdParams.id?.match(/^\d+/)?.[0];

  const {
    data: movieDetailsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movie-detail", movieId],
    queryFn: () => fetchMovieDetails(movieId ? movieId : ""),
  });

  const isBookmarked = bookmarkMovieIds?.includes(Number(movieId)) ?? false;

  const handleAddToBookmark = async () => {
    try {
      await toggleBookmark(isBookmarked, Number(movieId));
      setError("");
      queryClient.invalidateQueries({ queryKey: ["bookmarks-page"] });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const releaseYear = movieDetailsData?.release_date
    ? new Date(movieDetailsData.release_date).getFullYear()
    : null;

  const releaseDate = movieDetailsData?.release_date
    ? new Date(movieDetailsData.release_date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      })
    : "";

  UseDocumentTitle(
    `${movieDetailsData?.title ?? ""} (${releaseYear !== null ? String(releaseYear) : ""})- The Movie Database(TMDB)`,
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !movieDetailsData) {
    return <p>Could not load this movie.</p>;
  }

  return (
    <SingleColumn>
      <div
        className={styles.backdrop}
        style={{
          backgroundImage: movieDetailsData?.backdrop_path
            ? `url(${tmbBackdropUrl}${movieDetailsData.backdrop_path})`
            : "none",
        }}
      >
        <div className={styles.backdropBackground}>
          <div className={styles.innerWrapper}>
            {movieDetailsData?.poster_path && (
              <Image
                src={`${tmbImageUrl}${movieDetailsData.poster_path}`}
                alt=""
                height={500}
                width={350}
              />
            )}
            <div>
              <h2>
                {movieDetailsData?.title} <span>({releaseYear})</span>
              </h2>
              <div className={styles.facts}>
                <time dateTime={movieDetailsData?.release_date}>
                  {releaseDate}
                </time>
                <span>
                  {movieDetailsData?.genres.map((g) => g.name).join(", ")}
                </span>
                <span>
                  {Math.floor((movieDetailsData?.runtime ?? 0) / 60)}h
                  {(movieDetailsData?.runtime ?? 0) % 60}m
                </span>
              </div>
              <UserScore score={movieDetailsData?.vote_average ?? 0} />
              <MovieActions
                addToListLabel={movieActionsLabels.addToList}
                addToFavoritesLabel={movieActionsLabels.addToFavorites}
                addToWatchlistLabel={movieActionsLabels.addToWatchlist}
                removeFromWatchlist={movieActionsLabels.removeFromWatchlist}
                playTrailerLabel={movieActionsLabels.playTrailer}
                handleAddToBookmark={handleAddToBookmark}
                isBookmarked={isBookmarked}
              />
              {error && <p className={styles.error}>{error}</p>}
              <MovieInfo
                tagline={movieDetailsData?.tagline ?? ""}
                overview={movieDetailsData?.overview ?? ""}
                overviewHeading={movieInfoLabels.overviewHeading}
              />
              <CrewGrid crewDetails={movieDetailsData?.credits.crew ?? []} />
            </div>
          </div>
        </div>
      </div>
    </SingleColumn>
  );
}
