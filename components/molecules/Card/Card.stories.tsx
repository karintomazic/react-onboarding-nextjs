import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import placeholderPoster from "../../../assets/placeholder-poster.jpg";
import { cardLabels } from "../../../data/labels";
import CardComponent from "./Card";

const meta = {
  title: "Component/molecules/Card",
  component: CardComponent,
  args: {
    image: placeholderPoster,
    title: "Euphoria",
    date: "2026-05-13",

    optionsPromptLabel: cardLabels.optionsPrompt,
    loginLabel: cardLabels.login,
    notAMemberLabel: cardLabels.notAMember,
    signUpLabel: cardLabels.signUp,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "200px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CardComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ShowcaseCard: Story = {
  args: {
    variant: "showcase",
    id: 2,
  },
};

export const ShowcaseOpenOptions: Story = {
  args: {
    variant: "showcase",
    id: 2,
  },
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: /Options toggle/i });
    await userEvent.click(button);
  },
};

export const PopularCard: Story = {
  args: {
    variant: "popular",
    id: 1,
  },
};

export const PopularOpenOptions: Story = {
  args: {
    variant: "popular",
    id: 1,
  },
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: /Options toggle/i });
    await userEvent.click(button);
  },
};
