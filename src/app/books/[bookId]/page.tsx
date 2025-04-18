import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";

import TotalExpenditureCard from "@/components/cards/total-expenditure-card";
import TotalByGroupPieChartCard from "@/components/charts/total-by-group-pie-chart-card";
import TrendChart from "@/components/charts/trend-chart";
import ExpenseTable from "@/components/tables/expense-table";
import { getExpensesCount } from "@/lib/db/expenses";

export default async function BookDashboardPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;

  const { data: expensesCount, error } = await getExpensesCount({
    bookId,
  });

  if (error) {
    redirect("/error");
  }

  if (expensesCount < 1) {
    redirect(`/books/${bookId}/expenses/create`);
  }

  return (
    <div className="h-full flex items-center justify-center">
      <div className="h-full max-w-[120rem] flex-1 flex flex-col p-8 gap-4">
        <h1 className="text-4xl">Dashboard</h1>
        <Button className="w-24" asChild>
          <Link href={`/books/${bookId}/expenses/create`}>Create</Link>
        </Button>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          <TotalExpenditureCard bookId={bookId} />
          <TotalExpenditureCard bookId={bookId} days={30} />
          <TotalByGroupPieChartCard bookId={bookId} />
          <TotalByGroupPieChartCard bookId={bookId} days={30} />
        </div>
        <TrendChart bookId={bookId} />
        <h2 className="text-2xl">Recent Expenses</h2>
        <ExpenseTable bookId={bookId} page={1} pageSize={5} />
      </div>
    </div>
  );
}
