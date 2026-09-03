import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import NavigationBarComponent from "./NavigationBar";
import { http, HttpResponse } from "msw";
import { sessionHandler } from "@/mock/authHandlers";

const meta = {
  title: "Component/organisms/NavigationBar",
  component: NavigationBarComponent,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof NavigationBarComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  globals: {
    viewport: { value: "desktop" },
  },
  parameters: {
    msw: {
      handlers: [
        sessionHandler,
        http.get("https://api.themoviedb.org/3/trending/movie/day", () =>
          HttpResponse.json({ results: [{ title: "Some Movie", id: 2 }] }),
        ),
        http.get("https://api.themoviedb.org/3/search/movie", () =>
          HttpResponse.json({ results: [{ title: "Some Movie", id: 2 }] }),
        ),
      ],
    },
  },
};

export const Mobile: Story = {
  globals: {
    viewport: { value: "mobile1" },
  },
  parameters: {
    msw: {
      handlers: [
        sessionHandler,
        http.get("https://api.themoviedb.org/3/trending/movie/day", () =>
          HttpResponse.json({ results: [{ title: "Some Movie", id: 2 }] }),
        ),
        http.get("https://api.themoviedb.org/3/search/movie", () =>
          HttpResponse.json({ results: [{ title: "Some Movie", id: 2 }] }),
        ),
      ],
    },
  },
};
