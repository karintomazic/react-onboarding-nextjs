import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import BookmarkedMovieCardComponent from "./BookmarkedMovieCard";

const meta = {
  title: "Component/molecules/BookmarkedMovieCard",
  component: BookmarkedMovieCardComponent,
} satisfies Meta<typeof BookmarkedMovieCardComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BookmarkedMovieCard: Story = {
  args: {
    movieId: 123,
  },
};
