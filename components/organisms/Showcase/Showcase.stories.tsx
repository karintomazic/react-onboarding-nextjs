import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import pladeholderPoster from "../../../assets/placeholder-poster.jpg";
import { fn } from "storybook/test";
import { cardLabels, showcaseLabels, tabsLabels } from "../../../data/labels";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BannerProvider } from "@/context/BannerContext";

import ShowcaseComponent from "./Showcase";

const meta = {
  title: "Component/organisms/Showcase",
  component: ShowcaseComponent,
  decorators: [
    (Story) => {
      const queryClient = new QueryClient();
      return (
        <QueryClientProvider client={queryClient}>
          <BannerProvider>
            <Story />
          </BannerProvider>
        </QueryClientProvider>
      );
    },
  ],
} satisfies Meta<typeof ShowcaseComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const movies = [
  { id: 1, title: "Streaming", url: pladeholderPoster, date: "2026-03-01" },
  { id: 2, title: "On TV", url: pladeholderPoster, date: "2026-03-01" },
  { id: 3, title: "For Rent", url: pladeholderPoster, date: "2026-03-01" },
  {
    id: 4,
    title: "In Theatres",
    url: pladeholderPoster,
    date: "2026-03-01",
  },
  {
    id: 5,
    title: "In Theatres",
    url: pladeholderPoster,
    date: "2026-03-01",
  },
  {
    id: 6,
    title: "In Theatres",
    url: pladeholderPoster,
    date: "2026-03-01",
  },
  {
    id: 7,
    title: "In Theatres",
    url: pladeholderPoster,
    date: "2026-03-01",
  },
  {
    id: 8,
    title: "In Theatres",
    url: pladeholderPoster,
    date: "2026-03-01",
  },
  {
    id: 9,
    title: "In Theatres",
    url: pladeholderPoster,
    date: "2026-03-01",
  },
  {
    id: 10,
    title: "In Theatres",
    url: pladeholderPoster,
    date: "2026-03-01",
  },
  {
    id: 11,
    title: "In Theatres",
    url: pladeholderPoster,
    date: "2026-03-01",
  },
  {
    id: 12,
    title: "In Theatres",
    url: pladeholderPoster,
    date: "2026-03-01",
  },
];

export const Showcase: Story = {
  args: {
    movies: movies,
    isLoading: false,
    activeTab: 1,
    ref: { current: null },
    onTabChange: fn(),
    heading: showcaseLabels.heading,
    emptyLabel: showcaseLabels.empty,
    loadingLabel: cardLabels.loading,
    mobileListAriaLabel: tabsLabels.mobileListAriaLabel,
    tabs: showcaseLabels.tabs,
    optionsPromptLabel: cardLabels.optionsPrompt,
    loginLabel: cardLabels.login,
    notAMemberLabel: cardLabels.notAMember,
    signUpLabel: cardLabels.signUp,
  },
};

export const IsLoading: Story = {
  args: {
    movies: movies,
    isLoading: true,
    activeTab: 1,
    ref: { current: null },
    onTabChange: fn(),
    heading: showcaseLabels.heading,
    emptyLabel: showcaseLabels.empty,
    loadingLabel: cardLabels.loading,
    mobileListAriaLabel: tabsLabels.mobileListAriaLabel,
    tabs: showcaseLabels.tabs,
    optionsPromptLabel: cardLabels.optionsPrompt,
    loginLabel: cardLabels.login,
    notAMemberLabel: cardLabels.notAMember,
    signUpLabel: cardLabels.signUp,
  },
};

export const NoMovies: Story = {
  args: {
    movies: [],
    isLoading: false,
    activeTab: 1,
    ref: { current: null },
    onTabChange: fn(),
    heading: showcaseLabels.heading,
    emptyLabel: showcaseLabels.empty,
    loadingLabel: cardLabels.loading,
    mobileListAriaLabel: tabsLabels.mobileListAriaLabel,
    tabs: showcaseLabels.tabs,
    optionsPromptLabel: cardLabels.optionsPrompt,
    loginLabel: cardLabels.login,
    notAMemberLabel: cardLabels.notAMember,
    signUpLabel: cardLabels.signUp,
  },
};
