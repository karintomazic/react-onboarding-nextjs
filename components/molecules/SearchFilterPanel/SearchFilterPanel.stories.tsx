import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SearchFilterPanelComponent from "./SearchFilterPanel";
import FilterLinks from "../FilterLinks/FilterLinks";

const meta = {
  title: "Component/molecules/SearchFilterPanel",
  component: SearchFilterPanelComponent,
} satisfies Meta<typeof SearchFilterPanelComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SearchFilterPanel: Story = {
  args: {
    children: (
      <FilterLinks
        totalCount={[
          { filter: "movie", count: 12 },
          { filter: "tv", count: 8 },
          { filter: "person", count: 3 },
        ]}
        filter="tv"
        getFilterHref={(linkName) => `/search/${linkName}?query=batman`}
      />
    ),
    heading: "Search Results",
  },
};
