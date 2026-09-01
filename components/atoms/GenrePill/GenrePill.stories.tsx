import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import GenrePill from "./GenrePill";

const meta = {
  title: "Component/atoms/GenrePill",
  component: GenrePill,
  args: {
    genre: { id: 1, name: "Action" },
    onToggle: fn(),
  },
} satisfies Meta<typeof GenrePill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isSelected: false,
  },
};

export const Selected: Story = {
  args: {
    isSelected: true,
  },
};
