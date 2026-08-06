import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  faStar,
  faHeart,
  faMagnifyingGlass,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import Icon from "./Icon";

const meta = {
  title: "Component/atoms/Icon",
  component: Icon,
  decorators: [
    (Story) => (
      <div style={{ width: "24px", height: "24px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Star: Story = {
  args: { icon: faStar },
};

export const Heart: Story = {
  args: { icon: faHeart },
};

export const Search: Story = {
  args: { icon: faMagnifyingGlass },
};

export const Bookmark: Story = {
  args: { icon: faBookmark },
};
