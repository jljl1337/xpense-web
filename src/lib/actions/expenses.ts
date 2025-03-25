"use server";

import { revalidatePath } from "next/cache";

import { z } from "zod";

import { deleteExpense as deleteExpenseDB } from "@/lib/db/expenses";
import { ID_SCHEMA } from "@/lib/schemas/id";

export async function deleteExpense(data: z.infer<typeof ID_SCHEMA>) {
  const dataValidation = ID_SCHEMA.safeParse(data);

  if (!dataValidation.success) {
    return { error: "Please enter a valid ID." };
  }

  const response = await deleteExpenseDB(dataValidation.data.id);

  revalidatePath("/books");

  return response;
}
