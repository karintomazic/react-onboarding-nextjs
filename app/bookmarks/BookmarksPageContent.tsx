"use client";

import styles from "./page.module.scss";
import BookmarkedMovieCard from "@/components/molecules/BookmarkedMovieCard/BookmarkedMovieCard";
import SingleColumn from "@/components/templates/SingleColumn/SingleColumn";
import Spinner from "@/components/atoms/Spinner/Spinner";
import { fetchBookmarksFromApi } from "@/utils/fetchBookmarks";
import { useQuery } from "@tanstack/react-query";
import { bookmarksLabel } from "@/data/labels";
import Link from "next/link";

export default function BookmarksPageContent() {
  const { data } = useQuery({
    queryKey: ["bookmarks-page"],
    queryFn: fetchBookmarksFromApi,
  });

  let content;

  if (!data) {
    content = <Spinner />;
  } else if (data.length === 0) {
    content = (
      <div className={styles.emptyState}>
        <p>{bookmarksLabel.emptyMessage}</p>
        <Link href="/popular" className={styles.browseLink}>
          {bookmarksLabel.browseLink}
        </Link>
      </div>
    );
  } else {
    content = (
      <>
        {data.map((b) => {
          return <BookmarkedMovieCard key={b.id} movieId={b.movieId} />;
        })}
      </>
    );
  }

  return (
    <SingleColumn>
      <div className={styles.bookmarks}>
        <h2>{bookmarksLabel.myBookmarks}</h2>
        <div className={styles.bookmarksGrid}>{content}</div>
      </div>
    </SingleColumn>
  );
}
