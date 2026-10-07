import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import BookmarkedMovieCardComponent from "./BookmarkedMovieCard";
import { http, HttpResponse } from "msw";
import placeholderPoster from "../../../assets/placeholder-poster.jpg";
import { bookmarksHandlers } from "@/mock/handlers";

const meta = {
  title: "Component/molecules/BookmarkedMovieCard",
  component: BookmarkedMovieCardComponent,
  argTypes: { movieId: { control: false } },
} satisfies Meta<typeof BookmarkedMovieCardComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockMovieDetails = {
  id: 123,
  overview:
    "A group of astronauts travel through a wormhole in search of a new home for humanity.",
  title: "Interstellar",
  genres: [
    { id: 12, name: "Adventure" },
    { id: 18, name: "Drama" },
  ],
  release_date: "2014-11-07",
  poster_path: "/placeholder-poster.jpg",
  backdrop_path: "/placeholder-poster.jpg",
  tagline: "Mankind was born on Earth. It was never meant to die here.",
  runtime: 169,
  credits: {
    crew: [{ id: 1, name: "Christopher Nolan", job: "Director" }],
  },
  vote_average: 8.5,
};

export const BookmarkedMovieCard: Story = {
  args: {
    movieId: 123,
  },
  parameters: {
    msw: {
      handlers: [
        ...bookmarksHandlers,
        http.get("/api/tmdb/movie/123", () =>
          HttpResponse.json(mockMovieDetails),
        ),
        http.get("https://image.tmdb.org/t/p/*", () =>
          HttpResponse.redirect(placeholderPoster.src),
        ),
      ],
    },
  },
};
