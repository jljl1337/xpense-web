import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";

import ExpenseTable from "@/components/expense-table";
import Pagination from "@/components/pagination";
import { searchParamToInt, searchParamToString } from "@/lib/conversion";
import { getExpensesCount } from "@/lib/db/expenses";

const PAGE_SIZE = 20;

export default async function ExpensePage({
  params,
  searchParams,
}: {
  params: Promise<{ bookId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { bookId } = await params;

  const awaitedSearchParams = await searchParams;

  const page = searchParamToInt(awaitedSearchParams.page, 1)!;
  const categoryId = searchParamToString(awaitedSearchParams.categoryId);
  const paymentMethodId = searchParamToString(
    awaitedSearchParams.paymentMethodId,
  );
  const remark = searchParamToString(awaitedSearchParams.remark);

  const { data: expensesCount, error } = await getExpensesCount({
    bookId,
    categoryId,
    paymentMethodId,
    remark,
  });

  if (error) {
    redirect("/error");
  }

  const pageCount = Math.ceil(expensesCount / PAGE_SIZE);

  if (expensesCount > 0) {
    if (page < 1 || page > pageCount) {
      redirect(`/books/${bookId}/expenses`);
    }
  }

  const filterParams = new URLSearchParams();
  if (categoryId) {
    filterParams.append("categoryId", categoryId);
  }
  if (paymentMethodId) {
    filterParams.append("paymentMethodId", paymentMethodId);
  }
  if (remark) {
    filterParams.append("remark", remark);
  }

  const firstPageParams = filterParams;
  const lastPageParams = new URLSearchParams(filterParams);
  lastPageParams.append("page", pageCount.toString());
  const previousPageParams = new URLSearchParams(filterParams);
  previousPageParams.append("page", (page > 1 ? page - 1 : 1).toString());
  const nextPageParams = new URLSearchParams(filterParams);
  nextPageParams.append(
    "page",
    (page < pageCount ? page + 1 : pageCount).toString(),
  );

  const firstPageUrl = `/books/${bookId}/expenses?${firstPageParams.toString()}`;
  const lastPageUrl = `/books/${bookId}/expenses?${lastPageParams.toString()}`;
  const previousPageUrl = `/books/${bookId}/expenses?${previousPageParams.toString()}`;
  const nextPageUrl = `/books/${bookId}/expenses?${nextPageParams.toString()}`;

  return (
    <div className="h-full flex items-center justify-center">
      <div className="h-full max-w-[120rem] flex-1 flex flex-col p-8 gap-4">
        <h1 className="text-4xl">Expenses</h1>
        <Button className="w-24" asChild>
          <Link href={`/books/${bookId}/expenses/create`}>Create</Link>
        </Button>
        {expensesCount > 0 && <></>}
        <ExpenseTable
          bookId={bookId}
          page={page}
          pageSize={PAGE_SIZE}
          categoryId={categoryId}
          paymentMethodId={paymentMethodId}
          remark={remark}
        />
        <div className="self-end">
          {expensesCount > 0 && (
            <Pagination
              page={page}
              totalPages={pageCount}
              firstPageUrl={firstPageUrl}
              lastPageUrl={lastPageUrl}
              previousPageUrl={previousPageUrl}
              nextPageUrl={nextPageUrl}
            />
          )}
        </div>
      </div>
    </div>
  );
}
