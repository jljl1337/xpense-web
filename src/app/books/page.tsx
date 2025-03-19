import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";

import { isLoggedIn } from "@/lib/db/auth";
import { getBooks } from "@/lib/db/books";

export default async function BooksPage() {
  if (!(await isLoggedIn())) {
    redirect("/login");
  }

  const { data: books, error } = await getBooks();

  if (error) {
    redirect("/error");
  }

  return (
    <div className="h-full flex items-center justify-center">
      <div className="h-full max-w-[120rem] flex-1 flex flex-col p-8 gap-4">
        <h1 className="text-4xl">Books</h1>
        <Button className="w-24" asChild>
          <Link href="/books/create">Create</Link>
        </Button>
        {books?.map((book) => (
          <h2 key={book.id}>
            {book.name} {book.description}
          </h2>
        ))}
      </div>
    </div>
  );
}
