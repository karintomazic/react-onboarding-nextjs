import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import RegistrationFormComponent from "./RegistrationForm";
import { fn } from "storybook/test";

const meta = {
  title: "Component/molecules/RegistrationForm",
  component: RegistrationFormComponent,
  args: {
    handleSubmit: fn(),
    isSubmitting: false,
    allErrors: null,
    clearFieldError: fn(),
  },
} satisfies Meta<typeof RegistrationFormComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RegistrationForm: Story = {};

export const RegistrationFormErrorMessage: Story = {
  args: {
    allErrors: {
      fieldErrors: {
        email: ["Invalid email address"],
        password: ["Too small: expected string to have >=8 characters"],
      },
      formErrors: [],
    },
  },
};
export const RegistrationFormIsSubmitting: Story = {
  args: {
    isSubmitting: true,
  },
};

export const RegistrationFormFormError: Story = {
  args: {
    allErrors: {
      fieldErrors: {},
      formErrors: ["Email already registered"],
    },
  },
};
