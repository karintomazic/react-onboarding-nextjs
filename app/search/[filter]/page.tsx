"use client";

import styles from "./page.module.scss";
import MovieCard from "@/components/atoms/MovieCard/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { formatDate } from "../../../utils/formatDate";
import Pagination from "@/components/molecules/Pagination/Pagination";
import Spinner from "@/components/atoms/Spinner/Spinner";
import PersonCard from "@/components/atoms/PersonCard/PersonCard";
import { UseDocumentTitle } from "@/hooks/useDocumentTitle";
import { fetchSearchMovies } from "@/utils/fetchSearchMovies";
import { searchResultsLabels } from "@/data/labels";

export default function SearchResults() {
  const { filter } = useParams();
  const filterTransformed = Array.isArray(filter) ? filter[0] : filter;

  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const page = Number(searchParams.get("page") ?? "1");
  UseDocumentTitle(`${query} - The Movie Database(TMDB)`);

  const { data, isLoading, error } = useQuery({
    queryKey: ["search-movies", page, filterTransformed, query],
    queryFn: () => fetchSearchMovies(page, filterTransformed ?? "tv", query),
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
        id={String(movie.id)}
        imageUrl={movie.url}
        title={movie.title}
        date={movie.date ? formatDate(movie.date) : ""}
        content={movie.description}
      />
    ));
  }

  if (contentData.length == 0) {
    return <p>{searchResultsLabels.empty}</p>;
  }

  return (
    <div className={styles.movieCards}>
      {contentData}
      <Pagination page={page} totalPages={data.totalPages} />
    </div>
  );
}
