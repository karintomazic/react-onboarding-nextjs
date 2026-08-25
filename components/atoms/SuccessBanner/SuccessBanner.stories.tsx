import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SuccessBannerComponent from "./SuccessBanner";

const meta = {
  title: "Component/atoms/SuccessBanner",
  component: SuccessBannerComponent,
} satisfies Meta<typeof SuccessBannerComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SuccessBanner: Story = {
  args: {
    message: "This movie was added to your Bookmarks list.",
    top: 20,
  },
};
