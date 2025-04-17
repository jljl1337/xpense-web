"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table";
import TableRowDropdown from "@/components/table-row-dropdown";
import { deleteExpense } from "@/lib/actions/expenses";
import { Category, Expense, PaymentMethod } from "@/lib/db/types";
import { formatDateFromISO, formatDateTimeFromISO } from "@/lib/formats/date";

interface ExpenseTableClientProps {
  categories: Category[];
  paymentMethods: PaymentMethod[];
  expenses: Expense[];
}

export default function ExpenseTableClient({
  categories,
  paymentMethods,
  expenses,
}: ExpenseTableClientProps) {
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

  return <DataTable columns={columns} data={expenses} />;
}
