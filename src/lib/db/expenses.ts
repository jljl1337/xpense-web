import "server-only";

import { createClient } from "@/lib/db/server";

export async function createExpense(
  bookId: string,
  categoryId: string,
  paymentMethodId: string,
  date: string,
  amount: number,
  remark: string,
) {
  const supabase = await createClient();

  const { error } = await supabase.rpc("create_expense", {
    book_id: bookId,
    category_id: categoryId,
    payment_method_id: paymentMethodId,
    date,
    amount,
    remark,
  });

  return { error: error?.message };
}

export async function getExpenses(bookId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_expenses", {
    book_id: bookId,
  });

  return { data, error: error?.message };
}

export async function updateExpense(
  id: string,
  categoryId: string,
  paymentMethodId: string,
  date: string,
  amount: number,
  remark: string,
) {
  const supabase = await createClient();

  const { error } = await supabase.rpc("update_expense", {
    id,
    category_id: categoryId,
    payment_method_id: paymentMethodId,
    date,
    amount,
    remark,
  });

  return { error: error?.message };
}

export async function deleteExpense(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.rpc("delete_expense", { id });

  return { error: error?.message };
}
