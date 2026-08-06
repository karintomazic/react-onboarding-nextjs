import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import LanguageRenderedListComponent from "./LanguageRenderedList";
import { fn } from "storybook/test";

const meta = {
  title: "Component/molecules/LanguageRenderedList",
  component: LanguageRenderedListComponent,
  render: (args) => (
    <ul>
      <LanguageRenderedListComponent {...args} />
    </ul>
  ),
} satisfies Meta<typeof LanguageRenderedListComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LanguageRenderedList: Story = {
  args: {
    languageList: [
      { code: "en-GB", label: "English" },
      { code: "fr-FR", label: "French" },
      { code: "de-DE", label: "German" },
    ],
    filter: "",
    onSelect: fn(),
    type: "primary",
    setIsOpen: fn(),
    highlighted: null,
    selected: "en-GB",
  },
};
