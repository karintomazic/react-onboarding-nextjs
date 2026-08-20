import styles from "./MovieActions.module.scss";
import IconButton from "../../atoms/IconButton/IconButton";
import {
  faList,
  faHeart,
  faBookmark,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type MovieActionsProps = {
  addToListLabel: string;
  addToFavoritesLabel: string;
  addToWatchlistLabel: string;
  playTrailerLabel: string;
  handleAddToBookmark: () => void;
  isBookmarked: boolean;
};

export default function MovieActions({
  addToListLabel,
  addToFavoritesLabel,
  addToWatchlistLabel,
  playTrailerLabel,
  handleAddToBookmark,
  isBookmarked,
}: MovieActionsProps) {
  return (
    <div className={styles.actions}>
      <IconButton icon={faList} label={addToListLabel} />
      <IconButton icon={faHeart} label={addToFavoritesLabel} />
      <IconButton
        icon={faBookmark}
        label={addToWatchlistLabel}
        onclick={handleAddToBookmark}
        isActive={isBookmarked}
      />
      <button className={styles.trailerButton}>
        <FontAwesomeIcon icon={faPlay} /> {playTrailerLabel}
      </button>
    </div>
  );
}
