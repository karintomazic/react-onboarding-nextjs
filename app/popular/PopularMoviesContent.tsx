"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";
import Card from "@/components/molecules/Card/Card";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import SortDropdown from "@/components/molecules/SortDropdown/SortDropdown";
import FilterPanel from "@/components/molecules/FilterPanel/FilterPanel";
import GenreFilter from "@/components/molecules/GenreFilter/GenreFilter";
import { DEFAULT_SORT } from "@/data/sortingOptions";
import { cardLabels, sortDropdownLabels } from "@/data/labels";
import { fetchPopularMoviesFromApi } from "@/utils/fetchPopularMovies";
import { fetchGenresFromApi } from "@/utils/fetchGenres";
import { popularMoviesPageLabels } from "@/data/labels";
import { useRouter } from "next/navigation";
import Spinner from "@/components/atoms/Spinner/Spinner";

type PopularMoviesContentProps = {
  genres: string;
  sort: string;
};

export default function PopularMoviesContent({
  genres,
  sort,
}: PopularMoviesContentProps) {
  const [sortToggle, setSortToggle] = useState(false);
  const [genreToggle, setGenreToggle] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedSort, setSelectedSort] = useState(DEFAULT_SORT);
  const [autoLoad, setAutoLoad] = useState(false);
  const moviesSentinel = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const applyFilters = () => {
    const url = new URL("/popular", window.location.origin);
    url.searchParams.set("genres", selectedGenres.join(","));
    url.searchParams.set("sort", selectedSort.value);
    router.push(`${url.pathname}${url.search}`);
    setAutoLoad(false);
  };

  const {
    data: movieData,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["popular-movies-page", sort, genres],
    queryFn: ({ pageParam }) =>
      fetchPopularMoviesFromApi(
        sort,
        genres ? genres.split(",").map(Number) : [],
        pageParam,
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      pages.length < lastPage.totalPages ? pages.length + 1 : undefined,
  });

  const movies = movieData ? movieData.pages.flatMap((p) => p.results) : [];

  const { data: genre } = useQuery({
    queryKey: ["genre-list"],
    queryFn: fetchGenresFromApi,
  });

  const handleSortToggle = () => {
    setSortToggle(!sortToggle);
  };

  const handleGenreToggle = () => {
    setGenreToggle(!genreToggle);
  };

  const onFirstLoadMoreClick = () => {
    void fetchNextPage();
    setAutoLoad(true);
  };

  useEffect(() => {
    if (!autoLoad) return;

    const loadMoreMovies = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetching) {
        void fetchNextPage();
      }
    };

    const moviesSentinelElement = moviesSentinel.current;
    if (!moviesSentinelElement) return;
    const moviesObserver = new IntersectionObserver(loadMoreMovies);
    moviesObserver.observe(moviesSentinelElement);

    return () => {
      moviesObserver.disconnect();
    };
  }, [autoLoad, hasNextPage, isFetching, fetchNextPage]);

  const hasChanges =
    sort !== selectedSort.value ||
    JSON.stringify(selectedGenres) !==
      JSON.stringify(genres ? genres.split(",").map(Number) : []);

  let content;
  let loadingContent;

  if (isLoading) {
    content = (
      <div className={styles.spinnerWrapper}>
        <Spinner />
      </div>
    );
  } else if (isError) {
    content = (
      <p className={styles.errorMessage}>
        {popularMoviesPageLabels.errorMessage}
      </p>
    );
  } else {
    content = movies.map((r) => (
      <Card
        key={r.id}
        id={r.id}
        image={r.url}
        title={r.title}
        date={r.date}
        variant="popular"
        optionsPromptLabel={cardLabels.optionsPrompt}
        loginLabel={cardLabels.login}
        notAMemberLabel={cardLabels.notAMember}
        signUpLabel={cardLabels.signUp}
      />
    ));
  }

  if (isFetchingNextPage) {
    loadingContent = <Spinner />;
  } else {
    if (autoLoad) {
      loadingContent = <div ref={moviesSentinel}></div>;
    } else {
      loadingContent = (
        <div>
          {hasNextPage && (
            <button className={styles.submitBtn} onClick={onFirstLoadMoreClick}>
              Load More
            </button>
          )}
        </div>
      );
    }
  }

  return (
    <div className={styles.popularWrapper}>
      <div className={styles.popularWrapperInner}>
        <div className={styles.filterWrapper}>
          <FilterPanel
            title={popularMoviesPageLabels.sortTitle}
            subtitle={popularMoviesPageLabels.sortSubtitle}
            toggleAction={handleSortToggle}
            toggle={sortToggle}
          >
            <SortDropdown
              sortBy={selectedSort}
              setSortBy={setSelectedSort}
              ariaLabel={sortDropdownLabels.ariaLabel}
            />
          </FilterPanel>
          <FilterPanel
            title={popularMoviesPageLabels.filtersTitle}
            subtitle={popularMoviesPageLabels.genresSubtitle}
            toggleAction={handleGenreToggle}
            toggle={genreToggle}
          >
            <GenreFilter
              genre={genre}
              selectedGenres={selectedGenres}
              setSelectedGenres={setSelectedGenres}
            />
          </FilterPanel>
          <button
            onClick={applyFilters}
            disabled={!hasChanges}
            className={styles.submitBtn}
          >
            {popularMoviesPageLabels.searchButton}
          </button>
        </div>

        <div className={styles.popularMoviesContent}>
          <div
            className={styles.moviesGrid}
            aria-live="polite"
            aria-label={popularMoviesPageLabels.resultsAriaLabel}
          >
            {content}
          </div>
          <div>{loadingContent}</div>
        </div>
      </div>
    </div>
  );
}
