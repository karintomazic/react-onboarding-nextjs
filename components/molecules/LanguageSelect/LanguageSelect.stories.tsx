import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { languageSelectLabels } from "../../../data/labels";

import LanguageSelectComponent from "./LanguageSelect";

const meta = {
  title: "Component/molecules/LanguageSelect",
  component: LanguageSelectComponent,
} satisfies Meta<typeof LanguageSelectComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LanguageSelect: Story = {
  args: {
    languageList: [
      { code: "en", label: "English" },
      { code: "fr", label: "French" },
      { code: "de", label: "German" },
    ],
    selected: "en",
    type: "primary",
    onSelect: fn(),
    filterPlaceholder: languageSelectLabels.filterPlaceholder,
    filterAriaLabel: languageSelectLabels.filterAriaLabel,
    listAriaLabel: languageSelectLabels.listAriaLabel,
  },
};

export const LanguageSelectOpen: Story = {
  args: {
    languageList: [
      { code: "en", label: "English" },
      { code: "fr", label: "French" },
      { code: "de", label: "German" },
    ],
    selected: "en",
    type: "primary",
    onSelect: fn(),
    filterPlaceholder: languageSelectLabels.filterPlaceholder,
    filterAriaLabel: languageSelectLabels.filterAriaLabel,
    listAriaLabel: languageSelectLabels.listAriaLabel,
  },
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: /english/i });
    await userEvent.click(button);
  },
};
