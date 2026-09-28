import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import FilterLinksComponent from "./FilterLinks";
import { fn } from "storybook/test";

const meta = {
  title: "Component/molecules/FilterLinks",
  component: FilterLinksComponent,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof FilterLinksComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FilterLinks: Story = {
  args: {
    totalCount: [
      { filter: "tv", count: 12 },
      { filter: "person", count: 5 },
      { filter: "movie", count: 20 },
      { filter: "collection", count: 3 },
      { filter: "keyword", count: 8 },
      { filter: "company", count: 2 },
    ],
    filter: "movie",
    getFilterHref: fn(),
  },
};
