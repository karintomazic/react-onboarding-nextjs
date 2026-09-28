import SearchFilterLink from "@/components/atoms/SearchFilterLink/SearchFilterLink";
import { searchFilters } from "@/data/filterList";

type FilterLinksProps = {
  totalCount: Array<{ count: number; filter: string }> | undefined;
  filter: string | undefined;
  getFilterHref: (linkName: string) => string;
};

export default function FilterLinks({
  totalCount,
  filter,
  getFilterHref,
}: FilterLinksProps) {
  const filterLinks = searchFilters.map((links) => {
    const match = totalCount?.find((r) => r.filter === links.linkName);
    const count = match?.count ?? 0;

    return (
      <SearchFilterLink
        key={links.linkName}

        linkLabel={links.label}
        count={count}

        isActive={filter === links.linkName}
        href={getFilterHref(links.linkName)}
      />
    );
  });

  return filterLinks;
}
