import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MovieInfoComponent from "./MovieInfo";

const meta = {
  title: "Component/molecules/MovieInfo",
  component: MovieInfoComponent,
} satisfies Meta<typeof MovieInfoComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MovieInfo: Story = {
  args: {
    tagline: "Icons reign forever.",
    overview:
      "Andy Sachs returns to Runway as Miranda Priestly navigates a new media landscape and Runway's position within. The duo reconnect with former assistant Emily Charlton, now the head of a luxury brand that possesses funding which could ensure Runway's survival.",
    overviewHeading: "Overview",
  },
};
