import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SpinnerComponent from "./Spinner";

const meta = {
  title: "Component/atoms/Spinner",
  component: SpinnerComponent,
} satisfies Meta<typeof SpinnerComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Spinner: Story = {};
