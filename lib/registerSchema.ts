import { z } from "zod";
import { FlatError } from "@/utils/flatError";

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export type RegisterErr = FlatError<typeof registerSchema>;
