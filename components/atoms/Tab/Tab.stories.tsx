import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import TabComponent from "./Tab";

const meta = {
  title: "Component/atoms/Tab",
  component: TabComponent,
  args: {
    label: "Streaming",
    onClick: fn(),
  },
} satisfies Meta<typeof TabComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Tab: Story = {
  args: {
    isActive: false,
  },
};

export const Active: Story = {
  args: {
    isActive: true,
  },
};
