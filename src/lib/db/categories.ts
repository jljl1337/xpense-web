import "server-only";

import { createClient } from "@/lib/db/server";

export async function createCategory(
  bookId: string,
  name: string,
  description: string,
) {
  const supabase = await createClient();

  const { error } = await supabase.rpc("create_category", {
    book_id: bookId,
    name,
    description,
  });

  return { error: error?.message };
}

export async function getCategories(bookId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_categories", {
    book_id: bookId,
  });

  return { data, error: error?.message };
}

export async function updateCategory(
  id: string,
  name: string,
  description: string,
) {
  const supabase = await createClient();

  const { error } = await supabase.rpc("update_category", {
    id,
    name,
    description,
  });

  return { error: error?.message };
}

export async function deleteCategory(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.rpc("delete_category", { id });

  return { error: error?.message };
}
