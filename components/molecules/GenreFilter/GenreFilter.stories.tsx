import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import GenreFilterComponent from "./GenreFilter";
import { fn } from "storybook/test";

const meta = {
  title: "Component/molecules/GenreFilter",
  component: GenreFilterComponent,
} satisfies Meta<typeof GenreFilterComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Comedy" },
  { id: 3, name: "Drama" },
  { id: 4, name: "Horror" },
];

export const GenreFilter: Story = {
  args: {
    genre: genres,
    selectedGenres: [2],
    setSelectedGenres: fn(),
  },
};
