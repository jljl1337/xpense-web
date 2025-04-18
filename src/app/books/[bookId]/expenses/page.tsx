import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";

import ExpenseTable from "@/components/expense-table";
import Pagination from "@/components/pagination";
import { searchParamToInt } from "@/lib/conversion";
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

  const page = searchParamToInt(awaitedSearchParams.page, 1);

  const { data: expensesCount, error } = await getExpensesCount({
    bookId,
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

  const totalPages = Math.ceil(expensesCount / PAGE_SIZE);
  const firstPageUrl = `/books/${bookId}/expenses?page=1`;
  const lastPageUrl = `/books/${bookId}/expenses?page=${totalPages}`;
  const previousPageUrl =
    page > 1 ? `/books/${bookId}/expenses?page=${page - 1}` : "";
  const nextPageUrl =
    page < totalPages ? `/books/${bookId}/expenses?page=${page + 1}` : "";

  return (
    <div className="h-full flex items-center justify-center">
      <div className="h-full max-w-[120rem] flex-1 flex flex-col p-8 gap-4">
        <h1 className="text-4xl">Expenses</h1>
        <Button className="w-24" asChild>
          <Link href={`/books/${bookId}/expenses/create`}>Create</Link>
        </Button>
        {expensesCount > 0 && <></>}
        <ExpenseTable bookId={bookId} page={page} pageSize={PAGE_SIZE} />
        <div className="self-end">
          {expensesCount > 0 && (
            <Pagination
              page={page}
              totalPages={totalPages}
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
