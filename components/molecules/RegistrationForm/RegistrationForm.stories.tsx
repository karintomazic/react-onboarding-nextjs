import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import RegistrationFormComponent from "./RegistrationForm";
import { fn } from "storybook/test";

const meta = {
  title: "Component/molecules/RegistrationForm",
  component: RegistrationFormComponent,
  args: {
    handleSubmit: fn(),
    isSubmitting: false,
    error: "",
  },
} satisfies Meta<typeof RegistrationFormComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RegistrationForm: Story = {};

export const RegistrationFormErrorMessage: Story = {
  args: {
    error: "Something went wrong, please try again",
  },
};

export const RegistrationFormIsSubmitting: Story = {
  args: {
    isSubmitting: true,
  },
};
