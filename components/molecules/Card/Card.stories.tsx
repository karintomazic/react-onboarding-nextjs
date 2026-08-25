import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import placeholderPoster from "../../../assets/placeholder-poster.jpg";
import { cardLabels } from "../../../data/labels";
import CardComponent from "./Card";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BannerProvider } from "@/context/BannerContext";
import { SessionProvider } from "next-auth/react";

const meta = {
  title: "Component/molecules/Card",
  component: CardComponent,
  decorators: [
    (Story) => {
      const queryClient = new QueryClient();
      return (
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <BannerProvider>
              <Story />
            </BannerProvider>
          </SessionProvider>
        </QueryClientProvider>
      );
    },
  ],
} satisfies Meta<typeof CardComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ShowcaseCard: Story = {
  args: {
    image: placeholderPoster,
    title: "Euphoria",
    date: "2026-05-13",
    variant: "showcase",
    id: "2",
    optionsPromptLabel: cardLabels.optionsPrompt,
    loginLabel: cardLabels.login,
    notAMemberLabel: cardLabels.notAMember,
    signUpLabel: cardLabels.signUp,
  },
};

export const ShowcaseOpenOptions: Story = {
  args: {
    image: placeholderPoster,
    title: "Euphoria",
    date: "2026-05-13",
    variant: "showcase",
    id: "2",
    optionsPromptLabel: cardLabels.optionsPrompt,
    loginLabel: cardLabels.login,
    notAMemberLabel: cardLabels.notAMember,
    signUpLabel: cardLabels.signUp,
  },
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: /Options toggle/i });
    await userEvent.click(button);
  },
};

export const PopularCard: Story = {
  args: {
    image: placeholderPoster,
    title: "Euphoria",
    date: "2026-05-13",
    variant: "popular",
    id: "1",
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
};

export const PopularOpenOptions: Story = {
  args: {
    image: placeholderPoster,
    title: "Euphoria",
    date: "2026-05-13",
    variant: "popular",
    id: "1",
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
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: /Options toggle/i });
    await userEvent.click(button);
  },
};
