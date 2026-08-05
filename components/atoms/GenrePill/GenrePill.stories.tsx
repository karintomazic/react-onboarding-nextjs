import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import GenrePill from "./GenrePill";

const meta = {
  title: "Component/atoms/GenrePill",
  component: GenrePill,
} satisfies Meta<typeof GenrePill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    genre: { id: 1, name: "Action" },
    isSelected: false,
    onToggle: fn(),
  },
};

export const Selected: Story = {
  args: {
    genre: { id: 1, name: "Action" },
    isSelected: true,
    onToggle: fn(),
  },
};
