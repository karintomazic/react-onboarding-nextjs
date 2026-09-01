import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import placeholderPoster from "../../../assets/placeholder-poster.jpg";
import MovieCard from "./MovieCard";

const meta = {
  title: "Component/atoms/MovieCard",
  component: MovieCard,
  args: {
    id: "1007757",
    title: "Swapped",
    date: "2026-05-13",
    content:
      "A small woodland creature and a majestic bird magically trade places.",
  },
} satisfies Meta<typeof MovieCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageUrl: placeholderPoster,
  },
};

export const NoPoster: Story = {
  args: {
    imageUrl: "",
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
