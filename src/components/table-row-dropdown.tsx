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

interface TableRowDropdownProps {
  editUrl: string;
  deleteAction: () => Promise<{ error: string | undefined }>;
}

export default function TableRowDropdown({
  editUrl,
  deleteAction,
}: TableRowDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && error) {
      setError(undefined);
    }
  };

  const handleDelete = async () => {
    setIsPending(true);

    const { error } = await deleteAction();

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
            <Link href={editUrl}>Edit</Link>
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
            Are you sure you want to delete this?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex flex-col w-full">
            <Button
              className="shrink self-end"
              variant={"destructive"}
              disabled={isPending}
              onClick={handleDelete}
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
