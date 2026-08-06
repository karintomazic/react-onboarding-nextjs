import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MenuLinkComponent from "./MenuLink";

const meta = {
  title: "Component/atoms/MenuLink",
  component: MenuLinkComponent,
} satisfies Meta<typeof MenuLinkComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  args: {
    label: "Menu Link text",
    url: "#",
  },
  globals: {
    viewport: { value: "desktop" },
    backgrounds: { value: "light" },
  },
};

export const Mobile: Story = {
  args: {
    label: "Menu Link text",
    url: "#",
  },
  globals: {
    viewport: { value: "mobile1" },
    backgrounds: { value: "dark" },
  },
};
