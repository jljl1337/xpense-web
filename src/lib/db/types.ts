import { Database } from "@/lib/db/types.g";

export type Book = Database["xpense_private"]["Tables"]["book"]["Row"];
export type Category = Database["xpense_private"]["Tables"]["category"]["Row"];
export type PaymentMethod =
  Database["xpense_private"]["Tables"]["payment_method"]["Row"];
export type Expense = Database["xpense_private"]["Tables"]["expense"]["Row"];

export type Trend = {
  date: string;
  total_amount: number;
};
