"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { DateTime } from "luxon";

import { Button } from "@/components/ui/button";

import { DataTable } from "@/components/data-table";
import TableRowDropdown from "@/components/table-row-dropdown";
import { deleteBook } from "@/lib/actions/books";
import { Book } from "@/lib/db/types";

const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <Link href={`/books/${row.original.id}`}>{row.original.name}</Link>
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
      const formatted = DateTime.fromISO(row.original.created_at).toFormat(
        "yyyy-MM-dd HH:mm:ss",
      );

      return <div>{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const deleteAction = async () => {
        return deleteBook({ id: row.original.id });
      };

      return (
        <TableRowDropdown
          editUrl={`/books/${row.original.id}/edit`}
          deleteAction={deleteAction}
        />
      );
    },
  },
];

interface BooksClientPageProps {
  books: Book[];
}

export default function BooksClientPage({ books }: BooksClientPageProps) {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="h-full max-w-[120rem] flex-1 flex flex-col p-8 gap-4">
        <h1 className="text-4xl">Books</h1>
        <Button className="w-24" asChild>
          <Link href="/books/create">Create</Link>
        </Button>
        <DataTable columns={columns} data={books} />
      </div>
    </div>
  );
}
