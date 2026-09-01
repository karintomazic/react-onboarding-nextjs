import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import MenuLinkListComponent from "./MenuLinkList";

const meta = {
  title: "Component/molecules/MenuLinkList",
  component: MenuLinkListComponent,
  args: {
    links: [
      { label: "Home", url: "/home" },
      { label: "About", url: "/about" },
      { label: "Contact", url: "/contact" },
    ],
  },
} satisfies Meta<typeof MenuLinkListComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  globals: {
    backgrounds: { value: "light" },
    viewport: { value: "desktop" },
  },
};

export const Mobile: Story = {
  globals: {
    backgrounds: { value: "dark" },
    viewport: { value: "mobile1" },
  },
};
