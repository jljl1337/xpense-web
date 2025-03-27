import { z } from "zod";

import { ID_SCHEMA } from "@/lib/schemas/id";

export const EXPENSE_SCHEMA = z.object({
  categoryId: z.string().uuid().trim(),
  paymentMethodId: z.string().uuid().trim(),
  date: z.string().datetime(),
  amount: z.coerce.number(),
  remark: z.string().trim(),
});

export const ID_EXPENSE_SCHEMA = z.intersection(EXPENSE_SCHEMA, ID_SCHEMA);
