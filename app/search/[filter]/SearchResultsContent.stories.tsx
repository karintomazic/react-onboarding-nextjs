import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchResultsContent } from "./SearchResultsContent";
import { http, HttpResponse, delay } from "msw";
import {
  mockSearchTV,
  mockSearchMovies,
  mockSearchPeople,
  mockSearchSimpleItems,
} from "../../../mock/mockData";
import styles from "./page.module.scss";

const meta = {
  title: "Component/pages/SearchResults",
  component: SearchResultsContent,
  args: { query: "batman", page: 1, filter: "movie" },
  decorators: [
    (Story) => (
      <div className={styles.movieCards}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchResultsContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TvShow: Story = {
  args: { filter: "tv" },
  parameters: {
    msw: {
      handlers: [
        http.get("/api/tmdb/movie-search", () =>
          HttpResponse.json(mockSearchTV),
        ),
      ],
    },
  },
};

export const Movie: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/tmdb/movie-search", () =>
          HttpResponse.json(mockSearchMovies),
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
        http.get("/api/tmdb/movie-search", () =>
          HttpResponse.json(mockSearchPeople),
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
        http.get("/api/tmdb/movie-search", () =>
          HttpResponse.json(mockSearchSimpleItems),
        ),
      ],
    },
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/tmdb/movie-search", async () => {
          await delay("infinite");
          return HttpResponse.json(mockSearchMovies);
        }),
      ],
    },
  },
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/tmdb/movie-search", () => {
          return HttpResponse.json(
            { error: "TMDB request failed" },
            { status: 502 },
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
        http.get("/api/tmdb/movie-search", () =>
          HttpResponse.json({ kind: "media", movies: [], totalPages: 0 }),
        ),
      ],
    },
  },
};
