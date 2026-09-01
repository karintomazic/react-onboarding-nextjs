import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchResultsContent } from "./SearchResultsContent";
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

const meta = {
  title: "Component/pages/SearchResults",
  component: SearchResultsContent,
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
} satisfies Meta<typeof SearchResultsContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TvShow: Story = {
  args: { query: "batman", page: 1, filter: "tv" },
  parameters: {
    msw: {
      handlers: [
        http.get(TMDB_SEARCH_URL_TV, () =>
          HttpResponse.json({ results: mockTV, total_pages: 3 }),
        ),
      ],
    },
  },
};

export const Movie: Story = {
  args: { query: "batman", page: 1, filter: "movie" },
  parameters: {
    msw: {
      handlers: [
        http.get(TMDB_SEARCH_URL_MOVIE, () =>
          HttpResponse.json({ results: mockMovies, total_pages: 3 }),
        ),
      ],
    },
  },
};

export const Person: Story = {
  args: { query: "batman", page: 1, filter: "person" },
  parameters: {
    msw: {
      handlers: [
        http.get(TMDB_SEARCH_URL_PERSON, () =>
          HttpResponse.json({ results: mockPeople, total_pages: 3 }),
        ),
      ],
    },
  },
};

export const Simple: Story = {
  args: { query: "batman", page: 1, filter: "keyword" },
  parameters: {
    msw: {
      handlers: [
        http.get(TMDB_SEARCH_URL_SIMPLE, () =>
          HttpResponse.json({ results: mockSimpleItems, total_pages: 1 }),
        ),
      ],
    },
  },
};

export const Loading: Story = {
  args: { query: "batman", page: 1, filter: "movie" },
  parameters: {
    msw: {
      handlers: [
        http.get(TMDB_SEARCH_URL_MOVIE, async () => {
          await delay("infinite");
          return HttpResponse.json({ results: mockMovies, total_pages: 3 });
        }),
      ],
    },
  },
};

export const Error: Story = {
  args: { query: "batman", page: 1, filter: "movie" },
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
  },
};

export const Empty: Story = {
  args: { query: "", page: 1, filter: "movie" },
  parameters: {
    msw: {
      handlers: [
        http.get(TMDB_SEARCH_URL_MOVIE, () =>
          HttpResponse.json({ results: [], total_pages: 0 }),
        ),
      ],
    },
  },
};
