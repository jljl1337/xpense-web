import { redirect } from "next/navigation";

import CategoriesClientPage from "@/app/books/[bookId]/categories/page-client";
import { getCategories } from "@/lib/db/categories";

export default async function CategoriesPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;

  const { data: categories, error } = await getCategories({ bookId });

  if (error) {
    redirect("/error");
  }

  return <CategoriesClientPage bookId={bookId} categories={categories!} />;
}
