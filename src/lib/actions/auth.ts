"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { z } from "zod";

import { signIn as signInDB, signOut as signOutDB } from "@/lib/db/auth";

const SIGN_IN_FORMDATA_SCHEMA = z.object({
  email: z.string().email().trim(),
  password: z.string().trim(),
});

export async function signIn(formData: FormData) {
  const formDataValidation = SIGN_IN_FORMDATA_SCHEMA.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  formDataValidation.error?.message;
  if (!formDataValidation.success) {
    return "Please enter a valid email and password.";
  }

  const { error } = await signInDB(formDataValidation.data);

  if (error) {
    return error.message;
  }

  revalidatePath("/", "layout");
  redirect("/books");
}

export async function signOut() {
  await signOutDB();

  revalidatePath("/");
  redirect("/");
}
