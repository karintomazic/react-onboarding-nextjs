import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SearchResultsComponent from "./page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse, delay } from "msw";
import {
  mockTV,
  mockMovies,
  mockPeople,
  mockSimpleItems,
  TMDB_SEARCH_URL_TV,
  TMDB_SEARCH_URL_MOVIE,
  TMDB_SEARCH_URL_PERSON,
  TMDB_SEARCH_URL_SIMPLE,
} from "../../../mock/mockData";
import { searchResultsLabels } from "../../../data/labels";

const meta = {
  title: "Component/pages/SearchResults",
  component: SearchResultsComponent,
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
} satisfies Meta<typeof SearchResultsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TvShow: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(TMDB_SEARCH_URL_TV, () =>
          HttpResponse.json({ results: mockTV, total_pages: 3 }),
        ),
      ],
    },
    nextjs: { navigation: { query: { filter: "tv" } } },
  },
};

export const Movie: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(TMDB_SEARCH_URL_MOVIE, () =>
          HttpResponse.json({ results: mockMovies, total_pages: 3 }),
        ),
      ],
    },
    nextjs: { navigation: { query: { filter: "movie" } } },
  },
};

export const Person: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(TMDB_SEARCH_URL_PERSON, () =>
          HttpResponse.json({ results: mockPeople, total_pages: 3 }),
        ),
      ],
    },
    nextjs: { navigation: { query: { filter: "person" } } },
  },
};

export const Simple: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(TMDB_SEARCH_URL_SIMPLE, () =>
          HttpResponse.json({ results: mockSimpleItems, total_pages: 1 }),
        ),
      ],
    },
    nextjs: { navigation: { query: { filter: "keyword" } } },
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(TMDB_SEARCH_URL_MOVIE, async () => {
          await delay("infinite");
          return HttpResponse.json({ results: mockMovies, total_pages: 3 });
        }),
      ],
    },
    nextjs: { navigation: { query: { filter: "movie" } } },
  },
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(TMDB_SEARCH_URL_MOVIE, () => {
          return HttpResponse.json(
            { status_message: "Invalid API key" },
            { status: 401 },
          );
        }),
      ],
    },
    nextjs: { navigation: { query: { filter: "movie" } } },
  },
};

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(TMDB_SEARCH_URL_MOVIE, () =>
          HttpResponse.json({ results: [], total_pages: 0 }),
        ),
      ],
    },
    nextjs: { navigation: { query: { filter: "movie" } } },
  },
};
