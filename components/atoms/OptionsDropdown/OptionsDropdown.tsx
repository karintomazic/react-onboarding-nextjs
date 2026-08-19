"use client";

import styles from "./OptionsDropdown.module.scss";
import { cardLabels } from "../../../data/labels";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Ref } from "react";

type CardProps = {
  dropdownPosition: { top: number; left: number };
  dropdownRef: Ref<HTMLDivElement>;
};

export default function OptionsDropdown({
  dropdownPosition,
  dropdownRef,
}: CardProps) {
  return (
    <div
      className={styles.optionsDropdown}
      ref={dropdownRef}
      style={{
        top: dropdownPosition.top,
        left: dropdownPosition.left,
      }}
    >
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
    </div>
  );
}
