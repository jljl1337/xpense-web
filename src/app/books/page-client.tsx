"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { DataTable } from "@/components/data-table";
import Pagination from "@/components/pagination";
import TableRowDropdown from "@/components/table-row-dropdown";
import { deleteBook } from "@/lib/actions/books";
import { Book } from "@/lib/db/types";
import { formatDateTimeFromISO } from "@/lib/formats/date";

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
  booksCount: number;
  page: number;
  pageSize: number;
}

export default function BooksClientPage({
  books,
  booksCount,
  page,
  pageSize,
}: BooksClientPageProps) {
  const totalPages = Math.ceil(booksCount / pageSize);
  const firstPageUrl = `/books?page=1`;
  const lastPageUrl = `/books?page=${totalPages}`;
  const previousPageUrl = page > 1 ? `/books?page=${page - 1}` : "";
  const nextPageUrl = page < totalPages ? `/books?page=${page + 1}` : "";

  return (
    <div className="h-full flex items-center justify-center">
      <div className="h-full max-w-[120rem] flex-1 flex flex-col p-8 gap-4">
        <h1 className="text-4xl">Books</h1>
        <Button className="w-24" asChild>
          <Link href="/books/create">Create</Link>
        </Button>
        <DataTable columns={columns} data={books} />
        <div className="self-end">
          {booksCount > 0 && (
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
