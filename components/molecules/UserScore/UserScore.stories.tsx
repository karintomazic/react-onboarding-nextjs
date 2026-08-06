import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import UserScoreComponent from "./UserScore";

const meta = {
  title: "Component/molecules/UserScore",
  component: UserScoreComponent,
} satisfies Meta<typeof UserScoreComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UserScore: Story = {
  args: {
    score: 5,
  },
  globals: {
    backgrounds: { value: "dark" },
  },
};
