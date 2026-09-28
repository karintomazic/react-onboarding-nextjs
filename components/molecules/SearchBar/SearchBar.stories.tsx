import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import SearchBar from "./SearchBar";
import { searchBarLabels } from "../../../data/labels";

const meta = {
  title: "Component/molecules/SearchBar",
  component: SearchBar,
  args: {
    placeholder: searchBarLabels.placeholder,
    ariaLabel: searchBarLabels.ariaLabel,
    onSubmit: fn(),
    onQueryChange: fn(),
    isOpen: true,
    setIsOpen: fn(),
    loopRef: { current: null },
    onSelectMovie: fn(),
  },
  play: async ({ canvas, userEvent }) => {
    const dropdownBtn = canvas.getByRole("searchbox", {
      name: /Search for a movie/i,
    });
    await userEvent.click(dropdownBtn);
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const topTenMovies = [
  { title: "Masters of the Universe", id: 454639 },
  { title: "Disclosure Day", id: 127 },
  { title: "Disclosure Day", id: 1275779 },
  { title: "The Odyssey", id: 1368337 },
  { title: "Elize: Shadows of a Woman", id: 1487861 },
];

const searchResults = [
  { title: "Lorem ipsum", id: 454639 },
  { title: "Disclosure Day", id: 127 },
  { title: "Disclosure Day", id: 1275779 },
  { title: "The Odyssey", id: 1368337 },
  { title: "Elize: Shadows of a Woman", id: 1487861 },
];

export const Default: Story = {
  args: {
    query: "",
    topTenMovies: topTenMovies,
    searchResults: searchResults,
    isSearching: false,
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <SearchBar
        {...args}
        onQueryChange={(value) => {
          args.onQueryChange(value);
          updateArgs({ query: value });
        }}
      />
    );
  },
};

export const SearchQuery: Story = {
  args: {
    query: "Lorem ipsum",
    topTenMovies: [],
    searchResults: searchResults,
    isSearching: false,
  },
};

export const IsSearching: Story = {
  args: {
    query: "Test",
    topTenMovies: [],
    searchResults: [],
    isSearching: true,
  },
};

export const NoResults: Story = {
  args: {
    query: "Test",
    topTenMovies: [],
    searchResults: [],
    isSearching: false,
  },
};
