"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { signIn as signInDB, signOut as signOutDB } from "@/lib/db/auth";

export async function signIn(formData: FormData) {
  // TODO: validate form data
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await signInDB(data);

  return { error };
}

export async function signOut() {
  await signOutDB();

  revalidatePath("/");
  redirect("/");
}
