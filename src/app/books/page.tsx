import { redirect } from "next/navigation";

import BooksClientPage from "./page-client";

import { searchParamToInt } from "@/lib/conversion";
import { isLoggedIn } from "@/lib/db/auth";
import { getBooks, getBooksCount } from "@/lib/db/books";

const PAGE_SIZE = 10;

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  if (!(await isLoggedIn())) {
    redirect("/login");
  }

  const params = await searchParams;

  // If params.page is string[] or undefined or is not a number, set it to 1
  const page = searchParamToInt(params.page, 1);

  const { data: books, error: booksError } = await getBooks({
    page,
    page_size: PAGE_SIZE,
  });
  const { data: booksCount, error: booksCountError } = await getBooksCount();

  if (booksError || booksCountError) {
    redirect("/error");
  }

  const pageCount = Math.ceil(booksCount / PAGE_SIZE);

  // If page is greater than pageCount, set it to pageCount
  if (page > pageCount) {
    redirect(`/books?page=${pageCount}`);
  }

  return (
    <BooksClientPage
      books={books!}
      booksCount={booksCount}
      page={page}
      pageSize={PAGE_SIZE}
    />
  );
}
