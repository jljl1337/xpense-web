import { z } from "zod";

export const LOGIN_IN_SCHEMA = z.object({
  email: z.string().email().trim(),
  password: z.string().min(1, "Required"),
});
