import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";

import ExpenseTable from "@/components/expense-table";
import Pagination from "@/components/pagination";
import TotalByGroupPieChartCard from "@/components/total-by-group-pie-chart-card";
import TotalExpenditureCard from "@/components/total-expenditure-card";
import TrendChart from "@/components/trend-chart";
import { searchParamToInt } from "@/lib/conversion";
import { getExpensesCount } from "@/lib/db/expenses";

const PAGE_SIZE = 5;

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

  const { data: expensesCount, error } = await getExpensesCount({
    bookId,
  });

  if (error) {
    redirect("/error");
  }

  const pageCount = Math.ceil(expensesCount / PAGE_SIZE);

  if (expensesCount > 0) {
    if (page < 1 || page > pageCount) {
      redirect(`/books/${bookId}`);
    }
  }

  const totalPages = Math.ceil(expensesCount / PAGE_SIZE);
  const firstPageUrl = `/books/${bookId}?page=1`;
  const lastPageUrl = `/books/${bookId}?page=${totalPages}`;
  const previousPageUrl = page > 1 ? `/books/${bookId}?page=${page - 1}` : "";
  const nextPageUrl =
    page < totalPages ? `/books/${bookId}?page=${page + 1}` : "";

  return (
    <div className="h-full flex items-center justify-center">
      <div className="h-full max-w-[120rem] flex-1 flex flex-col p-8 gap-4">
        <h1 className="text-4xl">Dashboard</h1>
        <Button className="w-24" asChild>
          <Link href={`/books/${bookId}/expenses/create`}>Create</Link>
        </Button>
        {expensesCount > 0 && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
              <TotalExpenditureCard bookId={bookId} />
              <TotalExpenditureCard bookId={bookId} days={30} />
              <TotalByGroupPieChartCard bookId={bookId} />
              <TotalByGroupPieChartCard bookId={bookId} days={30} />
            </div>
            <TrendChart bookId={bookId} />
          </>
        )}
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
