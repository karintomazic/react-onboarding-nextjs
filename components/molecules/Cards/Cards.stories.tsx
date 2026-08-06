import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import placeholderPoster from "../../../assets/placeholder-poster.jpg";
import { cardLabels } from "../../../data/labels";

import CardsComponent from "./Cards";

const meta = {
  title: "Component/molecules/Cards",
  component: CardsComponent,
} satisfies Meta<typeof CardsComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const movies = [
  { id: 1, title: "Streaming", url: placeholderPoster, date: "2026-03-01" },
  { id: 2, title: "On TV", url: placeholderPoster, date: "2026-03-01" },
  { id: 3, title: "For Rent", url: placeholderPoster, date: "2026-03-01" },
  {
    id: 4,
    title: "In Theatres",
    url: placeholderPoster,
    date: "2026-03-01",
  },
  {
    id: 5,
    title: "In Theatres",
    url: placeholderPoster,
    date: "2026-03-01",
  },
  {
    id: 6,
    title: "In Theatres",
    url: placeholderPoster,
    date: "2026-03-01",
  },
  {
    id: 7,
    title: "In Theatres",
    url: placeholderPoster,
    date: "2026-03-01",
  },
  {
    id: 8,
    title: "In Theatres",
    url: placeholderPoster,
    date: "2026-03-01",
  },
];

export const Popular: Story = {
  args: {
    movies: movies,
    isLoading: false,
    variant: "popular",
    loadingLabel: cardLabels.loading,
    optionsPromptLabel: cardLabels.optionsPrompt,
    loginLabel: cardLabels.login,
    notAMemberLabel: cardLabels.notAMember,
    signUpLabel: cardLabels.signUp,
  },
};

export const Showcase: Story = {
  args: {
    movies: movies,
    isLoading: false,
    variant: "showcase",
    loadingLabel: cardLabels.loading,
    optionsPromptLabel: cardLabels.optionsPrompt,
    loginLabel: cardLabels.login,
    notAMemberLabel: cardLabels.notAMember,
    signUpLabel: cardLabels.signUp,
  },
};

export const Loading: Story = {
  args: {
    movies: [],
    isLoading: true,
    loadingLabel: cardLabels.loading,
    optionsPromptLabel: cardLabels.optionsPrompt,
    loginLabel: cardLabels.login,
    notAMemberLabel: cardLabels.notAMember,
    signUpLabel: cardLabels.signUp,
  },
};
