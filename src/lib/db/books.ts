import "server-only";

import { createClient } from "@/lib/db/server";

export async function createBook(name: string, description: string) {
  const supabase = await createClient();

  const { error } = await supabase.rpc("create_book", {
    name,
    description,
  });

  if (error) {
    return { error: error.message };
  }
}

export async function getBooks() {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_books");

  return { data, error: error?.message };
}
