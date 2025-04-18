"use server";

import { revalidatePath } from "next/cache";

import { z } from "zod";

import {
  createExpense as createExpenseDB,
  deleteExpense as deleteExpenseDB,
  updateExpense as updateExpenseDB,
} from "@/lib/db/expenses";
import { formatUTCMidnightDateTimeFromISO } from "@/lib/formats/date";
import { ID_EXPENSE_SCHEMA } from "@/lib/schemas/expense";
import { ID_SCHEMA } from "@/lib/schemas/id";

export async function createExpense(data: z.infer<typeof ID_EXPENSE_SCHEMA>) {
  const dataValidation = ID_EXPENSE_SCHEMA.safeParse(data);

  if (!dataValidation.success) {
    return { error: "Please enter a valid expense." };
  }

  const response = await createExpenseDB(
    dataValidation.data.id, // bookId
    dataValidation.data.categoryId,
    dataValidation.data.paymentMethodId,
    formatUTCMidnightDateTimeFromISO(dataValidation.data.date),
    dataValidation.data.amount,
    dataValidation.data.remark,
  );

  if (!response.error) {
    revalidatePath(`/books/${dataValidation.data.id}`);
  }

  return response;
}

export async function updateExpense(data: z.infer<typeof ID_EXPENSE_SCHEMA>) {
  const dataValidation = ID_EXPENSE_SCHEMA.safeParse(data);

  if (!dataValidation.success) {
    return { error: "Please enter a valid expense." };
  }

  const response = await updateExpenseDB(
    dataValidation.data.id, // expenseId
    dataValidation.data.categoryId,
    dataValidation.data.paymentMethodId,
    formatUTCMidnightDateTimeFromISO(dataValidation.data.date),
    dataValidation.data.amount,
    dataValidation.data.remark,
  );

  if (!response.error) {
    revalidatePath("/books");
  }

  return response;
}

export async function deleteExpense(data: z.infer<typeof ID_SCHEMA>) {
  const dataValidation = ID_SCHEMA.safeParse(data);

  if (!dataValidation.success) {
    return { error: "Please enter a valid ID." };
  }

  const response = await deleteExpenseDB(dataValidation.data.id);

  if (!response.error) {
    revalidatePath("/books");
  }

  return response;
}
