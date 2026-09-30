"use client";

import { useSearchParams, useParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllCounts } from "@/utils/fetchFilterLinks";
import FilterLinks from "./FilterLinks";

export default function FilterLinksContainer() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const { filter } = useParams();

  const queryClient = useQueryClient();

  const activeFilter = Array.isArray(filter) ? filter[0] : filter;

  const filterQuery = useQuery({
    queryKey: ["filter-counts", query],
    queryFn: async () => {
      const data = await fetchAllCounts(query);

      data.forEach((item) => {
        queryClient.setQueryData(
          ["search-movies", 1, item.filter, query],
          item.result,
        );
      });

      return data;
    },
  });

  const totalCount = filterQuery.data;

  function getFilterHref(linkName: string) {
    return `/search/${linkName}?${searchParams.toString()}`;
  }

  return (
    <FilterLinks
      totalCount={totalCount}
      filter={activeFilter}
      getFilterHref={getFilterHref}
    />
  );
}
