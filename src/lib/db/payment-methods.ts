import { PaymentMethod } from "@/lib/db/types";

import "server-only";

import { createClient } from "@/lib/db/server";

export async function createPaymentMethod(
  bookId: string,
  name: string,
  description: string,
) {
  const supabase = await createClient();

  const { error } = await supabase.rpc("create_payment_method", {
    book_id: bookId,
    name,
    description,
  });

  return { error: error?.message };
}

export async function getPaymentMethods({
  id,
  bookId,
}: {
  id?: string;
  bookId?: string;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_payment_methods", {
    id,
    book_id: bookId,
  });

  return { data: data as PaymentMethod[], error: error?.message };
}

export async function updatePaymentMethod(
  id: string,
  name: string,
  description: string,
) {
  const supabase = await createClient();

  const { error } = await supabase.rpc("update_payment_method", {
    id,
    name,
    description,
  });

  return { error: error?.message };
}

export async function deletePaymentMethod(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.rpc("delete_payment_method", { id });

  return { error: error?.message };
}
