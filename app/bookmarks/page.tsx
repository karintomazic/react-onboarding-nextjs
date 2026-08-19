"use client";

import { useSession } from "next-auth/react";
import Spinner from "@/components/atoms/Spinner/Spinner";
import { fetchBookmarks } from "@/utils/fetchBookmarks";
import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchMovieDetails } from "@/utils/fetchMovieDetails";
import MovieCard from "@/components/atoms/MovieCard/MovieCard";
const tmbImageUrl = "https://image.tmdb.org/t/p/w500";

export default function Bookmarks() {
  const session = useSession();

  const { data } = useQuery({
    queryKey: ["bookmarks-page"],
    queryFn: fetchBookmarks,
  });

  // console.log(data);

  const ids = data?.map((i) => {
    return i.movieId;
  });

  // console.log(ids);

  const movieQueries = useQueries({
    queries: (ids ?? []).map((id) => ({
      queryKey: ["bookmark-movie-details", id],
      queryFn: () => fetchMovieDetails(id.toString()),
    })),
  });

  // console.log(movieQueries[0]?.data);

  const bookmarksDets = movieQueries.map((b) => {
    return b.data;
  });

  console.log(bookmarksDets);

  // const id = "634649";

  // const movieDetails = useQuery({
  //   queryKey: ["bookmark-movie-details", id],
  //   queryFn: () => fetchMovieDetails(id ? id : ""),
  // });

  // console.log(movieDetails.data);

  const isLoggedIn = session.status === "authenticated";
  const isNotLoggedIn = session.status === "unauthenticated";
  const loggedInLoading = session.status === "loading";

  let content;

  if (loggedInLoading) {
    content = <Spinner />;
  } else if (isLoggedIn) {
    content = (
      <>
        <p>you are logged in</p>

        <p>title:</p>

        {bookmarksDets.map((b) => {
          if (b) {
            console.log(b.title);
            console.log(b.id);
            console.log(typeof b.id);

            return (
              <MovieCard
                key={b?.id}
                id={String(b.id)}
                imageUrl={`${tmbImageUrl}${b.poster_path}`}
                title={b.title}
                date={b.release_date}
                content={b.overview}
              ></MovieCard>
            );
          }
        })}
      </>
    );
  } else if (isNotLoggedIn) {
    content = <p>you are NOT logged in</p>;
  }

  return <>{content}</>;
}
