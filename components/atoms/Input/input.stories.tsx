import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import InputComponent from "./Input";

const meta = {
  title: "Component/atoms/Input",
  component: InputComponent,
  argTypes: {
    type: {
      control: "radio",
      options: ["text", "search"],
    },
  },
} satisfies Meta<typeof InputComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Input: Story = {
  args: {
    value: "",
    placeholder: "Type something...",
    onChange: fn(),
    type: "text",
    ariaLabel: "Text input",
    onClick: fn(),
  },
};
