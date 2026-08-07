import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import FooterComponent from "./Footer";

const meta = {
  title: "Component/organisms/Footer",
  component: FooterComponent,
} satisfies Meta<typeof FooterComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Footer: Story = {};
