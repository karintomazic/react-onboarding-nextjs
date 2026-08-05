import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import Button from "./Button";

const meta = {
  title: "Component/atoms/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "radio",
      options: ["default", "language", "reset"],
    },
    type: {
      control: "radio",
      options: ["button", "submit", "reset"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Click me",
    onClick: fn(),
    variant: "default",
    type: "button",
  },
};

export const Language: Story = {
  args: {
    label: "EN",
    onClick: fn(),
    variant: "language",
    type: "button",
    "aria-label": "Select language: English",
  },
  globals: {
    backgrounds: { value: "dark" },
  },
};

export const Reset: Story = {
  args: {
    label: "Reset",
    onClick: fn(),
    variant: "reset",
    type: "reset",
  },
};
