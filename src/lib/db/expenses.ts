import { Expense } from "@/lib/db/types";

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

export async function getExpenses({
  id,
  bookId,
  categoryId,
  paymentMethodId,
  remark,
  page,
  page_size,
}: {
  id?: string;
  bookId?: string;
  categoryId?: string;
  paymentMethodId?: string;
  remark?: string;
  page?: number;
  page_size?: number;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_expenses", {
    id,
    book_id: bookId,
    category_id: categoryId,
    payment_method_id: paymentMethodId,
    remark,
    page,
    page_size,
  });

  return { data: data as Expense[], error: error?.message };
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

export async function getExpensesCount({
  bookId,
  categoryId,
  paymentMethodId,
  remark,
}: {
  bookId: string;
  categoryId?: string;
  paymentMethodId?: string;
  remark?: string;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_expenses_count", {
    book_id: bookId,
    category_id: categoryId,
    payment_method_id: paymentMethodId,
    remark,
  });

  return { data: data as number, error: error?.message };
}
