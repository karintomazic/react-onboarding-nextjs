"use client";

import styles from "./page.module.scss";
import { useSession } from "next-auth/react";
import Spinner from "@/components/atoms/Spinner/Spinner";
import { fetchBookmarks } from "@/utils/fetchBookmarks";
import { useQuery } from "@tanstack/react-query";
import BookmarkedMovieCard from "@/components/molecules/BookmarkedMovieCard/BookmarkedMovieCard";

export default function Bookmarks() {
  const session = useSession();

  const { data } = useQuery({
    queryKey: ["bookmarks-page"],
    queryFn: fetchBookmarks,
  });

  const isLoggedIn = session.status === "authenticated";
  const isNotLoggedIn = session.status === "unauthenticated";
  const loggedInLoading = session.status === "loading";

  let content;

  if (loggedInLoading) {
    content = <Spinner />;
  } else if (isLoggedIn) {
    if (!data) {
      return null;
    }

    content = (
      <>
        {data.map((b) => {
          return (
            <BookmarkedMovieCard key={b.id} movieId={b.movieId.toString()} />
          );
        })}
      </>
    );
  } else if (isNotLoggedIn) {
    content = <p>you are NOT logged in</p>;
  }

  return (
    <div className={styles.bookmarks}>
      <h2>My Bookmarks</h2>
      <div className={styles.bookmarksGrid}>{content}</div>
    </div>
  );
}
