import { Book } from "@/lib/db/types";

import "server-only";

import { createClient } from "@/lib/db/server";

export async function createBook(name: string, description: string) {
  const supabase = await createClient();

  const { error } = await supabase.rpc("create_book", {
    name,
    description,
  });

  return { error: error?.message };
}

export async function getBooks({
  id,
  page,
  page_size,
}: {
  id?: string;
  page?: number;
  page_size?: number;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_books", {
    id,
    page,
    page_size,
  });

  return { data: data as Book[], error: error?.message };
}

export async function updateBook(
  id: string,
  name: string,
  description: string,
) {
  const supabase = await createClient();

  const { error } = await supabase.rpc("update_book", {
    id,
    name,
    description,
  });

  return { error: error?.message };
}

export async function deleteBook(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.rpc("delete_book", { id });

  return { error: error?.message };
}

export async function getBooksCount() {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_books_count");

  return { data: data as number, error: error?.message };
}
