import { redirect } from "next/navigation";

import BooksClientPage from "./page-client";

import { isLoggedIn } from "@/lib/db/auth";
import { getBooks } from "@/lib/db/books";

export default async function BooksPage() {
  if (!(await isLoggedIn())) {
    redirect("/login");
  }

  const { data: books, error } = await getBooks({});

  if (error) {
    redirect("/error");
  }

  return <BooksClientPage books={books!} />;
}
