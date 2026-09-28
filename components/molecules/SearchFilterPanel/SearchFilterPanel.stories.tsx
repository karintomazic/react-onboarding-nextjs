import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SearchFilterPanelComponent from "./SearchFilterPanel";
import SearchFilterLink from "../../atoms/SearchFilterLink/SearchFilterLink";

const meta = {
  title: "Component/molecules/SearchFilterPanel",
  component: SearchFilterPanelComponent,
} satisfies Meta<typeof SearchFilterPanelComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SearchFilterPanel: Story = {
  args: {
    children: (
      <>
        <SearchFilterLink
          linkLabel="Movies"
          count={12}
          href="/movie?query=batman"
          isActive={false}
        />
        <SearchFilterLink
          linkLabel="TV Shows"
          count={8}
          href="/tv?query=batman"
          isActive={true}
        />
        <SearchFilterLink
          linkLabel="People"
          count={3}
          href="/person?query=batman"
          isActive={false}
        />
      </>
    ),
    heading: "Search Results",
  },
};
