"use client";

import styles from "./NavigationBar.module.scss";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import MobileNav from "../MobileNav/MobileNav";
import DesktopNav from "../DesktopNav/DesktopNav";
import { useState, useRef } from "react";
// import { useNavigate } from "react-router";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
// import { useSearchParams, useLocation } from "react-router";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { useDebounce } from "../../../hooks/useDebounce";
import { fetchMovieList } from "../../../utils/fetchMovieList";
import {
  searchBarLabels,
  desktopNavLabels,
  mobileNavLabels,
} from "../../../data/labels";

const tmdbUrl = "https://api.themoviedb.org/3";
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function NavigationBar() {
  const searchParams = useSearchParams();
  // What is currently typed in the search box.
  const [query, setQuery] = useState(searchParams.get("query") ?? "");
  const location = usePathname();
  // Save the last pathname - so we can compare it when it changes.
  const [prevPathname, setPrevPathname] = useState(location);
  const [isOpen, setIsOpen] = useState(false);

  const loopRef = useRef<HTMLDivElement>(null);

  // Runs only right after navigating to a different page. Clears the
  // search box outside /search, or re-syncs it from the URL on /search.
  if (location !== prevPathname) {
    setPrevPathname(location);

    if (location.startsWith("/search")) {
      setQuery(searchParams.get("query") ?? "");
    } else {
      setQuery("");
    }
  }

  const trendingQuery = useQuery({
    queryKey: ["trending-results"],
    queryFn: () =>
      fetchMovieList(`${tmdbUrl}/trending/movie/day?api_key=${apiKey}`),
  });

  // Wait for typing to pause before actually searching, so we don't
  // fire a request on every keystroke.
  const debounceQuery = useDebounce(query, 400);

  const searchQuery = useQuery({
    queryKey: ["search-results", debounceQuery],
    queryFn: () =>
      fetchMovieList(
        `${tmdbUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(debounceQuery)}&page=1`,
      ),
    // skip the search when input is empty.
    enabled: debounceQuery !== "",
  });

  const movieTitles = trendingQuery.data;
  const searchResults = searchQuery.data;

  const router = useRouter();

  // Navigates to the search page with the current query in the URL.
  function handleSearchSubmit() {
    const url = new URL("/search/movie", window.location.origin);
    url.searchParams.set("query", query);
    void router.push(`${url.pathname}${url.search}`);
  }

  const handleLoopClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className={styles.navbarWrapper}>
        <DesktopNav
          homeAriaLabel={desktopNavLabels.homeAriaLabel}
          createAriaLabel={desktopNavLabels.createAriaLabel}
          loginLinkLabel={desktopNavLabels.loginLink}
          joinLinkLabel={desktopNavLabels.joinLink}
          handleLoopClick={handleLoopClick}
          loopRef={loopRef}
        />
        <MobileNav
          homeAriaLabel={mobileNavLabels.homeAriaLabel}
          openMenuAriaLabel={mobileNavLabels.openMenuAriaLabel}
        />
      </div>
      <SearchBar
        query={query}
        topTenMovies={movieTitles ?? []}
        searchResults={searchResults ?? []}
        onQueryChange={setQuery}
        onSubmit={handleSearchSubmit}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        loopRef={loopRef}
        // True while we're still waiting on a result — either the
        // debounce hasn't caught up yet, or the fetch is in flight.
        isSearching={searchQuery.isFetching || query !== debounceQuery}
        placeholder={searchBarLabels.placeholder}
        ariaLabel={searchBarLabels.ariaLabel}
      />
    </>
  );
}
