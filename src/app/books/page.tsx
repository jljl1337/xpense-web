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

  const page = searchParamToInt(params.page, 1);

  const booksPromise = getBooks({
    page,
    page_size: PAGE_SIZE,
  });
  const booksCountPromise = getBooksCount();

  const [
    { data: books, error: booksError },
    { data: booksCount, error: booksCountError },
  ] = await Promise.all([booksPromise, booksCountPromise]);

  if (booksError || booksCountError) {
    redirect("/error");
  }

  const pageCount = Math.ceil(booksCount / PAGE_SIZE);

  if (booksCount > 0) {
    // If page is greater than pageCount, set it to pageCount
    if (page > pageCount) {
      redirect(`/books?page=${pageCount}`);
    }

    // If page is less than 1, set it to 1
    if (page < 1) {
      redirect(`/books?page=1`);
    }
  }

  return (
    <BooksClientPage
      books={books}
      booksCount={booksCount}
      page={page}
      pageSize={PAGE_SIZE}
    />
  );
}
