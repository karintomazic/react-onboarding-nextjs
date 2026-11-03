import styles from "./SearchResults.module.scss";
import Icon from "../../atoms/Icon/Icon";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { searchResultsLabels } from "@/data/labels";

type SearchResultsProps = {
  movieList: Array<{ id: number; title: string }>;
  handleSearch: (title: string) => void;
  highlightedIndex: number;
  id: string;
};

export default function SearchResults({
  movieList,
  handleSearch,
  highlightedIndex,
  id,
}: SearchResultsProps) {
  return (
    <ul
      className={styles.dropdownList}
      role="listbox"
      aria-label={searchResultsLabels.suggestions}
      id={`${id}-listbox`}
    >
      {movieList.map((m, index) => (
        <li
          key={m.id}
          onClick={() => {
            handleSearch(m.title);
          }}
          role="option"
          aria-selected={index === highlightedIndex}
          className={index === highlightedIndex ? styles.highlighted : ""}
          id={`${id}-option-${index}`}
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
