import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import TabComponent from "./Tab";

const meta = {
  title: "Component/atoms/Tab",
  component: TabComponent,
} satisfies Meta<typeof TabComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Tab: Story = {
  args: {
    label: "Streaming",
    isActive: false,
    onClick: fn(),
  },
};

export const Active: Story = {
  args: {
    label: "Streaming",
    isActive: true,
    onClick: fn(),
  },
};
