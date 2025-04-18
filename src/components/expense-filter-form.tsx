import { redirect } from "next/navigation";

import ExpenseFilterFormClient from "@/components/expense-filter-form-client";
import { getCategories } from "@/lib/db/categories";
import { getPaymentMethods } from "@/lib/db/payment-methods";

interface ExpenseFilterFormProps {
  bookId: string;
  categoryId?: string;
  paymentMethodId?: string;
  remark?: string;
}

export default async function ExpenseFilterForm({
  bookId,
  categoryId,
  paymentMethodId,
  remark,
}: ExpenseFilterFormProps) {
  const categoriesPromise = getCategories({ bookId });
  const paymentMethodsPromise = getPaymentMethods({ bookId });

  const [
    { data: categories, error: categoriesError },
    { data: paymentMethods, error: paymentMethodsError },
  ] = await Promise.all([categoriesPromise, paymentMethodsPromise]);

  if (categoriesError || paymentMethodsError) {
    redirect("/error");
  }

  return (
    <ExpenseFilterFormClient
      bookId={bookId}
      categories={categories}
      paymentMethods={paymentMethods}
      categoryId={categoryId}
      paymentMethodId={paymentMethodId}
      remark={remark}
    />
  );
}
