import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PopularMoviesContent from "./PopularMoviesContent";
import { http, HttpResponse } from "msw";
import placeholderPoster from "../../assets/placeholder-poster.jpg";
import { bookmarksHandlers } from "@/mock/handlers";
import { expect } from "storybook/test";

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

const mockPopularPage1 = [
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

const mockPopularPage2 = [
  {
    id: 2,
    title: "Inception",
    url: placeholderPoster.src,
    date: "2010-07-16",
  },
  {
    id: 3,
    title: "Dune",
    url: placeholderPoster.src,
    date: "2021-09-15",
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
          HttpResponse.json({ results: mockPopularMovies, totalPages: 2 }),
        ),
        http.get("/api/tmdb/genres", () => HttpResponse.json(mockGenres)),
        http.get("https://image.tmdb.org/t/p/*", () =>
          HttpResponse.redirect(placeholderPoster.src),
        ),
      ],
    },
  },
};

export const LoadMoreRemovesDuplicates: Story = {
  args: { genres: "", sort: "popularity.desc" },
  parameters: {
    msw: {
      handlers: [
        ...bookmarksHandlers,
        http.get("/api/tmdb/popular", ({ request }) => {
          const page = new URL(request.url).searchParams.get("page");

          if (page === "2") {
            return HttpResponse.json({
              results: mockPopularPage2,
              totalPages: 2,
            });
          }

          return HttpResponse.json({
            results: mockPopularPage1,
            totalPages: 2,
          });
        }),
        http.get("/api/tmdb/genres", () => HttpResponse.json(mockGenres)),
        http.get("https://image.tmdb.org/t/p/*", () =>
          HttpResponse.redirect(placeholderPoster.src),
        ),
      ],
    },
  },
  play: async ({ canvas, userEvent }) => {
    await canvas.findByText("Interstellar");

    const loadMoreButton = canvas.getByRole("button", { name: /load more/i });
    await userEvent.click(loadMoreButton);

    await canvas.findByText("Dune");
    const inceptionTitles = canvas.getAllByText("Inception");

    await expect(inceptionTitles).toHaveLength(1);
  },
};
