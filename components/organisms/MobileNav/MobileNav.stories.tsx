import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MobileNavComponent from "./MobileNav";

const mockSession = {
  user: { name: "Test User", email: "test@example.com" },
  expires: "9999-12-31T23:59:59.999Z",
};

const meta = {
  title: "Component/organisms/MobileNav",
  component: MobileNavComponent,
  parameters: {
    layout: "fullscreen",
    session: mockSession,
  },
  args: {
    homeAriaLabel: "Mobile nav",
    openMenuAriaLabel: "Mobile nav",
  },
  globals: {
    viewport: { value: "mobile1" },
  },
} satisfies Meta<typeof MobileNavComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MobileNav: Story = {};

export const MobileNavOpen: Story = {
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: /Mobile nav/i });
    await userEvent.click(button);
  },
};
