import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import NavigationBarComponent from "./NavigationBar";
import { http, HttpResponse } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const meta = {
  title: "Component/organisms/NavigationBar",
  component: NavigationBarComponent,
  parameters: {
    layout: "fullscreen",
  },
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
