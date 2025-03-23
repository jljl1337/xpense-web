"use client";

import { useState } from "react";

import Link from "next/link";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { deleteBook } from "@/lib/actions/books";

interface BookDropdownProps {
  id: string;
}

export default function BookDropdown({ id }: BookDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && error) {
      setError(undefined);
    }
  };

  const handleDeleteBook = async () => {
    setIsPending(true);

    const { error } = await deleteBook({ id });

    setIsPending(false);

    if (!error) {
      setIsOpen(false);
    }
    setError(error);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/books/${id}`}>Open</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/books/${id}/edit`}>Edit</Link>
          </DropdownMenuItem>
          <DialogTrigger asChild>
            <DropdownMenuItem className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this book?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex flex-col w-full">
            <Button
              className="shrink self-end"
              variant={"destructive"}
              disabled={isPending}
              onClick={handleDeleteBook}
            >
              Confirm
            </Button>
            <p className="self-center text-destructive">{error && error}</p>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
