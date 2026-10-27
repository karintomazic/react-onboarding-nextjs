"use client";

import { useQuery } from "@tanstack/react-query";
import styles from "./page.module.scss";
import SingleColumn from "@/components/templates/SingleColumn/SingleColumn";
import UserScore from "@/components/molecules/UserScore/UserScore";
import MovieActions from "@/components/molecules/MovieActions/MovieActions";
import MovieInfo from "@/components/molecules/MovieInfo/MovieInfo";
import CrewGrid from "@/components/molecules/CrewGrid/CrewGrid";
import {
  movieInfoLabels,
  movieActionsLabels,
  bookmarkedMovieCardLabels,
  movieDetailsLabels,
} from "../../../data/labels";
import { fetchMovieDetails } from "@/utils/fetchMovieDetails";
import Spinner from "@/components/atoms/Spinner/Spinner";
import Image from "next/image";
import { useToggleBookmark } from "@/hooks/useToggleBookmarks";

const tmbImageUrl = "https://image.tmdb.org/t/p/w500";
const tmbBackdropUrl = "https://image.tmdb.org/t/p/w1280";

type MovieDetailsContentProps = {
  movieId: number;
};

export default function MovieDetailsContent({
  movieId,
}: MovieDetailsContentProps) {
  const { isBookmarked, handleAddToBookmark } = useToggleBookmark({ movieId });

  const {
    data: movieDetailsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movie-detail", movieId],
    queryFn: () => fetchMovieDetails(movieId),
  });

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

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !movieDetailsData) {
    return <p>{bookmarkedMovieCardLabels.loadError}</p>;
  }
  return (
    <SingleColumn>
      <div
        className={styles.backdrop}
        style={{
          backgroundImage: movieDetailsData.backdrop_path
            ? `url(${tmbBackdropUrl}${movieDetailsData.backdrop_path})`
            : "none",
        }}
      >
        <div className={styles.backdropBackground}>
          <div className={styles.innerWrapper}>
            {movieDetailsData.poster_path && (
              <Image
                src={`${tmbImageUrl}${movieDetailsData.poster_path}`}
                alt={`${movieDetailsData.title} ${movieDetailsLabels.posterAltSuffix}`}
                height={500}
                width={350}
              />
            )}
            <div>
              <h2>
                {movieDetailsData.title} <span>({releaseYear})</span>
              </h2>
              <div className={styles.facts}>
                <time dateTime={movieDetailsData.release_date}>
                  {releaseDate}
                </time>
                <span>
                  {movieDetailsData.genres.map((g) => g.name).join(", ")}
                </span>
                <span>
                  {Math.floor(movieDetailsData.runtime / 60)}h
                  {movieDetailsData.runtime % 60}m
                </span>
              </div>
              <UserScore score={movieDetailsData.vote_average} />
              <MovieActions
                addToListLabel={movieActionsLabels.addToList}
                addToFavoritesLabel={movieActionsLabels.addToFavorites}
                addToWatchlistLabel={movieActionsLabels.addToWatchlist}
                removeFromWatchlist={movieActionsLabels.removeFromWatchlist}
                playTrailerLabel={movieActionsLabels.playTrailer}
                handleAddToBookmark={handleAddToBookmark}
                isBookmarked={isBookmarked}
              />
              <MovieInfo
                tagline={movieDetailsData.tagline}
                overview={movieDetailsData.overview}
                overviewHeading={movieInfoLabels.overviewHeading}
              />
              <CrewGrid crewDetails={movieDetailsData.credits.crew} />
            </div>
          </div>
        </div>
      </div>
    </SingleColumn>
  );
}
