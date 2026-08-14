import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { userMenuLabels } from "../../../data/labels";
import UserMenu from "./UserMenu";

const meta = {
  title: "Component/molecules/UserMenu",
  component: UserMenu,
} satisfies Meta<typeof UserMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  args: {
    loginLabel: userMenuLabels.login,
    joinLabel: userMenuLabels.join,
  },
};

export const Open: Story = {
  args: {
    loginLabel: userMenuLabels.login,
    joinLabel: userMenuLabels.join,
  },
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: /user menu/i });
    await userEvent.click(button);
  },
};
