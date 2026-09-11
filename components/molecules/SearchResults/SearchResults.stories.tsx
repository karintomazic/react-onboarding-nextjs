import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SearchResultsComponent from "./SearchResults";
import { fn } from "storybook/test";

const meta = {
  title: "Component/molecules/SearchResults",
  component: SearchResultsComponent,
} satisfies Meta<typeof SearchResultsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const movieList = [
  { id: 1, title: "Interstellar" },
  { id: 2, title: "Inception" },
  { id: 3, title: "The Dark Knight" },
];

export const Default: Story = {
  args: {
    movieList,
    handleSearch: fn(),
    highlightedIndex: -1,
  },
};

export const WithHighlightedItem: Story = {
  args: {
    movieList,
    handleSearch: fn(),
    highlightedIndex: 1,
  },
};

export const Empty: Story = {
  args: {
    movieList: [],
    handleSearch: fn(),
    highlightedIndex: -1,
  },
};
