import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SearchFilterLinkComponent from "./SearchFilterLink";

const meta = {
  title: "Component/atoms/SearchFilterLink",
  component: SearchFilterLinkComponent,
} satisfies Meta<typeof SearchFilterLinkComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inactive: Story = {
  args: {
    linkName: "/popular",
    linkLabel: "Popular",
    count: 1,
    searchParams: "",
  },
};

export const Active: Story = {
  args: {
    linkName: "/popular",
    linkLabel: "Popular",
    count: 1,
    searchParams: "",
  },
  parameters: {
    routeEntries: ["/popular"],
  },
};
