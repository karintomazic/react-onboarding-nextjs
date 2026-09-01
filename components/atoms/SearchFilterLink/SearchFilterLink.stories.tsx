import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SearchFilterLinkComponent from "./SearchFilterLink";

const meta = {
  title: "Component/atoms/SearchFilterLink",
  component: SearchFilterLinkComponent,
  args: {
    linkName: "/popular",
    linkLabel: "Popular",
    count: 1,
    searchParams: "",
  },
} satisfies Meta<typeof SearchFilterLinkComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inactive: Story = {
  args: {
    isActive: false,
  },
};

export const Active: Story = {
  args: {
    isActive: true,
  },
  parameters: {
    routeEntries: ["/popular"],
  },
};
