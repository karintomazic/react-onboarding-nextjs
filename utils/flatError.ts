import { z } from "zod";
export type FlatError<T extends z.ZodType> = z.core.$ZodFlattenedError<
  z.output<T>
>;
