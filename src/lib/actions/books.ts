"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { z } from "zod";

import {
  createBook as createBookDB,
  deleteBook as deleteBookDB,
} from "@/lib/db/books";
import { ID_SCHEMA } from "@/lib/schemas/id";
import { NAME_DESCRIPTION_SCHEMA } from "@/lib/schemas/name-description";

export async function createBook(
  data: z.infer<typeof NAME_DESCRIPTION_SCHEMA>,
) {
  const dataValidation = NAME_DESCRIPTION_SCHEMA.safeParse(data);

  if (!dataValidation.success) {
    return { error: "Please enter a valid name and description." };
  }

  const response = await createBookDB(
    dataValidation.data.name,
    dataValidation.data.description,
  );

  if (response.error) {
    return response;
  }

  revalidatePath("/books");
  redirect("/books");
}

export async function deleteBook(data: z.infer<typeof ID_SCHEMA>) {
  const dataValidation = ID_SCHEMA.safeParse(data);

  if (!dataValidation.success) {
    return { error: "Please enter a valid ID." };
  }

  const response = await deleteBookDB(dataValidation.data.id);

  if (response.error) {
    return response;
  }

  revalidatePath("/books");
  redirect("/books");
}
