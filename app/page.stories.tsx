import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { http, HttpResponse } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePageComponent from "./page";
import {
  mockMovies,
  TMDB_DISCOVER_URL_MOVIE,
  TMDB_DISCOVER_URL_NOW_PLAYING,
} from "@/mock/mockData";
import { BannerProvider } from "@/context/BannerContext";

const meta = {
  title: "Component/pages/HomePage",
  component: HomePageComponent,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      const queryClient = new QueryClient();
      return (
        <QueryClientProvider client={queryClient}>
          <BannerProvider>
            <Story />
          </BannerProvider>
        </QueryClientProvider>
      );
    },
  ],
} satisfies Meta<typeof HomePageComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const HomePage: Story = {
  parameters: {
    msw: {
      handlers: [
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
