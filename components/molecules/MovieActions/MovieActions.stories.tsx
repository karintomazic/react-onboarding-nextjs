import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MovieActionsComponent from "./MovieActions";
import { movieActionsLabels } from "../../../data/labels";

const meta = {
  title: "Component/molecules/MovieActions",
  component: MovieActionsComponent,
  globals: {
    backgrounds: { value: "dark" },
  },
} satisfies Meta<typeof MovieActionsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MovieActions: Story = {
  args: {
    addToListLabel: movieActionsLabels.addToList,
    addToFavoritesLabel: movieActionsLabels.addToFavorites,
    addToWatchlistLabel: movieActionsLabels.addToWatchlist,
    playTrailerLabel: movieActionsLabels.playTrailer,
  },
};
