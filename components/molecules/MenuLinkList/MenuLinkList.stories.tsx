import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import MenuLinkListComponent from "./MenuLinkList";

const meta = {
  title: "Component/molecules/MenuLinkList",
  component: MenuLinkListComponent,
} satisfies Meta<typeof MenuLinkListComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  args: {
    links: [
      { label: "Home", url: "/home" },
      { label: "About", url: "/about" },
      { label: "Contact", url: "/contact" },
    ],
  },
  globals: {
    backgrounds: { value: "light" },
    viewport: { value: "desktop" },
  },
};

export const Mobile: Story = {
  args: {
    links: [
      { label: "Home", url: "/home" },
      { label: "About", url: "/about" },
      { label: "Contact", url: "/contact" },
    ],
  },
  globals: {
    backgrounds: { value: "dark" },
    viewport: { value: "mobile1" },
  },
};
