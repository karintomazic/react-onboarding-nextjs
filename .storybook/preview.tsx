import type { Preview } from "@storybook/nextjs-vite";
import "../app/globals.css";
import { mswLoader } from "msw-storybook-addon/csf3";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { BannerProvider } from "../context/BannerContext";
import { emptyBookmarksHandler } from "../mock/handlers";
import { z } from "zod";

const sessionSchema = z
  .object({
    user: z
      .object({
        name: z.string().nullable().optional(),
        email: z.string().nullable().optional(),
        image: z.string().nullable().optional(),
      })
      .optional(),
    expires: z.string(),
  })
  .nullable()
  .catch(null);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "error",
    },
    nextjs: { appDirectory: true }, // mock the Next.js App Router context so hooks from next/navigation
    // (like useSearchParams, useRouter, usePathname) work inside stories instead of returning null.

    msw: {
      handlers: [emptyBookmarksHandler],
    },
  },
  loaders: [mswLoader()],
  decorators: [
    (Story, context) => {
      const queryClient = new QueryClient();
      return (
        <QueryClientProvider client={queryClient}>
          {/* no-unsafe-assignment = context.parameters is typed any by storybook. we assert it as Session | null */}
          <SessionProvider
            session={sessionSchema.parse(context.parameters.session)}
          >
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
