import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PersonCardComponent from "./PersonCard";
import placeholderPoster from "../../../assets/placeholder-poster.jpg";

const meta = {
  title: "Component/atoms/PersonCard",
  component: PersonCardComponent,
} satisfies Meta<typeof PersonCardComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PersonCard: Story = {
  args: {
    name: "Anna Smith",
    department: "Directing",
    profileImg: "",
    known_for: ["Movie name"],
  },
};

export const PersonCardWithImg: Story = {
  args: {
    name: "Anna Smith",
    department: "Acting",
    profileImg: placeholderPoster,
    known_for: ["Movie name"],
  },
};
