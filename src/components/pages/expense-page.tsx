"use client";

import { DatePicker } from "../date-picker";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Category, PaymentMethod } from "@/lib/db/types";
import { EXPENSE_SCHEMA } from "@/lib/schemas/expense";

interface ExpensePageProps {
  categories: Category[];
  paymentMethods: PaymentMethod[];
  title: string;
  description: string;
  categoryIdValue: string;
  paymentMethodIdValue: string;
  amountValue: number;
  dateValue: string;
  remarkValue: string;
  submitButtonLabel: string;
  action: (data: z.infer<typeof EXPENSE_SCHEMA>) => Promise<{ error?: string }>;
}

export default function ExpensePage({
  categories,
  paymentMethods,
  title,
  description,
  categoryIdValue,
  paymentMethodIdValue,
  amountValue,
  dateValue,
  remarkValue,
  submitButtonLabel,
  action,
}: ExpensePageProps) {
  const form = useForm<z.infer<typeof EXPENSE_SCHEMA>>({
    resolver: zodResolver(EXPENSE_SCHEMA),
    defaultValues: {
      categoryId: categoryIdValue,
      paymentMethodId: paymentMethodIdValue,
      date: dateValue,
      amount: amountValue,
      remark: remarkValue,
    },
  });

  const {
    setError,
    formState: { isSubmitting, errors },
  } = form;

  async function onSubmit(data: z.infer<typeof EXPENSE_SCHEMA>) {
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
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        setDate={(date) => {
                          field.onChange(date!.toISOString());
                        }}
                        date={new Date(field.value)}
                        // disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the date of the expense
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="h-8"></div>
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      This is the category of the expense
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="h-8"></div>
              <FormField
                control={form.control}
                name="paymentMethodId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a payment method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {paymentMethods.map((paymentMethod) => (
                          <SelectItem
                            key={paymentMethod.id}
                            value={paymentMethod.id}
                          >
                            {paymentMethod.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      This is the payment method of the expense
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="h-8"></div>
              <div className="h-18">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          // type="number"
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is the amount of the expense.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="h-12"></div>
              <FormField
                control={form.control}
                name="remark"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remark</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="(Optional)"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the optional description of the expense.
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
