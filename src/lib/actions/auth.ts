"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { z } from "zod";

import { signIn as signInDB, signOut as signOutDB } from "@/lib/db/auth";
import { LOGIN_IN_SCHEMA } from "@/lib/schemas/login-in";

export async function signIn(data: z.infer<typeof LOGIN_IN_SCHEMA>) {
  const formDataValidation = LOGIN_IN_SCHEMA.safeParse(data);

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
