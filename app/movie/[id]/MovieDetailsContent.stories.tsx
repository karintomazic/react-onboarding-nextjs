import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MovieDetailsContentComponent from "./MovieDetailsContent";
import { http, HttpResponse, delay } from "msw";
import placeholderPoster from "../../../assets/placeholder-poster.jpg";
import { bookmarksHandlers } from "@/mock/handlers";

const meta = {
  title: "Component/pages/MovieDetailsContent",
  component: MovieDetailsContentComponent,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    movieId: { control: false },
  },
} satisfies Meta<typeof MovieDetailsContentComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockMovieDetails = {
  id: 3,
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

export const MovieDetailsContent: Story = {
  args: {
    movieId: 3,
  },
  parameters: {
    msw: {
      handlers: [
        ...bookmarksHandlers,
        http.get("/api/tmdb/movie/3", () =>
          HttpResponse.json(mockMovieDetails),
        ),
        http.get("https://image.tmdb.org/t/p/*", () =>
          HttpResponse.redirect(placeholderPoster.src),
        ),
      ],
    },
  },
};

export const MovieDetailsContentLoading: Story = {
  args: {
    movieId: 3,
  },
  parameters: {
    msw: {
      handlers: [
        ...bookmarksHandlers,
        http.get("/api/tmdb/movie/3", async () => {
          await delay("infinite");
          return HttpResponse.json(mockMovieDetails);
        }),
        http.get("https://image.tmdb.org/t/p/*", async () => {
          await delay("infinite");
          return HttpResponse.redirect(placeholderPoster.src);
        }),
      ],
    },
  },
};
