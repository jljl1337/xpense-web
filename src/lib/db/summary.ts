import { TotalByGroup, Trend } from "@/lib/db/types";

import "server-only";

import { createClient } from "@/lib/db/server";

export async function getTrends({
  bookId,
  days,
}: {
  bookId: string;
  days: number;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_trend", {
    book_id: bookId,
    days,
  });

  return { data: data as Trend[], error: error?.message };
}

export async function getTotalByGroup({
  bookId,
  days,
}: {
  bookId: string;
  days?: number;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_total_by_group", {
    book_id: bookId,
    days,
    group_by: "category",
  });

  return { data: data as TotalByGroup[], error: error?.message };
}
