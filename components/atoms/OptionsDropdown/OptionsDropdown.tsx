"use client";

import styles from "./OptionsDropdown.module.scss";
import { cardLabels } from "../../../data/labels";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faStar,
  faHeart,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Ref } from "react";
import { useSession } from "next-auth/react";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

type CardProps = {
  dropdownPosition: { top: number; left: number };
  dropdownRef: Ref<HTMLDivElement>;
  handleAddToBookmark: () => void;
  isBookmarked: boolean;
};

export default function OptionsDropdown({
  dropdownPosition,
  dropdownRef,
  handleAddToBookmark,
  isBookmarked,
}: CardProps) {
  const session = useSession();

  const isLoggedIn = session.status === "authenticated";

  let content;

  if (isLoggedIn) {
    content = (
      <>
        <div className={styles.optionsBlock}>
          <button className={styles.rowAction}>
            <FontAwesomeIcon
              icon={faList}
              className={`${styles.rowIcon} ${styles.list}`}
            />
            Add to list
          </button>
        </div>
        <div className={styles.optionsBlock}>
          <button className={styles.rowAction}>
            <FontAwesomeIcon
              icon={faHeart}
              className={`${styles.rowIcon} ${styles.favourite}`}
            />
            Favourite
          </button>
        </div>
        <div className={styles.optionsBlock}>
          <button className={styles.rowAction} onClick={handleAddToBookmark}>
            <FontAwesomeIcon
              icon={faBookmark}
              className={`${styles.rowIcon} ${styles.watchlist}`}
            />
            {isBookmarked ? "Bookmarks" : "Bookmarks"}
          </button>
        </div>
        <div className={styles.optionsBlock}>
          <button className={styles.rowAction}>
            <FontAwesomeIcon icon={faStar} className={styles.rowIcon} />
            Your rating
          </button>
        </div>
      </>
    );
  } else {
    content = (
      <>
        <div className={styles.optionsBlock}>
          <p className={styles.optionsPrompt}>{cardLabels.optionsPrompt}</p>
          <p className={styles.optionsAction}>
            <Link href="/login">
              {cardLabels.login} <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          </p>
        </div>
        <div className={styles.optionsBlock}>
          <p className={styles.optionsPrompt}>{cardLabels.notAMember}</p>
          <p className={styles.optionsAction ?? ""}>
            <Link href="/register">
              {cardLabels.signUp} <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          </p>
        </div>
      </>
    );
  }

  return (
    <div
      className={`${styles.optionsDropdown} ${isLoggedIn ? styles.small : ""}`}
      ref={dropdownRef}
      style={{
        top: dropdownPosition.top,
        left: dropdownPosition.left,
      }}
    >
      {content}
    </div>
  );
}
