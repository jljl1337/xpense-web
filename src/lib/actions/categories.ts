"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { z } from "zod";

import {
  createCategory as createCategoryDB,
  deleteCategory as deleteCategoryDB,
  updateCategory as updateCategoryDB,
} from "@/lib/db/categories";
import { ID_SCHEMA } from "@/lib/schemas/id";
import { ID_NAME_DESCRIPTION_SCHEMA } from "@/lib/schemas/name-description";

export async function createCategory(
  data: z.infer<typeof ID_NAME_DESCRIPTION_SCHEMA>,
) {
  const dataValidation = ID_NAME_DESCRIPTION_SCHEMA.safeParse(data);

  if (!dataValidation.success) {
    return { error: "Please enter a valid name and description." };
  }

  const response = await createCategoryDB(
    dataValidation.data.id, // bookId
    dataValidation.data.name,
    dataValidation.data.description,
  );

  if (response.error) {
    return response;
  }

  revalidatePath(`/books/${dataValidation.data.id}`);
  redirect(`/books/${dataValidation.data.id}/categories`);
}

export async function updateCategory(
  data: z.infer<typeof ID_NAME_DESCRIPTION_SCHEMA>,
) {
  const dataValidation = ID_NAME_DESCRIPTION_SCHEMA.safeParse(data);

  if (!dataValidation.success) {
    return { error: "Please enter a valid name and description." };
  }

  const response = await updateCategoryDB(
    dataValidation.data.id, // categoryId
    dataValidation.data.name,
    dataValidation.data.description,
  );

  revalidatePath("/books");

  return response;
}

export async function deleteCategory(data: z.infer<typeof ID_SCHEMA>) {
  const dataValidation = ID_SCHEMA.safeParse(data);

  if (!dataValidation.success) {
    return { error: "Please enter a valid ID." };
  }

  const response = await deleteCategoryDB(dataValidation.data.id);

  revalidatePath("/books");

  return response;
}
