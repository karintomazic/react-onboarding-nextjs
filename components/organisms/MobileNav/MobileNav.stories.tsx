import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MobileNavComponent from "./MobileNav";
import { SessionProvider } from "next-auth/react";

const meta = {
  title: "Component/organisms/MobileNav",
  component: MobileNavComponent,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      return (
        <SessionProvider>
          <Story />
        </SessionProvider>
      );
    },
  ],
} satisfies Meta<typeof MobileNavComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MobileNav: Story = {
  args: {
    homeAriaLabel: "Mobile nav",
    openMenuAriaLabel: "Mobile nav",
  },
  globals: {
    viewport: { value: "mobile1" },
  },
};

export const MobileNavOpen: Story = {
  args: {
    homeAriaLabel: "Mobile nav",
    openMenuAriaLabel: "Mobile nav",
  },
  globals: {
    viewport: { value: "mobile1" },
  },
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: /Mobile nav/i });
    await userEvent.click(button);
  },
};
