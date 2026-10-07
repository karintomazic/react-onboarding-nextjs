import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import NavigationBarComponent from "./NavigationBar";
import { http, HttpResponse } from "msw";
import { mockMovieList } from "@/mock/mockData";

const mockSession = {
  user: { name: "Test User", email: "test@example.com" },
  expires: "9999-12-31T23:59:59.999Z",
};

const meta = {
  title: "Component/organisms/NavigationBar",
  component: NavigationBarComponent,
  parameters: {
    layout: "fullscreen",
    session: mockSession,
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
        http.get("/api/tmdb/trending", () => HttpResponse.json(mockMovieList)),
        http.get("/api/tmdb/search", () => HttpResponse.json(mockMovieList)),
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
        http.get("/api/tmdb/trending", () => HttpResponse.json(mockMovieList)),
        http.get("/api/tmdb/search", () => HttpResponse.json(mockMovieList)),
      ],
    },
  },
};
