import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import MainMenuLinkComponent from "./MainMenuLink";

const meta = {
  title: "Component/atoms/MainMenuLink",
  component: MainMenuLinkComponent,
  globals: {
    backgrounds: { value: "dark" },
  },
} satisfies Meta<typeof MainMenuLinkComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MainMenuLink: Story = {
  args: {
    label: "Main Menu Link text",
    url: "#",
    handleMenuToggle: fn(),
  },
};
