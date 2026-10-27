import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MovieFacts from "./MovieFacts";

const meta = {
  title: "Component/atoms/MovieFacts",
  component: MovieFacts,
  args: {
    releaseDate: "1999-10-15",
    genres: [
      { id: 18, name: "Drama" },
      { id: 53, name: "Thriller" },
    ],
    runtime: 139,
  },
} satisfies Meta<typeof MovieFacts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutReleaseDate: Story = {
  args: {
    releaseDate: "",
  },
};

export const WithoutGenres: Story = {
  args: {
    genres: [],
  },
};

export const WithoutRuntime: Story = {
  args: {
    runtime: 0,
  },
};
