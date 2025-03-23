import { z } from "zod";

import { ID_SCHEMA } from "@/lib/schemas/id";

export const NAME_DESCRIPTION_SCHEMA = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name must contain at least 1 non-empty character(s)"),
  description: z.string().trim(),
});

export const ID_NAME_DESCRIPTION_SCHEMA = z.intersection(
  NAME_DESCRIPTION_SCHEMA,
  ID_SCHEMA,
);
