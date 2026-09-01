import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { sortDropdownLabels } from "../../../data/labels";
import SortDropdownComponent from "./SortDropdown";

const meta = {
  title: "Component/molecules/SortDropdown",
  component: SortDropdownComponent,
  args: {
    sortBy: { value: "popularity.desc", label: "Popularity Descending" },
    setSortBy: fn(),
    ariaLabel: sortDropdownLabels.ariaLabel,
  },
} satisfies Meta<typeof SortDropdownComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SortDropdown: Story = {};

export const SortDropdownOpen: Story = {
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: /Sort results by/i });
    await userEvent.click(button);
  },
};
