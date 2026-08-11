import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SearchFilterPanelComponent from "./SearchFilterPanel";
import SearchFilterLink from "../../atoms/SearchFilterLink/SearchFilterLink";

const meta = {
  title: "Component/molecules/SearchFilterPanel",
  component: SearchFilterPanelComponent,
} satisfies Meta<typeof SearchFilterPanelComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SearchFilterPanel: Story = {
  args: {
    children: (
      <>
        <SearchFilterLink
          linkName="movie"
          linkLabel="Movies"
          count={12}
          searchParams=""
          isActive={false}
        />
        <SearchFilterLink
          linkName="tv"
          linkLabel="TV Shows"
          count={8}
          searchParams=""
          isActive={true}
        />
        <SearchFilterLink
          linkName="person"
          linkLabel="People"
          count={3}
          searchParams=""
          isActive={false}
        />
      </>
    ),
    heading: "Search Results",
  },
};
