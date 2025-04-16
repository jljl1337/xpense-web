"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { DataTable } from "@/components/data-table";
import Pagination from "@/components/pagination";
import TableRowDropdown from "@/components/table-row-dropdown";
import { deleteExpense } from "@/lib/actions/expenses";
import { Category, Expense, PaymentMethod } from "@/lib/db/types";
import { formatDateFromISO, formatDateTimeFromISO } from "@/lib/formats/date";

interface BookDashboardClientPageProps {
  bookId: string;
  categories: Category[];
  paymentMethods: PaymentMethod[];
  expenses: Expense[];
  expensesCount: number;
  page: number;
  pageSize: number;
}

export default function BookDashboardClientPage({
  bookId,
  categories,
  paymentMethods,
  expenses,
  expensesCount,
  page,
  pageSize,
}: BookDashboardClientPageProps) {
  const totalPages = Math.ceil(expensesCount / pageSize);
  const firstPageUrl = `/books/${bookId}?page=1`;
  const lastPageUrl = `/books/${bookId}?page=${totalPages}`;
  const previousPageUrl = page > 1 ? `/books/${bookId}?page=${page - 1}` : "";
  const nextPageUrl =
    page < totalPages ? `/books/${bookId}?page=${page + 1}` : "";

  const columns: ColumnDef<Expense>[] = [
    {
      accessorKey: "category_id",
      header: "Category",
      cell: ({ row }) => {
        return (
          <Link
            href={`/books/${row.original.book_id}/categories/${row.original.category_id}/edit`}
          >
            {
              categories.find(
                (category) => category.id === row.original.category_id,
              )!.name
            }
          </Link>
        );
      },
    },
    {
      accessorKey: "payment_method_id",
      header: "Payment Method",
      cell: ({ row }) => {
        return (
          <Link
            href={`/books/${row.original.book_id}/payment-methods/${row.original.payment_method_id}/edit`}
          >
            {
              paymentMethods.find(
                (method) => method.id === row.original.payment_method_id,
              )!.name
            }
          </Link>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const formatted = formatDateFromISO(row.original.date);

        return <div>{formatted}</div>;
      },
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      accessorKey: "remark",
      header: "Remark",
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => {
        const formatted = formatDateTimeFromISO(row.original.created_at);

        return <div>{formatted}</div>;
      },
    },
    {
      accessorKey: "updated_at",
      header: "Updated At",
      cell: ({ row }) => {
        const formatted = formatDateTimeFromISO(row.original.updated_at);

        return <div>{formatted}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const deleteAction = async () => {
          return deleteExpense({ id: row.original.id });
        };

        return (
          <TableRowDropdown
            editUrl={`/books/${row.original.book_id}/expenses/${row.original.id}/edit`}
            deleteAction={deleteAction}
          />
        );
      },
    },
  ];

  return (
    <div className="h-full flex items-center justify-center">
      <div className="h-full max-w-[120rem] flex-1 flex flex-col p-8 gap-4">
        <h1 className="text-4xl">Dashboard</h1>
        <Button className="w-24" asChild>
          <Link href={`/books/${bookId}/expenses/create`}>Create</Link>
        </Button>
        <DataTable columns={columns} data={expenses} />
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
