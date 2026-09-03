import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ToastBannerComponent from "./ToastBanner";

const meta = {
  title: "Component/atoms/ToastBanner",
  component: ToastBannerComponent,
} satisfies Meta<typeof ToastBannerComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ToastBanner: Story = {
  args: {
    type: "success",
    message: "This movie was added to your Bookmarks list.",
    top: 20,
    id: "1",
  },
};

export const ErrorToastBanner: Story = {
  args: {
    type: "error",
    message: "Something went wrong, please try again",
    top: 20,
    id: "1",
  },
};
