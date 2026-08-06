import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ReactionsComponent from "./Reactions";

const meta = {
  title: "Component/atoms/Reactions",
  component: ReactionsComponent,
} satisfies Meta<typeof ReactionsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Reactions: Story = {};
