import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SingleColumnComponent from "./SingleColumn";

const meta = {
  title: "Component/templates/SingleColumn",
  component: SingleColumnComponent,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SingleColumnComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleColumn: Story = {
  args: {
    children: <p>Page content goes here</p>,
  },
};
