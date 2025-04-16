import { redirect } from "next/navigation";

import BookDashboardClientPage from "@/app/books/[bookId]/page-client";
import { searchParamToInt } from "@/lib/conversion";
import { getCategories } from "@/lib/db/categories";
import { getExpenses, getExpensesCount } from "@/lib/db/expenses";
import { getPaymentMethods } from "@/lib/db/payment-methods";

const PAGE_SIZE = 10;

export default async function BookDashboardPage({
  params,
  searchParams,
}: {
  params: Promise<{ bookId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { bookId } = await params;

  const awaitedSearchParams = await searchParams;

  const page = searchParamToInt(awaitedSearchParams.page, 1);

  const categoriesPromise = getCategories({ bookId });
  const paymentMethodsPromise = getPaymentMethods({ bookId });
  const expensesPromise = getExpenses({ bookId, page, page_size: PAGE_SIZE });
  const expensesCountPromise = getExpensesCount({ bookId });

  const [
    { data: categories, error: categoriesError },
    { data: paymentMethods, error: paymentMethodsError },
    { data: expenses, error: expensesError },
    { data: expensesCount, error: expensesCountError },
  ] = await Promise.all([
    categoriesPromise,
    paymentMethodsPromise,
    expensesPromise,
    expensesCountPromise,
  ]);

  if (
    categoriesError ||
    paymentMethodsError ||
    expensesError ||
    expensesCountError
  ) {
    redirect("/error");
  }

  const pageCount = Math.ceil(expensesCount / PAGE_SIZE);

  if (expensesCount > 0) {
    // If page is greater than pageCount, set it to pageCount
    if (page > pageCount) {
      redirect(`/books/${bookId}?page=${pageCount}`);
    }

    // If page is less than 1, set it to 1
    if (page < 1) {
      redirect(`/books/${bookId}`);
    }
  }

  return (
    <BookDashboardClientPage
      bookId={bookId}
      categories={categories}
      paymentMethods={paymentMethods}
      expenses={expenses}
      expensesCount={expensesCount}
      page={page}
      pageSize={PAGE_SIZE}
    />
  );
}
