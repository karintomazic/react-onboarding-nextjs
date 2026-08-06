import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import FilterPanelComponent from "./FilterPanel";

const meta = {
  title: "Component/molecules/FilterPanel",
  component: FilterPanelComponent,
} satisfies Meta<typeof FilterPanelComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  args: {
    title: "Filters",
    subtitle: "Genres",
    toggleAction: fn(),
    toggle: false,
    children: "Filter content goes here",
  },
};

export const Open: Story = {
  args: {
    title: "Filters",
    subtitle: "Genres",
    toggleAction: fn(),
    toggle: true,
    children: "Filter content goes here",
  },
};
