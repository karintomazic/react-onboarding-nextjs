import { z } from "zod";
import { FlatError } from "@/utils/flatError";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export type LoginErr = FlatError<typeof loginSchema>;
