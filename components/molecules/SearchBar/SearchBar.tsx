"use client";

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
import { useRouter } from "next/navigation";
import SearchResults from "../SearchResults/SearchResults";
import type { RefObject } from "react";

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
  loopRef: RefObject<HTMLDivElement | null>;
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
  loopRef,
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
    onSubmit();
  }

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsOpen(true);
    onQueryChange(e.target.value);
  };

  const currentList = query === "" ? topTenMovies : searchResults;

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
      if (movie) handleSearchTitle(movie.title);
    }
  };

  // const navigate = useNavigate(); - instead of useNavigate - useRouter and then .push
  const router = useRouter();

  const handleSearchTitle = (movTitle: string) => {
    const url = new URL("/search/movie", window.location.origin);
    url.searchParams.set("query", movTitle);
    void router.push(`${url.pathname}${url.search}`);
    setIsOpen(false);
    onQueryChange(movTitle);
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
          ref={inputRef}
        />
      </form>

      {isOpen && !isClickedOutside && (
        <div className={styles.searchResultsDropdown}>
          {query === "" && (
            <div className={styles.trendingHeader}>
              <div className={styles.trendingHeaderInner}>
                <Icon icon={faArrowTrendUp} />
                <span>Trending</span>
              </div>
            </div>
          )}

          {noResults ? (
            <div className={styles.empty}>
              <p>No results</p>
            </div>
          ) : (
            <SearchResults
              movieList={query === "" ? topTenMovies : searchResults}
              handleSearch={handleSearchTitle}
              highlightedIndex={highlightedIndex}
            />
          )}
        </div>
      )}
    </div>
  );
}
