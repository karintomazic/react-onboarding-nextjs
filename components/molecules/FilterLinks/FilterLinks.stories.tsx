import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { http, HttpResponse } from "msw";

import FilterLinksComponent from "./FilterLinks";
import { searchFilters } from "../../../data/filterList";
import { sessionHandler } from "@/mock/authHandlers";

const meta = {
  title: "Component/molecules/FilterLinks",
  component: FilterLinksComponent,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof FilterLinksComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockCounts: Record<string, number> = {
  tv: 12,
  person: 5,
  movie: 20,
  collection: 3,
  keyword: 8,
  company: 2,
};

export const FilterLinks: Story = {
  parameters: {
    msw: {
      handlers: [
        sessionHandler,
        searchFilters.map(({ linkName }) =>
          http.get(`https://api.themoviedb.org/3/search/${linkName}`, () =>
            HttpResponse.json({ total_results: mockCounts[linkName] ?? 0 }),
          ),
        ),
      ],
    },
  },
};
