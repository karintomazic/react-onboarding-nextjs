import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import IconButtonComponent from "./IconButton";

import { faList, faHeart, faBookmark } from "@fortawesome/free-solid-svg-icons";

const meta = {
  title: "Component/atoms/IconButton",
  component: IconButtonComponent,
} satisfies Meta<typeof IconButtonComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const List: Story = {
  args: {
    icon: faList,
    label: "Add to your list",
  },
};

export const Heart: Story = {
  args: {
    icon: faHeart,
    label: "Add to favorites",
  },
};

export const Bookmark: Story = {
  args: {
    icon: faBookmark,
    label: "Add to watchlist",
  },
};
