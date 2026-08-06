import type { Preview } from '@storybook/nextjs-vite'
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo'
    },
    nextjs: { appDirectory: true } // mock the Next.js App Router context so hooks from next/navigation
    // (like useSearchParams, useRouter, usePathname) work inside stories instead of returning null.
  },
};

export default preview;