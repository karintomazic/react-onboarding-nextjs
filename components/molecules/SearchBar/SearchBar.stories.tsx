import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import SearchBar from "./SearchBar";
import { searchBarLabels } from "../../../data/labels";

const meta = {
  title: "Component/molecules/SearchBar",
  component: SearchBar,
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
    placeholder: searchBarLabels.placeholder,
    ariaLabel: searchBarLabels.ariaLabel,
    onSubmit: fn(),
    topTenMovies: topTenMovies,
    onQueryChange: fn(),
    searchResults: searchResults,
    isSearching: false,
    isOpen: true,
    setIsOpen: fn(),
    loopRef: { current: null },
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
  play: async ({ canvas, userEvent }) => {
    const dropdownBtn = canvas.getByRole("searchbox", {
      name: /Search for a movie/i,
    });
    await userEvent.click(dropdownBtn);
  },
};

export const SearchQuery: Story = {
  args: {
    query: "Lorem ipsum",
    placeholder: searchBarLabels.placeholder,
    ariaLabel: searchBarLabels.ariaLabel,
    onSubmit: fn(),
    topTenMovies: [],
    onQueryChange: fn(),
    searchResults: searchResults,
    isSearching: false,
    isOpen: true,
    setIsOpen: fn(),
    loopRef: { current: null },
  },
  play: async ({ canvas, userEvent }) => {
    const dropdownBtn = canvas.getByRole("searchbox", {
      name: /Search for a movie/i,
    });
    await userEvent.click(dropdownBtn);
  },
};

export const IsSearching: Story = {
  args: {
    query: "Test",
    placeholder: searchBarLabels.placeholder,
    ariaLabel: searchBarLabels.ariaLabel,
    onSubmit: fn(),
    topTenMovies: [],
    onQueryChange: fn(),
    searchResults: [],
    isSearching: true,
    isOpen: true,
    setIsOpen: fn(),
    loopRef: { current: null },
  },
  play: async ({ canvas, userEvent }) => {
    const dropdownBtn = canvas.getByRole("searchbox", {
      name: /Search for a movie/i,
    });
    await userEvent.click(dropdownBtn);
  },
};

export const NoResults: Story = {
  args: {
    query: "Test",
    placeholder: searchBarLabels.placeholder,
    ariaLabel: searchBarLabels.ariaLabel,
    onSubmit: fn(),
    topTenMovies: [],
    onQueryChange: fn(),
    searchResults: [],
    isSearching: false,
    isOpen: true,
    setIsOpen: fn(),
    loopRef: { current: null },
  },
  play: async ({ canvas, userEvent }) => {
    const dropdownBtn = canvas.getByRole("searchbox", {
      name: /Search for a movie/i,
    });
    await userEvent.click(dropdownBtn);
  },
};
