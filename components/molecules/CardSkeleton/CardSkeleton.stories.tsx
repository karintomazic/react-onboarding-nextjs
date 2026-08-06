import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import CardSkeletonComponent from "./CardSkeleton";

const meta = {
  title: "Component/molecules/CardSkeleton",
  component: CardSkeletonComponent,
} satisfies Meta<typeof CardSkeletonComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CardSkeletonShowcase: Story = {
  args: {
    loadingLabel: "Loading",
    variant: "showcase",
  },
};

export const CardSkeletonPopular: Story = {
  args: {
    loadingLabel: "Loading",
    variant: "popular",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "200px" }}>
        <Story />
      </div>
    ),
  ],
};
