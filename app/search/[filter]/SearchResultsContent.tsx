"use client";

import MovieCard from "@/components/atoms/MovieCard/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "../../../utils/formatDate";
import Pagination from "@/components/molecules/Pagination/Pagination";
import Spinner from "@/components/atoms/Spinner/Spinner";
import PersonCard from "@/components/atoms/PersonCard/PersonCard";
import { fetchSearchMoviesFromApi } from "@/utils/fetchSearchMovies";
import { searchResultsLabels } from "@/data/labels";
import { useSearchParams } from "next/navigation";

type SearchResultsContentParams = {
  query: string;
  page: number;
  filter: string;
};

export function SearchResultsContent({
  query,
  page,
  filter,
}: SearchResultsContentParams) {
  const searchParams = useSearchParams();

  function pageHref(targetPage: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", targetPage.toString());
    return `?${params.toString()}`;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["search-movies", page, filter, query],
    queryFn: () => fetchSearchMoviesFromApi(page, filter, query),
  });

  if (error) {
    return (
      <p>
        {error instanceof Error ? error.message : searchResultsLabels.error}
      </p>
    );
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (!data) {
    return <p>{searchResultsLabels.empty}</p>;
  }

  let contentData;

  if (data.kind === "person") {
    contentData = data.people.map((person) => (
      <PersonCard
        key={person.id}
        name={person.name}
        department={person.department}
        profileImg={person.profileImg}
        known_for={person.known_for}
      />
    ));
  } else if (data.kind === "simple") {
    contentData = data.items.map((item) => <p key={item.id}>{item.name}</p>);
  } else {
    contentData = data.movies.map((movie) => (
      <MovieCard
        key={movie.id}
        id={movie.id}
        imageUrl={movie.url}
        title={movie.title}
        date={movie.date ? formatDate(movie.date) : ""}
        content={movie.description}
      />
    ));
  }

  if (contentData.length === 0) {
    return <p>{searchResultsLabels.empty}</p>;
  }

  return (
    <>
      {contentData}
      <Pagination
        page={page}
        totalPages={data.totalPages}
        pageHref={pageHref}
      />
    </>
  );
}
