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

import { NAME_DESCRIPTION_SCHEMA } from "@/lib/schemas/name-description";

interface NameDescriptionPageProps {
  title: string;
  description: string;
  nameValue: string;
  descriptionValue: string;
  nameFieldLabel: string;
  descriptionFieldLabel: string;
  nameFieldPlaceholder: string;
  descriptionFieldPlaceholder: string;
  nameFieldDescription: string;
  descriptionFieldDescription: string;
  submitButtonLabel: string;
  action: (
    data: z.infer<typeof NAME_DESCRIPTION_SCHEMA>,
  ) => Promise<{ error?: string }>;
}

export default function NameDescriptionPage({
  title,
  description,
  nameValue,
  descriptionValue,
  nameFieldLabel,
  descriptionFieldLabel,
  nameFieldPlaceholder,
  descriptionFieldPlaceholder,
  nameFieldDescription,
  descriptionFieldDescription,
  submitButtonLabel,
  action,
}: NameDescriptionPageProps) {
  const form = useForm<z.infer<typeof NAME_DESCRIPTION_SCHEMA>>({
    resolver: zodResolver(NAME_DESCRIPTION_SCHEMA),
    defaultValues: {
      name: nameValue,
      description: descriptionValue,
    },
  });

  const {
    setError,
    formState: { isSubmitting, errors },
  } = form;

  async function onSubmit(data: z.infer<typeof NAME_DESCRIPTION_SCHEMA>) {
    const response = await action(data);

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
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
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
                      <FormLabel>{nameFieldLabel}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={nameFieldPlaceholder}
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>{nameFieldDescription}</FormDescription>
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
                    <FormLabel>{descriptionFieldLabel}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={descriptionFieldPlaceholder}
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {descriptionFieldDescription}
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
                  {submitButtonLabel}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
