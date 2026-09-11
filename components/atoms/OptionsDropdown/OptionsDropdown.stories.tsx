import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import OptionsDropdownComponent from "./OptionsDropdown";
import { cardLabels } from "../../../data/labels";
import { fn } from "storybook/test";

const mockSession = {
  user: { name: "Test User", email: "test@example.com" },
  expires: "9999-12-31T23:59:59.999Z",
};

const meta = {
  title: "Component/atoms/OptionsDropdown",
  component: OptionsDropdownComponent,
} satisfies Meta<typeof OptionsDropdownComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const sharedArgs = {
  dropdownPosition: { top: 40, left: 40 },
  dropdownRef: { current: null },
  handleAddToBookmark: fn(),
  isBookmarked: false,
  optionsPromptLabel: cardLabels.optionsPrompt,
  loginLabel: cardLabels.login,
  notAMemberLabel: cardLabels.notAMember,
  signUpLabel: cardLabels.signUp,
};

export const LoggedOut: Story = {
  args: sharedArgs,
  parameters: {
    session: null,
  },
};

export const LoggedIn: Story = {
  args: sharedArgs,
  parameters: {
    session: mockSession,
  },
};

export const LoggedInBookmarked: Story = {
  args: { ...sharedArgs, isBookmarked: true },
  parameters: {
    session: mockSession,
  },
};
