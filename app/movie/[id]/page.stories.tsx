import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MovieDetailPageComponent from "./page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse, delay } from "msw";
// import { Routes, Route } from "react-router";
import placeholderPoster from "../../../assets/placeholder-poster.jpg";

const meta = {
  title: "Component/pages/MovieDetailPage",
  component: MovieDetailPageComponent,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      const queryClient = new QueryClient();
      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
  // render: () => (
  //   <Routes>
  //     <Route path="/movie/:id" element={<MovieDetailPageComponent />}></Route>
  //   </Routes>
  // ),
} satisfies Meta<typeof MovieDetailPageComponent>;

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

export const MovieDetailPage: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://api.themoviedb.org/3/movie/3", () =>
          HttpResponse.json(mockMovieDetails),
        ),
        http.get("https://image.tmdb.org/t/p/*", () =>
          HttpResponse.redirect(placeholderPoster.src),
        ),
      ],
    },
    nextjs: { navigation: { segments: [["id", "3"]] } },
  },
};

export const MovieDetailPageLoading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://api.themoviedb.org/3/movie/3", async () => {
          await delay("infinite");
          return HttpResponse.json(mockMovieDetails);
        }),
        http.get("https://image.tmdb.org/t/p/*", async () => {
          await delay("infinite");
          return HttpResponse.redirect(placeholderPoster.src);
        }),
      ],
    },
    nextjs: { navigation: { segments: [["id", "3"]] } },
  },
};
