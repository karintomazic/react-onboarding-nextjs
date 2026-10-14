"use client";

import styles from "./page.module.scss";
import SingleColumn from "@/components/templates/SingleColumn/SingleColumn";
import UserScore from "@/components/molecules/UserScore/UserScore";
import MovieActions from "@/components/molecules/MovieActions/MovieActions";
import MovieInfo from "@/components/molecules/MovieInfo/MovieInfo";
import CrewGrid from "@/components/molecules/CrewGrid/CrewGrid";
import Spinner from "@/components/atoms/Spinner/Spinner";
import MovieFacts from "@/components/atoms/MovieFacts/MovieFacts";
import {
  movieInfoLabels,
  movieActionsLabels,
  bookmarkedMovieCardLabels,
  movieDetailsLabels,
} from "../../../data/labels";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetailsFromApi } from "@/utils/fetchMovieDetails";
import Image from "next/image";
import { useToggleBookmark } from "@/hooks/useToggleBookmarks";
import { getTmdbImageUrl, getTmdbBackdropUrl } from "@/utils/tmdbImage";

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
    queryFn: () => fetchMovieDetailsFromApi(movieId),
  });

  const releaseYear = movieDetailsData?.release_date
    ? new Date(movieDetailsData.release_date).getFullYear()
    : null;

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
            ? `url(${getTmdbBackdropUrl(movieDetailsData.backdrop_path)})`
            : "none",
        }}
      >
        <div className={styles.backdropBackground}>
          <div className={styles.innerWrapper}>
            {movieDetailsData.poster_path && (
              <Image
                src={getTmdbImageUrl(movieDetailsData.poster_path)}
                alt={`${movieDetailsData.title} ${movieDetailsLabels.posterAltSuffix}`}
                height={500}
                width={350}
                loading="eager"
              />
            )}
            <div>
              <h2>
                {movieDetailsData.title} <span>({releaseYear})</span>
              </h2>

              <MovieFacts
                releaseDate={movieDetailsData.release_date}
                genres={movieDetailsData.genres}
                runtime={movieDetailsData.runtime}
              />
              <UserScore score={movieDetailsData.vote_average} />
              <MovieActions
                addToListLabel={movieActionsLabels.addToList}
                addToFavoritesLabel={movieActionsLabels.addToFavorites}
                addToWatchlistLabel={movieActionsLabels.addToWatchlist}
                removeFromWatchlist={movieActionsLabels.removeFromWatchlist}
                playTrailerLabel={movieActionsLabels.playTrailer}
                // no-misused-promises - fire the function and move on - we dont need to await for it to resolve. because useToggleBookmarks
                // is already a async with try/catch that handles errors. if toggleBookmark fails - handleAddToBookmark catches it and shows the banner
                // () => void handleAddToBookmark() creates a brand new different function - satisfies the prop type
                handleAddToBookmark={() => void handleAddToBookmark()}
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
