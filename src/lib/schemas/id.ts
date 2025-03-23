import { z } from "zod";

export const ID_SCHEMA = z.object({
  id: z.string().trim().uuid(),
});
