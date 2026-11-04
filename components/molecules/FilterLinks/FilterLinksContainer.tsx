"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCountsFromApi } from "@/utils/fetchFilterLinks";
import FilterLinks from "./FilterLinks";

type FilterLinksContainerParams = {
  activeFilter: string;
};

export default function FilterLinksContainer({
  activeFilter,
}: FilterLinksContainerParams) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const filterQuery = useQuery({
    queryKey: ["filter-counts", query],
    queryFn: () => fetchAllCountsFromApi(query),
  });

  const totalCount = filterQuery.data;

  function getFilterHref(linkName: string) {
    return `/search/${linkName}?query=${encodeURIComponent(query)}`;
  }

  return (
    <FilterLinks
      totalCount={totalCount}
      filter={activeFilter}
      getFilterHref={getFilterHref}
    />
  );
}
