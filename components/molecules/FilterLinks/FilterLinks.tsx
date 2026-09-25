import SearchFilterLink from "@/components/atoms/SearchFilterLink/SearchFilterLink";
import { searchFilters } from "@/data/filterList";

type FilterLinksProps = {
  totalCount: Array<{ count: number; filter: string }> | undefined;
  searchParams: string;
  filter: string | undefined;
};

export default function FilterLinks({
  totalCount,
  searchParams,
  filter,
}: FilterLinksProps) {
  const filteLinks = searchFilters.map((links) => {
    const match = totalCount?.find((r) => r.filter === links.linkName);
    const count = match?.count ?? 0;

    return (
      <SearchFilterLink
        key={links.linkName}
        linkName={links.linkName}
        linkLabel={links.label}
        count={count}
        searchParams={searchParams}
        isActive={filter === links.linkName}
      />
    );
  });

  return filteLinks;
}
