"use client";

import styles from "./SearchResults.module.scss";
import Icon from "../../atoms/Icon/Icon";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

type SearchResultsProps = {
  movieList: Array<{ id: number; title: string }>;
  handleSearch: (title: string) => void;
  highlightedIndex: number;
};

export default function SearchResults({
  movieList,
  handleSearch,
  highlightedIndex,
}: SearchResultsProps) {
  return (
    <ul className={styles.dropdownList}>
      {movieList.map((m, index) => (
        <li
          key={m.id}
          onClick={() => {
            handleSearch(m.title);
          }}
          role="option"
          aria-selected={index === highlightedIndex}
          tabIndex={-1}
          className={index === highlightedIndex ? styles.highlighted : ""}
        >
          <div className={styles.rowInner}>
            <Icon icon={faMagnifyingGlass} />
            <span>{m.title}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
