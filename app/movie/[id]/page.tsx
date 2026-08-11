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

const tmbImageUrl = "https://image.tmdb.org/t/p/w500";
const tmbBackdropUrl = "https://image.tmdb.org/t/p/w1280";

export default function MovieDetailPage() {
  const movieId = useParams();
  const movieIdTransformed = Array.isArray(movieId.id)
    ? movieId.id[0]
    : movieId.id;

  const movieDetailQuery = useQuery({
    queryKey: ["movie-detail", movieIdTransformed],
    queryFn: () =>
      fetchMovieDetails(movieIdTransformed ? movieIdTransformed : ""),
  });

  const movieDetails = movieDetailQuery.data;
  const movieDetailsLoading = movieDetailQuery.isLoading;

  const releaseYear = movieDetails?.release_date
    ? new Date(movieDetails.release_date).getFullYear()
    : null;

  const releaseDate = movieDetails?.release_date
    ? new Date(movieDetails.release_date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      })
    : "";

  UseDocumentTitle(
    `${movieDetails?.title ?? ""} (${releaseYear !== null ? String(releaseYear) : ""})- The Movie Database(TMDB)`,
  );

  if (movieDetailsLoading) {
    return <Spinner />;
  }

  return (
    <SingleColumn>
      <div
        className={styles.backdrop}
        style={{
          backgroundImage: movieDetails?.backdrop_path
            ? `url(${tmbBackdropUrl}${movieDetails.backdrop_path})`
            : "none",
        }}
      >
        <div className={styles.backdropBackground}>
          <div className={styles.innerWrapper}>
            <div>
              {movieDetails?.poster_path && (
                <Image
                  src={`${tmbImageUrl}${movieDetails.poster_path}`}
                  alt=""
                  height={150}
                  width={150}
                />
              )}
            </div>
            <div>
              <h2>
                {movieDetails?.title} <span>({releaseYear})</span>
              </h2>
              <div className={styles.facts}>
                <time dateTime={movieDetails?.release_date}>{releaseDate}</time>
                <span>
                  {movieDetails?.genres.map((g) => g.name).join(", ")}
                </span>
                <span>
                  {Math.floor((movieDetails?.runtime ?? 0) / 60)}h
                  {(movieDetails?.runtime ?? 0) % 60}m
                </span>
              </div>
              <UserScore score={movieDetails?.vote_average ?? 0} />
              <MovieActions
                addToListLabel={movieActionsLabels.addToList}
                addToFavoritesLabel={movieActionsLabels.addToFavorites}
                addToWatchlistLabel={movieActionsLabels.addToWatchlist}
                playTrailerLabel={movieActionsLabels.playTrailer}
              />
              <MovieInfo
                tagline={movieDetails?.tagline ?? ""}
                overview={movieDetails?.overview ?? ""}
                overviewHeading={movieInfoLabels.overviewHeading}
              />
              <CrewGrid crewDetails={movieDetails?.credits.crew ?? []} />
            </div>
          </div>
        </div>
      </div>
    </SingleColumn>
  );
}
