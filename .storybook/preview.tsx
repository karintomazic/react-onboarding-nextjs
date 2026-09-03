import type { Preview } from "@storybook/nextjs-vite";
import "../app/globals.css";
import { mswLoader } from "msw-storybook-addon/csf3";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { BannerProvider } from "../context/BannerContext";
import { sessionHandler } from "../mock/authHandlers";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    nextjs: { appDirectory: true }, // mock the Next.js App Router context so hooks from next/navigation
    // (like useSearchParams, useRouter, usePathname) work inside stories instead of returning null.
    msw: {
      handlers: [sessionHandler],
    },
  },
  loaders: [mswLoader()],
  decorators: [
    (Story) => {
      const queryClient = new QueryClient();
      return (
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <BannerProvider>
              <Story />
            </BannerProvider>
          </SessionProvider>
        </QueryClientProvider>
      );
    },
  ],
};

export default preview;
