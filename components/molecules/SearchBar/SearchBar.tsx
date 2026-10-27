import styles from "./SearchBar.module.scss";
import Icon from "../../atoms/Icon/Icon";
import Input from "../../atoms/Input/Input";
import {
  faMagnifyingGlass,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import type { SubmitEvent, ChangeEvent, KeyboardEvent } from "react";
import { useState, useRef, useEffect } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import SearchResults from "../SearchResults/SearchResults";
import type { RefObject } from "react";
import { searchBarLabels } from "@/data/labels";

type SearchBarProps = {
  query: string;
  placeholder: string;
  ariaLabel: string;
  onSubmit: () => void;
  topTenMovies: Array<{ title: string; id: number }>;
  onQueryChange: (value: string) => void;
  searchResults: Array<{ title: string; id: number }>;
  isSearching: boolean;
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  setIsInFocus: (arg: boolean) => void;
  loopRef: RefObject<HTMLDivElement | null>;
  onSelectMovie: (title: string) => void;
};

export default function SearchBar({
  placeholder,
  ariaLabel,
  query,
  onSubmit,
  onQueryChange,
  topTenMovies,
  searchResults,
  isSearching,
  isOpen,
  setIsOpen,
  setIsInFocus,
  loopRef,
  onSelectMovie,
}: SearchBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Pressing s (not while already typing) jumps focus into the search input
  useEffect(() => {
    const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
      const target = e.target as HTMLElement;

      // Don't hijack "s" if the user is already typing somewhere.
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (e.key === "s" && !isTyping && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [setIsOpen]);

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (query.trim() === "") {
      setIsOpen(false);
    } else {
      onSubmit();
      setIsOpen(false);
    }
  }

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsOpen(true);
    onQueryChange(e.target.value);
  };

  const handleBlur = () => {
    setIsInFocus(false);
  };

  const handleFocus = () => {
    setIsInFocus(true);
  };

  const currentList = (query === "" ? topTenMovies : searchResults).slice(
    0,
    10,
  );

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev + 1 < currentList.length ? prev + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev - 1 >= 0 ? prev - 1 : currentList.length - 1,
      );
    } else if (e.key === "Enter") {
      const movie = currentList[highlightedIndex];
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- highlightedIndex starts at -1, so pressing Enter before any arrow-key press makes this genuinely undefined at runtime
      if (movie) onSelectMovie(movie.title);
    }
  };

  const isClickedOutside = useClickOutside(containerRef, loopRef);

  const noResults = !isSearching && searchResults.length === 0 && query !== "";

  return (
    <div className={styles.searchBarWrapper} ref={containerRef}>
      <form
        className={styles.searchBar}
        role="search"
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
      >
        <Icon icon={faMagnifyingGlass} />
        <Input
          type="search"
          ariaLabel={ariaLabel}
          placeholder={placeholder}
          value={query}
          onClick={handleClick}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          ref={inputRef}
        />
      </form>

      {isOpen && !isClickedOutside && (
        <div className={styles.searchResultsDropdown}>
          {query === "" && (
            <div className={styles.trendingHeader}>
              <div className={styles.trendingHeaderInner}>
                <Icon icon={faArrowTrendUp} />
                <span>{searchBarLabels.trending}</span>
              </div>
            </div>
          )}

          {noResults ? (
            <div className={styles.empty}>
              <p>{searchBarLabels.noResults}</p>
            </div>
          ) : (
            <SearchResults
              movieList={currentList}
              handleSearch={onSelectMovie}
              highlightedIndex={highlightedIndex}
            />
          )}
        </div>
      )}
    </div>
  );
}
