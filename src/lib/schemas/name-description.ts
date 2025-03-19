import { z } from "zod";

export const NAME_DESCRIPTION_SCHEMA = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name must contain at least 1 non-empty character(s)"),
  description: z.string().trim(),
});
