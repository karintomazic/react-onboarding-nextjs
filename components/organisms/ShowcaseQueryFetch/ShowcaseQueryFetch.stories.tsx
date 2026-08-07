import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { http, HttpResponse, delay } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  mockMovies,
  TMDB_DISCOVER_URL_MOVIE,
  TMDB_DISCOVER_URL_NOW_PLAYING,
} from "../../../mock/mockData";
import ShowcaseQueryFetch from "./ShowcaseQueryFetch";

const meta = {
  title: "Component/organisms/ShowcaseQueryFetch",
  component: ShowcaseQueryFetch,
  decorators: [
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
      });

      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
} satisfies Meta<typeof ShowcaseQueryFetch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {
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

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(TMDB_DISCOVER_URL_MOVIE, async () => {
          await delay("infinite");
          return HttpResponse.json({ results: mockMovies });
        }),
        http.get(TMDB_DISCOVER_URL_NOW_PLAYING, async () => {
          await delay("infinite");
          return HttpResponse.json({ results: mockMovies });
        }),
      ],
    },
  },
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(TMDB_DISCOVER_URL_MOVIE, () =>
          HttpResponse.json(
            { status_message: "Invalid API key" },
            { status: 401 },
          ),
        ),
        http.get(TMDB_DISCOVER_URL_NOW_PLAYING, () =>
          HttpResponse.json(
            { status_message: "Invalid API key" },
            { status: 401 },
          ),
        ),
      ],
    },
  },
};

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(TMDB_DISCOVER_URL_MOVIE, () =>
          HttpResponse.json({ results: [] }),
        ),
        http.get(TMDB_DISCOVER_URL_NOW_PLAYING, () =>
          HttpResponse.json({ results: [] }),
        ),
      ],
    },
  },
};
