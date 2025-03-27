import { redirect } from "next/navigation";

import { z } from "zod";

import ExpensePage from "@/components/pages/expense-page";
import { updateExpense } from "@/lib/actions/expenses";
import { getCategories } from "@/lib/db/categories";
import { getExpenses } from "@/lib/db/expenses";
import { getPaymentMethods } from "@/lib/db/payment-methods";
import { EXPENSE_SCHEMA } from "@/lib/schemas/expense";

export default async function EditExpensePage({
  params,
}: {
  params: Promise<{ bookId: string; expenseId: string }>;
}) {
  const { bookId, expenseId } = await params;

  const categoriesPromise = getCategories(bookId);
  const paymentMethodsPromise = getPaymentMethods(bookId);
  const expensesPromise = getExpenses(bookId);

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

  if (categories!.length === 0) {
    redirect(`/books/${bookId}/categories/create`);
  }
  if (paymentMethods!.length === 0) {
    redirect(`/books/${bookId}/payment-methods/create`);
  }

  const expense = expenses!.find((expense) => expense.id === expenseId);

  if (!expense) {
    redirect(`/books/${bookId}`);
  }

  const expenseCategoryId = expense.category_id;
  const expensePaymentMethodId = expense.payment_method_id;

  const expenseUTCDate = new Date(expense.date);
  const expenseDate = new Date(
    expenseUTCDate.getUTCFullYear(),
    expenseUTCDate.getUTCMonth(),
    expenseUTCDate.getUTCDate(),
  ).toISOString();

  async function action(data: z.infer<typeof EXPENSE_SCHEMA>) {
    "use server";
    const response = await updateExpense({
      id: expenseId,
      amount: data.amount,
      date: data.date,
      remark: data.remark,
      categoryId: data.categoryId,
      paymentMethodId: data.paymentMethodId,
    });

    if (response.error) {
      return response;
    }

    redirect(`/books/${bookId}`);
  }

  return (
    <ExpensePage
      categories={categories!}
      paymentMethods={paymentMethods!}
      title={"Edit Expense"}
      description={"Edit an existing expense"}
      categoryIdValue={expenseCategoryId}
      paymentMethodIdValue={expensePaymentMethodId}
      amountValue={expense.amount}
      dateValue={expenseDate}
      remarkValue={expense.remark}
      submitButtonLabel={"Update"}
      action={action}
    />
  );
}
