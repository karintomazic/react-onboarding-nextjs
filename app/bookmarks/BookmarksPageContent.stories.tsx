import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import BookmarksPageComponent from "./BookmarksPageContent";
import { http, HttpResponse } from "msw";
import placeholderPoster from "../../assets/placeholder-poster.jpg";
import { v7 as uuidv7 } from "uuid";

const mockBookmarks = [
  { id: uuidv7(), userId: uuidv7(), movieId: 123 },
  { id: uuidv7(), userId: uuidv7(), movieId: 456 },
];

const mockMovie123 = {
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
  credits: { crew: [{ id: 1, name: "Christopher Nolan", job: "Director" }] },
  vote_average: 8.5,
};

const mockMovie456 = {
  ...mockMovie123,
  id: 456,
  title: "Inception",
};

const meta = {
  title: "Component/pages/BookmarksPage",
  component: BookmarksPageComponent,
} satisfies Meta<typeof BookmarksPageComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BookmarksPage: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/bookmarks", () => HttpResponse.json(mockBookmarks)),
        http.delete(
          "/api/bookmarks",
          () => new HttpResponse(null, { status: 204 }),
        ),

        http.get("/api/tmdb/movie/123", () => HttpResponse.json(mockMovie123)),
        http.get("/api/tmdb/movie/456", () => HttpResponse.json(mockMovie456)),
        http.get("https://image.tmdb.org/t/p/*", () =>
          HttpResponse.redirect(placeholderPoster.src),
        ),
      ],
    },
  },
};

export const BookmarksPageEmpty: Story = {
  parameters: {
    msw: {
      handlers: [http.get("/api/bookmarks", () => HttpResponse.json([]))],
    },
  },
};
