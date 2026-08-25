import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { desktopNavLabels } from "../../../data/labels";
import DesktopNavComponent from "./DesktopNav";
import { fn } from "storybook/test";
import { SessionProvider } from "next-auth/react";

const meta = {
  title: "Component/organisms/DesktopNav",
  component: DesktopNavComponent,
  parameters: {
    layout: "fullscreen",
  },
  globals: {
    backgrounds: { value: "dark" },
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
} satisfies Meta<typeof DesktopNavComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DesktopNav: Story = {
  args: {
    homeAriaLabel: desktopNavLabels.homeAriaLabel,
    createAriaLabel: desktopNavLabels.createAriaLabel,
    handleLoopClick: fn(),
    loopRef: { current: null },
  },
  globals: {
    viewport: { value: "desktop" },
  },
};
