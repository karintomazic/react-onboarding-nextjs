"use client";

import SearchFilterLink from "@/components/atoms/SearchFilterLink/SearchFilterLink";
import { useSearchParams, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { searchFilters } from "@/data/filterList";
const tmbUrl = "https://api.themoviedb.org/3";

async function fetchAllCounts(query: string) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const results = await Promise.all(
    searchFilters.map(({ linkName }) =>
      fetch(
        `${tmbUrl}/search/${linkName}?api_key=${apiKey}&query=${query}&page=1`,
      )
        .then((r) => r.json() as Promise<{ total_results: number }>)
        .then((data) => ({ filter: linkName, count: data.total_results })),
    ),
  );

  return results;
}

export default function FilterLinks() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const { filter } = useParams();

  const filterQuery = useQuery({
    queryKey: ["filter-counts", query],
    queryFn: () => fetchAllCounts(query),
  });

  const totalCount = filterQuery.data;

  const filteLinks = searchFilters.map((links) => {
    const match = totalCount?.find((r) => r.filter === links.linkName);
    const count = match?.count ?? 0;

    return (
      <SearchFilterLink
        key={links.linkName}
        linkName={links.linkName}
        linkLabel={links.label}
        count={count}
        searchParams={searchParams.toString()}
        isActive={filter === links.linkName}
      />
    );
  });

  return filteLinks;
}
