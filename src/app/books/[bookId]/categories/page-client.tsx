"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { DataTable } from "@/components/data-table";
import TableRowDropdown from "@/components/table-row-dropdown";
import { deleteCategory } from "@/lib/actions/categories";
import { Category } from "@/lib/db/types";
import { formatDateTimeFromISO } from "@/lib/formats/date";

interface CategoriesClientPageProps {
  bookId: string;
  categories: Category[];
}

const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <Link
          href={`/books/${row.original.book_id}/categories/${row.original.id}/edit`}
        >
          {row.original.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
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
    id: "actions",
    cell: ({ row }) => {
      const deleteAction = async () => {
        return deleteCategory({ id: row.original.id });
      };

      return (
        <TableRowDropdown
          editUrl={`/books/${row.original.book_id}/categories/${row.original.id}/edit`}
          deleteAction={deleteAction}
        />
      );
    },
  },
];

export default function CategoriesClientPage({
  bookId,
  categories,
}: CategoriesClientPageProps) {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="h-full max-w-[120rem] flex-1 flex flex-col p-8 gap-4">
        <h1 className="text-4xl">Categories</h1>
        <Button className="w-24" asChild>
          <Link href={`/books/${bookId}/categories/create`}>Create</Link>
        </Button>
        <DataTable columns={columns} data={categories} />
      </div>
    </div>
  );
}
