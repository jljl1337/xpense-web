import { redirect } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { BookSidebar } from "@/components/sidebar";
import { getBooks } from "@/lib/db/books";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;

  const { data: books, error } = await getBooks({ id: bookId });

  if (error) {
    redirect("/error");
  }

  return (
    <SidebarProvider>
      <BookSidebar bookId={bookId} />
      <SidebarInset>
        <div className="mx-2 my-2 flex items-center">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mx-2 h-4" />
          <div>{books[0].name}</div>
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
