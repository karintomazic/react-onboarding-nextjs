"use client";

import styles from "./SortDropdown.module.scss";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Icon from "../../atoms/Icon/Icon";
import { useState, useRef } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { sortOptions } from "../../../data/sortingOptions";

type SortOption = {
  value: string;
  label: string;
};

type SortDropdownProps = {
  sortBy: SortOption;
  setSortBy: (option: SortOption) => void;
  ariaLabel: string;
};

export default function SortDropdown({
  sortBy,
  setSortBy,
  ariaLabel,
}: SortDropdownProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const isClickedOutsideSort = useClickOutside(sortRef);

  const handleSortOpen = () => {
    const isCurrentlyOpen = isSortOpen && !isClickedOutsideSort;
    setIsSortOpen(!isCurrentlyOpen);
  };

  return (
    <div className={styles.sortWrapper} ref={sortRef}>
      <button
        type="button"
        onClick={handleSortOpen}
        className={styles.sortBtn}
        aria-expanded={isSortOpen}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
      >
        {sortBy.label}
        <Icon icon={faCaretDown} />
      </button>

      {isSortOpen && !isClickedOutsideSort && (
        <ul className={styles.sortList} role="listbox" aria-label={ariaLabel}>
          {sortOptions.map((option) => (
            <li
              key={option.value}
              role="option"
              tabIndex={0}
              aria-selected={option.value === sortBy.value}
              className={option.value === sortBy.value ? styles.active : ""}
              onMouseDown={(e) => {
                e.stopPropagation();
                setSortBy(option);
                setIsSortOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
