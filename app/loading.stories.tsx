import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import LoadingPageComponent from "./loading";

const meta = {
  title: "Component/pages/LoadingPage",
  component: LoadingPageComponent,
} satisfies Meta<typeof LoadingPageComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoadingPage: Story = {};
