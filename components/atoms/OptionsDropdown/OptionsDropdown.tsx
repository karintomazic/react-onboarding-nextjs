"use client";

import styles from "./OptionsDropdown.module.scss";
import { cardLabels } from "../../../data/labels";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
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
          <button
            className={styles.bookmarkAction}
            onClick={handleAddToBookmark}
          >
            <FontAwesomeIcon
              icon={faBookmark}
              className={styles.bookmarkIcon}
            />
            {isBookmarked ? "Remove from  bookmarks" : "Add to bookmarks"}
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
      className={styles.optionsDropdown}
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
