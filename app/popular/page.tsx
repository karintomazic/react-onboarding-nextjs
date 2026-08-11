"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import SingleColumn from "@/components/templates/SingleColumn/SingleColumn";
import Card from "@/components/molecules/Card/Card";
import { useQuery } from "@tanstack/react-query";
import SortDropdown from "@/components/molecules/SortDropdown/SortDropdown";
import FilterPanel from "@/components/molecules/FilterPanel/FilterPanel";
import GenreFilter from "@/components/molecules/GenreFilter/GenreFilter";
import { DEFAULT_SORT } from "@/data/sortingOptions";
import { cardLabels, sortDropdownLabels } from "@/data/labels";
import { UseDocumentTitle } from "@/hooks/useDocumentTitle";
import { fetchPopularMovies } from "@/utils/fetchPopularMovies";
import { fetchGenres } from "@/utils/fetchGenres";
import { popularMoviesPageLabels } from "@/data/labels";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function PopularMovies() {
  UseDocumentTitle("Popular Movies Page - The Movie Database(TMDB)");

  const [sortToggle, setSortToggle] = useState(false);
  const [genreToggle, setGenreToggle] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedSort, setSelectedSort] = useState(DEFAULT_SORT);

  const router = useRouter();
  const searchParams = useSearchParams();
  const genres = searchParams.get("genres") ?? "";
  const sort = searchParams.get("sort") ?? DEFAULT_SORT.value;

  const applyFilters = () => {
    const url = new URL("/popular", window.location.origin);
    url.searchParams.set("genres", selectedGenres.join(","));
    url.searchParams.set("sort", selectedSort.value);
    void router.push(`${url.pathname}${url.search}`);
  };

  const { data: movieData } = useQuery({
    queryKey: ["popular-movies-page", sort, genres],
    queryFn: () =>
      fetchPopularMovies(sort, genres ? genres.split(",").map(Number) : []),
  });

  const { data: genre } = useQuery({
    queryKey: ["genre-list"],
    queryFn: fetchGenres,
  });

  const handleSortToggle = () => {
    setSortToggle(!sortToggle);
  };

  const handleGenreToggle = () => {
    setGenreToggle(!genreToggle);
  };

  const hasChanges =
    sort !== selectedSort.value ||
    JSON.stringify(selectedGenres) !==
      JSON.stringify(genres ? genres.split(",").map(Number) : []);

  const movies = movieData ? movieData : [];

  return (
    <SingleColumn>
      <div className={styles.container}>
        <h2>{popularMoviesPageLabels.heading}</h2>
        <div className={styles.popularWrapper}>
          <div className={styles.filterWrapper}>
            <FilterPanel
              title={"Sort"}
              subtitle={"Sort Results By"}
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
              title={"Filters"}
              subtitle={"Genres"}
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
          <div
            className={styles.moviesGrid}
            aria-live="polite"
            aria-label={popularMoviesPageLabels.resultsAriaLabel}
          >
            {movies.map((r) => {
              return (
                <Card
                  key={r.id}
                  id={r.id.toString()}
                  image={r.url}
                  title={r.title}
                  date={r.date}
                  variant="popular"
                  optionsPromptLabel={cardLabels.optionsPrompt}
                  loginLabel={cardLabels.login}
                  notAMemberLabel={cardLabels.notAMember}
                  signUpLabel={cardLabels.signUp}
                />
              );
            })}
          </div>
        </div>
      </div>
    </SingleColumn>
  );
}
