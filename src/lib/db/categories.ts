import { Category } from "@/lib/db/types";

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

export async function getCategories({
  id,
  bookId,
}: {
  id?: string;
  bookId?: string;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_categories", {
    id,
    book_id: bookId,
  });

  return { data: data as Category[], error: error?.message };
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
