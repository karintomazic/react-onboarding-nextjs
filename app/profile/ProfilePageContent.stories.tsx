import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ProfilePageContentComponent from "./ProfilePageContent";
import { http, HttpResponse } from "msw";

const meta = {
  title: "Component/pages/ProfilePageContent",
  component: ProfilePageContentComponent,
  args: {
    email: "test@nowhere.never",
  },
  parameters: {
    msw: {
      handlers: [
        http.delete(
          "/api/account",
          () => new HttpResponse(null, { status: 204 }),
        ),
        // mocks fetch crf token before sign out
        http.get("/api/auth/csrf", () =>
          HttpResponse.json({ csrfToken: "mock" }),
        ),
        http.post("/api/auth/signout", () => HttpResponse.json({})),
        http.get("/api/auth/session", () => HttpResponse.json({})),
      ],
    },
  },
} satisfies Meta<typeof ProfilePageContentComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProfilePageContent: Story = {};

export const DeleteAccountOpensModal: Story = {
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: /Delete account/i });
    await userEvent.click(button);
  },
};
