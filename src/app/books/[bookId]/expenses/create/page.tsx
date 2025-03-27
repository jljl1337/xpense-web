import { redirect } from "next/navigation";

import { z } from "zod";

import ExpensePage from "@/components/pages/expense-page";
import { createExpense } from "@/lib/actions/expenses";
import { getCategories } from "@/lib/db/categories";
import { getPaymentMethods } from "@/lib/db/payment-methods";
import { EXPENSE_SCHEMA } from "@/lib/schemas/expense";

export default async function CreateExpensePage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;

  const categoriesPromise = getCategories(bookId);
  const paymentMethodsPromise = getPaymentMethods(bookId);

  const [
    { data: categories, error: categoriesError },
    { data: paymentMethods, error: paymentMethodsError },
  ] = await Promise.all([categoriesPromise, paymentMethodsPromise]);

  if (categoriesError || paymentMethodsError) {
    redirect("/error");
  }

  if (categories!.length === 0) {
    redirect(`/books/${bookId}/categories/create`);
  }
  if (paymentMethods!.length === 0) {
    redirect(`/books/${bookId}/payment-methods/create`);
  }

  const defaultCategoryId = categories![0].id;
  const defaultPaymentMethodId = paymentMethods![0].id;

  const defaultDate = new Date().toISOString();

  async function action(data: z.infer<typeof EXPENSE_SCHEMA>) {
    "use server";
    return createExpense({
      id: bookId,
      amount: data.amount,
      date: data.date,
      remark: data.remark,
      categoryId: data.categoryId,
      paymentMethodId: data.paymentMethodId,
    });
  }

  return (
    <ExpensePage
      categories={categories!}
      paymentMethods={paymentMethods!}
      title={"Create Expense"}
      description={"Create a new expense"}
      categoryIdValue={defaultCategoryId}
      paymentMethodIdValue={defaultPaymentMethodId}
      amountValue={0}
      dateValue={defaultDate}
      remarkValue={""}
      submitButtonLabel={"Create"}
      action={action}
    />
  );
}
