"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { createBook } from "@/lib/actions/books";
import { NAME_DESCRIPTION_SCHEMA } from "@/lib/schemas/name-description";

export default function CreateBookPage() {
  const form = useForm<z.infer<typeof NAME_DESCRIPTION_SCHEMA>>({
    resolver: zodResolver(NAME_DESCRIPTION_SCHEMA),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const {
    setError,
    formState: { isSubmitting, errors },
  } = form;

  async function onSubmit(data: z.infer<typeof NAME_DESCRIPTION_SCHEMA>) {
    const response = await createBook(data);

    if (response.error) {
      setError("root", {
        message: response.error,
      });
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create new book</CardTitle>
          <CardDescription>
            Enter the name and description of your book below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="h-24">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Book Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Trip ABC"
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is the name of your book. It is suggested to be
                        unique.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="h-12"></div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Book Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Optional"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the description of your book.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="h-12 flex items-center justify-center">
                {errors.root?.message && !isSubmitting && (
                  <div className="text-red-500 text-sm text-center">
                    {errors.root?.message}
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
