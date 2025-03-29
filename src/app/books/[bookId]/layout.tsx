import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { BookSidebar } from "@/components/sidebar";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;

  return (
    <SidebarProvider>
      <BookSidebar bookId={bookId} />
      <SidebarInset>
        <SidebarTrigger className="mx-2 my-2" />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
