import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { http, HttpResponse } from "msw";
import HomePageComponent from "./page";
import {
  mockMovies,
  TMDB_DISCOVER_URL_MOVIE,
  TMDB_DISCOVER_URL_NOW_PLAYING,
} from "@/mock/mockData";
import { sessionHandler } from "@/mock/authHandlers";

const meta = {
  title: "Component/pages/HomePage",
  component: HomePageComponent,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof HomePageComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const HomePage: Story = {
  parameters: {
    msw: {
      handlers: [
        sessionHandler,
        http.get(TMDB_DISCOVER_URL_MOVIE, () =>
          HttpResponse.json({ results: mockMovies }),
        ),
        http.get(TMDB_DISCOVER_URL_NOW_PLAYING, () =>
          HttpResponse.json({ results: mockMovies }),
        ),
      ],
    },
  },
};
