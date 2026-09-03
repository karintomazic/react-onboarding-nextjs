import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchResultsContent } from "./SearchResultsContent";
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
import { sessionHandler } from "@/mock/authHandlers";

const meta = {
  title: "Component/pages/SearchResults",
  component: SearchResultsContent,
  args: { query: "batman", page: 1, filter: "movie" },
} satisfies Meta<typeof SearchResultsContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TvShow: Story = {
  args: { filter: "tv" },
  parameters: {
    msw: {
      handlers: [
        sessionHandler,
        http.get(TMDB_SEARCH_URL_TV, () =>
          HttpResponse.json({ results: mockTV, total_pages: 3 }),
        ),
      ],
    },
  },
};

export const Movie: Story = {
  parameters: {
    msw: {
      handlers: [
        sessionHandler,
        http.get(TMDB_SEARCH_URL_MOVIE, () =>
          HttpResponse.json({ results: mockMovies, total_pages: 3 }),
        ),
      ],
    },
  },
};

export const Person: Story = {
  args: { filter: "person" },
  parameters: {
    msw: {
      handlers: [
        sessionHandler,
        http.get(TMDB_SEARCH_URL_PERSON, () =>
          HttpResponse.json({ results: mockPeople, total_pages: 3 }),
        ),
      ],
    },
  },
};

export const Simple: Story = {
  args: { filter: "keyword" },
  parameters: {
    msw: {
      handlers: [
        sessionHandler,
        http.get(TMDB_SEARCH_URL_SIMPLE, () =>
          HttpResponse.json({ results: mockSimpleItems, total_pages: 1 }),
        ),
      ],
    },
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        sessionHandler,
        http.get(TMDB_SEARCH_URL_MOVIE, async () => {
          await delay("infinite");
          return HttpResponse.json({ results: mockMovies, total_pages: 3 });
        }),
      ],
    },
  },
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        sessionHandler,
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
  args: { query: "" },
  parameters: {
    msw: {
      handlers: [
        sessionHandler,
        http.get(TMDB_SEARCH_URL_MOVIE, () =>
          HttpResponse.json({ results: [], total_pages: 0 }),
        ),
      ],
    },
  },
};
