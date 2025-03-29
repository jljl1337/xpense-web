"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { Book, Edit, LayoutDashboard, List, Wallet } from "lucide-react";

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

interface BookSidebarProps {
  bookId: string;
}

export function BookSidebar({ bookId }: BookSidebarProps) {
  const segment = useSelectedLayoutSegment();

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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
