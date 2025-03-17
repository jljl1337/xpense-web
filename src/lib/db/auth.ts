import "server-only";

import { createClient } from "@/lib/db/server";

export async function isLoggedIn() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user !== null;
}

export async function signIn(data: { email: string; password: string }) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(data);

  return { error };
}

export async function signUp(data: { email: string; password: string }) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp(data);

  return { error };
}

export async function signOut() {
  const supabase = await createClient();

  await supabase.auth.signOut();
}
