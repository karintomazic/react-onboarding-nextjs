import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MainMenuComponent from "./MainMenu";

const meta = {
  title: "Component/organisms/MainMenu",
  component: MainMenuComponent,
  globals: {
    backgrounds: { value: "dark" },
  },
} satisfies Meta<typeof MainMenuComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MainMenu: Story = {};
