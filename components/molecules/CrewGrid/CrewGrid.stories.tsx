import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import CrewGridComponent from "./CrewGrid";

const meta = {
  title: "Component/molecules/CrewGrid",
  component: CrewGridComponent,
} satisfies Meta<typeof CrewGridComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CrewGrid: Story = {
  args: {
    crewDetails: [{ job: "Director", name: "Lorem Ipsum", id: 1 }],
  },
};
