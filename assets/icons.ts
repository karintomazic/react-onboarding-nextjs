import { z } from "zod";
import profileIcon from "./profile.svg";
import emoji1 from "./emoji1.svg";
import emoji2 from "./emoji2.svg";
import emoji3 from "./emoji3.svg";
import logo from "./logo.svg";
import plus from "./plus.svg";
import mobileLogo from "./mobile-logo.svg";

const staticImageDataSchema = z.object({
  src: z.string(),
  height: z.number(),
  width: z.number(),
  blurDataURL: z.string().optional(),
  blurWidth: z.number().optional(),
  blurHeight: z.number().optional(),
});

export const icons = {
  profileIcon: staticImageDataSchema.parse(profileIcon),
  emoji1: staticImageDataSchema.parse(emoji1),
  emoji2: staticImageDataSchema.parse(emoji2),
  emoji3: staticImageDataSchema.parse(emoji3),
  logo: staticImageDataSchema.parse(logo),
  plus: staticImageDataSchema.parse(plus),
  mobileLogo: staticImageDataSchema.parse(mobileLogo),
};
