import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PopularMoviesContent from "./PopularMoviesContent";
import { http, HttpResponse } from "msw";
import placeholderPoster from "../../assets/placeholder-poster.jpg";
import { bookmarksHandlers } from "@/mock/handlers";

const mockSession = {
  user: { name: "Test User", email: "test@example.com" },
  expires: "9999-12-31T23:59:59.999Z",
};

const mockPopularMovies = [
  {
    id: 1,
    title: "Interstellar",
    url: placeholderPoster.src,
    date: "2014-11-07",
  },
  {
    id: 2,
    title: "Inception",
    url: placeholderPoster.src,
    date: "2010-07-16",
  },
];

const mockGenres = [
  { id: 28, name: "Action" },
  { id: 18, name: "Drama" },
];

const meta = {
  title: "Component/pages/PopularMovies",
  component: PopularMoviesContent,
  parameters: {
    session: mockSession,
  },
} satisfies Meta<typeof PopularMoviesContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PopularMovies: Story = {
  args: { genres: "", sort: "popularity.desc" },
  parameters: {
    msw: {
      handlers: [
        ...bookmarksHandlers,
        http.get("/api/tmdb/popular", () =>
          HttpResponse.json(mockPopularMovies),
        ),
        http.get("/api/tmdb/genres", () => HttpResponse.json(mockGenres)),
        http.get("https://image.tmdb.org/t/p/*", () =>
          HttpResponse.redirect(placeholderPoster.src),
        ),
      ],
    },
  },
};
