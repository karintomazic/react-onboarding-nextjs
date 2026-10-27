import styles from "./BookmarkedMovieCard.module.scss";
import { useQuery } from "@tanstack/react-query";
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
import { bookmarkedMovieCardLabels } from "@/data/labels";
import { useToggleBookmark } from "@/hooks/useToggleBookmarks";

export default function BookmarkedMovieCard({ movieId }: { movieId: number }) {
  const { isBookmarked, handleAddToBookmark } = useToggleBookmark({ movieId });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["bookmarks-cards", movieId],
    queryFn: () => fetchMovieDetails(movieId),
  });

  if (isLoading) {
    return <Spinner variant="smallSpinner" />;
  }

  if (isError || !data) {
    return <p>{bookmarkedMovieCardLabels.loadError}</p>;
  }

  if (!isBookmarked) {
    return null;
  }

  return (
    <div className={styles.bookmarksGrid}>
      <MovieCard
        id={data.id}
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
          {bookmarkedMovieCardLabels.rateIt}
        </button>
        <button className={styles.actionButton}>
          <span className={`${styles.actionIcon} ${styles.favourite}`}>
            <FontAwesomeIcon icon={faHeart} />
          </span>
          {bookmarkedMovieCardLabels.favourite}
        </button>
        <button className={styles.actionButton}>
          <span className={`${styles.actionIcon} ${styles.list}`}>
            <FontAwesomeIcon icon={faList} />
          </span>
          {bookmarkedMovieCardLabels.addToList}
        </button>
        <button className={styles.actionButton} onClick={handleAddToBookmark}>
          <span className={`${styles.actionIcon} ${styles.remove}`}>
            <FontAwesomeIcon icon={faXmark} />
          </span>
          {bookmarkedMovieCardLabels.remove}
        </button>
      </div>
    </div>
  );
}
