import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { desktopNavLabels } from "../../../data/labels";
import DesktopNavComponent from "./DesktopNav";
import { fn } from "storybook/test";

const mockSession = {
  user: { name: "Test User", email: "test@example.com" },
  expires: "9999-12-31T23:59:59.999Z",
};

const meta = {
  title: "Component/organisms/DesktopNav",
  component: DesktopNavComponent,
  parameters: {
    layout: "fullscreen",
    session: mockSession,
  },
  globals: {
    backgrounds: { value: "dark" },
  },
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
