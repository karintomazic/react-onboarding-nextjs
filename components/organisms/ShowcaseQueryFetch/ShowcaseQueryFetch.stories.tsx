import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { http, HttpResponse, delay } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mockShowcaseData } from "@/mock/mockData";
import ShowcaseQueryFetch from "./ShowcaseQueryFetch";
import { bookmarksHandlers } from "@/mock/handlers";

const mockSession = {
  user: { name: "Test User", email: "test@example.com" },
  expires: "9999-12-31T23:59:59.999Z",
};

const meta = {
  title: "Component/organisms/ShowcaseQueryFetch",
  component: ShowcaseQueryFetch,
  parameters: {
    session: mockSession,
  },
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
        ...bookmarksHandlers,
        http.get("/api/tmdb/showcase", () =>
          HttpResponse.json(mockShowcaseData),
        ),
      ],
    },
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        ...bookmarksHandlers,
        http.get("/api/tmdb/showcase", async () => {
          await delay("infinite");
          return HttpResponse.json(mockShowcaseData);
        }),
      ],
    },
  },
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        ...bookmarksHandlers,
        http.get("/api/tmdb/showcase", () =>
          HttpResponse.json({ error: "TMDB request failed" }, { status: 502 }),
        ),
      ],
    },
  },
};

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [
        ...bookmarksHandlers,
        http.get("/api/tmdb/showcase", () =>
          HttpResponse.json({ streaming: [], rent: [], theater: [] }),
        ),
      ],
    },
  },
};
