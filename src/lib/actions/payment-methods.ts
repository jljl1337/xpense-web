"use server";

import { revalidatePath } from "next/cache";

import { z } from "zod";

import {
  createPaymentMethod as createPaymentMethodDB,
  deletePaymentMethod as deletePaymentMethodDB,
  updatePaymentMethod as updatePaymentMethodDB,
} from "@/lib/db/payment-methods";
import { ID_SCHEMA } from "@/lib/schemas/id";
import { ID_NAME_DESCRIPTION_SCHEMA } from "@/lib/schemas/name-description";

export async function createPaymentMethod(
  data: z.infer<typeof ID_NAME_DESCRIPTION_SCHEMA>,
) {
  const dataValidation = ID_NAME_DESCRIPTION_SCHEMA.safeParse(data);

  if (!dataValidation.success) {
    return { error: "Please enter a valid name and description." };
  }

  const response = await createPaymentMethodDB(
    dataValidation.data.id, // bookId
    dataValidation.data.name,
    dataValidation.data.description,
  );

  if (!response.error) {
    revalidatePath(`/books/${dataValidation.data.id}`);
  }

  return response;
}

export async function updatePaymentMethod(
  data: z.infer<typeof ID_NAME_DESCRIPTION_SCHEMA>,
) {
  const dataValidation = ID_NAME_DESCRIPTION_SCHEMA.safeParse(data);

  if (!dataValidation.success) {
    return { error: "Please enter a valid name and description." };
  }

  const response = await updatePaymentMethodDB(
    dataValidation.data.id, // paymentMethodId
    dataValidation.data.name,
    dataValidation.data.description,
  );

  if (!response.error) {
    revalidatePath("/books");
  }

  return response;
}

export async function deletePaymentMethod(data: z.infer<typeof ID_SCHEMA>) {
  const dataValidation = ID_SCHEMA.safeParse(data);

  if (!dataValidation.success) {
    return { error: "Please enter a valid ID." };
  }

  const response = await deletePaymentMethodDB(dataValidation.data.id);

  if (!response.error) {
    revalidatePath("/books");
  }

  return response;
}
