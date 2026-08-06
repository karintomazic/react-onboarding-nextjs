import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import MainMenuItemComponent from "./MainMenuItem";

const meta = {
  title: "Component/molecules/MainMenuItem",
  component: MainMenuItemComponent,
  globals: {
    backgrounds: { value: "dark" },
  },
} satisfies Meta<typeof MainMenuItemComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MainMenuItem: Story = {
  args: {
    label: "Main Menu Item text",
    links: [
      { label: "Home", url: "/home" },
      { label: "About", url: "/about" },
      { label: "Contact", url: "/contact" },
    ],
  },
};

export const MainMenuItemMobile: Story = {
  args: {
    label: "Main Menu Item text",
    links: [
      { label: "Home", url: "/home" },
      { label: "About", url: "/about" },
      { label: "Contact", url: "/contact" },
    ],
  },
  globals: {
    viewport: { value: "mobile1" },
  },
};

export const MainMenuItemOpenMobile: Story = {
  args: {
    label: "Main Menu Item text",
    links: [
      { label: "Home", url: "/home" },
      { label: "About", url: "/about" },
      { label: "Contact", url: "/contact" },
    ],
  },
  globals: {
    viewport: { value: "mobile1" },
  },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("link", { name: /main menu item text/i });
    await userEvent.click(toggle);
  },
};
