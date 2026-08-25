import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { userMenuLabels } from "../../../data/labels";
import UserMenu from "./UserMenu";
import { SessionProvider } from "next-auth/react";

const meta = {
  title: "Component/molecules/UserMenu",
  component: UserMenu,
  decorators: [
    (Story) => {
      return (
        <SessionProvider>
          <Story />
        </SessionProvider>
      );
    },
  ],
} satisfies Meta<typeof UserMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    loginLabel: userMenuLabels.login,
    joinLabel: userMenuLabels.join,
  },
};
