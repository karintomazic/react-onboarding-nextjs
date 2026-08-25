import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import BookmarkedMovieCardComponent from "./BookmarkedMovieCard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const meta = {
  title: "Component/molecules/BookmarkedMovieCard",
  component: BookmarkedMovieCardComponent,
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
} satisfies Meta<typeof BookmarkedMovieCardComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BookmarkedMovieCard: Story = {
  args: {
    movieId: "123",
  },
};
