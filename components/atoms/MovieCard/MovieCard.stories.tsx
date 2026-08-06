import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import placeholderPoster from "../../../assets/placeholder-poster.jpg";
import MovieCard from "./MovieCard";

const meta = {
  title: "Component/atoms/MovieCard",
  component: MovieCard,
} satisfies Meta<typeof MovieCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "1007757",
    imageUrl: placeholderPoster,
    title: "Swapped",
    date: "2026-05-13",
    content:
      "A small woodland creature and a majestic bird magically trade places.",
  },
};

export const NoPoster: Story = {
  args: {
    id: "1007757",
    imageUrl: "",
    title: "Swapped",
    date: "2026-05-13",
    content:
      "A small woodland creature and a majestic bird magically trade places.",
  },
};

export const Loading: Story = {
  args: {
    id: "1007757",
    imageUrl: "",
    title: "",
    date: "",
    content: "",
  },
};
