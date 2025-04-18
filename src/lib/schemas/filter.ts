import { z } from "zod";

export const FILTER_SCHEMA = z.object({
  categoryId: z.string().uuid().trim().optional(),
  paymentMethodId: z.string().uuid().trim().optional(),
  remark: z.string().trim().optional(),
});
