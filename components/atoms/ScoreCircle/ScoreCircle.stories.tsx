import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ScoreCircleComponent from "./ScoreCircle";

const meta = {
  title: "Component/atoms/ScoreCircle",
  component: ScoreCircleComponent,
} satisfies Meta<typeof ScoreCircleComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HighScore: Story = {
  args: {
    score: 85,
  },
};

export const MidScore: Story = {
  args: {
    score: 55,
  },
};

export const LowScore: Story = {
  args: {
    score: 25,
  },
};
