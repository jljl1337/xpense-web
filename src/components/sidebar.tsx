"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import {
  Book,
  Download,
  Edit,
  LayoutDashboard,
  List,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { exportBookToCSV } from "@/lib/actions/books";

interface BookSidebarProps {
  bookId: string;
}

export function BookSidebar({ bookId }: BookSidebarProps) {
  const segment = useSelectedLayoutSegment();

  const handleDownload = async () => {
    const loadingToast = toast.loading("Exporting book data...");
    const { data: csvData, error } = await exportBookToCSV({ id: bookId });

    if (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to export book data");
      return;
    }

    const blob = new Blob([csvData!], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "xpense-data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.dismiss(loadingToast);
    toast.success("Book data exported successfully!");
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Contents</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key="dashboard">
                <SidebarMenuButton
                  asChild
                  isActive={segment === null || segment === "expenses"}
                >
                  <Link href={`/books/${bookId}`}>
                    <LayoutDashboard />
                    Dashboard
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem key="category">
                <SidebarMenuButton asChild isActive={segment === "categories"}>
                  <Link href={`/books/${bookId}/categories`}>
                    <List />
                    Categories
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem key="payment_method">
                <SidebarMenuButton
                  asChild
                  isActive={segment === "payment-methods"}
                >
                  <Link href={`/books/${bookId}/payment-methods`}>
                    <Wallet />
                    Payment Methods
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Books</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key="edit">
                <SidebarMenuButton asChild isActive={segment === "edit"}>
                  <Link href={`/books/${bookId}/edit`}>
                    <Edit />
                    Edit Book Details
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem key="bools">
                <SidebarMenuButton asChild>
                  <Link href="/books">
                    <Book />
                    View All Books
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem key="export">
                <SidebarMenuButton
                  className="cursor-pointer"
                  onClick={handleDownload}
                >
                  <Download />
                  Export Book Data
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
