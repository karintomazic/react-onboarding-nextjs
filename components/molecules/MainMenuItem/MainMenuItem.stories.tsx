import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import MainMenuItemComponent from "./MainMenuItem";

const meta = {
  title: "Component/molecules/MainMenuItem",
  component: MainMenuItemComponent,
  args: {
    label: "Main Menu Item text",
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
} satisfies Meta<typeof MainMenuItemComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MainMenuItem: Story = {
  globals: {
    viewport: { value: "desktop" },
  },
};

export const MainMenuItemMobile: Story = {};

export const MainMenuItemOpenMobile: Story = {
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("link", { name: /main menu item text/i });
    await userEvent.click(toggle);
  },
};
