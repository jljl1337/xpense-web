import { redirect } from "next/navigation";

import BookDashboardClientPage from "@/app/books/[bookId]/page-client";
import { getCategories } from "@/lib/db/categories";
import { getExpenses } from "@/lib/db/expenses";
import { getPaymentMethods } from "@/lib/db/payment-methods";

export default async function BookDashboardPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;

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

  return (
    <BookDashboardClientPage
      bookId={bookId}
      categories={categories!}
      paymentMethods={paymentMethods!}
      expenses={expenses!}
    />
  );
}
