import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SearchResultsComponent from "./SearchResults";
import { fn } from "storybook/test";

const movieList = [
  { id: 1, title: "Interstellar" },
  { id: 2, title: "Inception" },
  { id: 3, title: "The Dark Knight" },
];

const meta = {
  title: "Component/molecules/SearchResults",
  component: SearchResultsComponent,
  args: {
    movieList,
    handleSearch: fn(),
    highlightedIndex: -1,
    id: "search",
  },
} satisfies Meta<typeof SearchResultsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHighlightedItem: Story = {
  args: {
    highlightedIndex: 1,
  },
};

export const Empty: Story = {
  args: {
    movieList: [],
  },
};
