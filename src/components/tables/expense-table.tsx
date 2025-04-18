import { redirect } from "next/navigation";

import ExpenseTableClient from "@/components/tables/expense-table-client";
import { getCategories } from "@/lib/db/categories";
import { getExpenses } from "@/lib/db/expenses";
import { getPaymentMethods } from "@/lib/db/payment-methods";

interface ExpenseTableProps {
  bookId: string;
  categoryId?: string;
  paymentMethodId?: string;
  remark?: string;
  page: number;
  pageSize: number;
}

export default async function ExpenseTable({
  bookId,
  categoryId,
  paymentMethodId,
  remark,
  page,
  pageSize,
}: ExpenseTableProps) {
  const categoriesPromise = getCategories({ bookId });
  const paymentMethodsPromise = getPaymentMethods({ bookId });
  const expensesPromise = getExpenses({
    bookId,
    page,
    page_size: pageSize,
    categoryId,
    paymentMethodId,
    remark,
  });

  const [
    { data: categories, error: categoriesError },
    { data: paymentMethods, error: paymentMethodsError },
    { data: expenses, error: expensesError },
  ] = await Promise.all([
    categoriesPromise,
    paymentMethodsPromise,
    expensesPromise,
  ]);

  if (categoriesError || paymentMethodsError || expensesError) {
    redirect("/error");
  }

  return (
    <ExpenseTableClient
      categories={categories}
      paymentMethods={paymentMethods}
      expenses={expenses}
    />
  );
}
