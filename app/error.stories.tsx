import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ErrorPageComponent from "./error";
import { expect, fn } from "storybook/test";

const meta = {
  title: "Component/pages/ErrorPage",
  component: ErrorPageComponent,
  args: {
    error: new Error("Story error"),
    retry: fn(),
  },
} satisfies Meta<typeof ErrorPageComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ErrorPage: Story = {};

export const ErrorPageTryAgain: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const retryButton = canvas.getByRole("button", { name: /try again/i });
    await userEvent.click(retryButton);

    await expect(args.retry).toHaveBeenCalled();
  },
};
