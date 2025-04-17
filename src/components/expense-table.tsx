import { redirect } from "next/navigation";

import ExpenseTableClient from "@/components/expense-table-client";
import { getCategories } from "@/lib/db/categories";
import { getExpenses } from "@/lib/db/expenses";
import { getPaymentMethods } from "@/lib/db/payment-methods";

interface ExpenseTableProps {
  bookId: string;
  page: number;
  pageSize: number;
}

export default async function ExpenseTable({
  bookId,
  page,
  pageSize,
}: ExpenseTableProps) {
  const categoriesPromise = getCategories({ bookId });
  const paymentMethodsPromise = getPaymentMethods({ bookId });
  const expensesPromise = getExpenses({ bookId, page, page_size: pageSize });

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
