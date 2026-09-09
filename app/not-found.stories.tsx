import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import NotFoundComponent from "./not-found";

const meta = {
  title: "Component/pages/NotFound",
  component: NotFoundComponent,
} satisfies Meta<typeof NotFoundComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NotFound: Story = {};
