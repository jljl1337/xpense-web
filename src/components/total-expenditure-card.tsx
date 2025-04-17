import { redirect } from "next/navigation";

import { NumberCard } from "./number-card";

import { getTotal } from "@/lib/db/summary";

interface TotalExpenditureCardProps {
  bookId: string;
  days?: number;
}

export default async function TotalExpenditureCard({
  bookId,
  days,
}: TotalExpenditureCardProps) {
  const { data: total, error } = await getTotal({
    bookId,
    days,
  });

  if (error) {
    redirect("/error");
  }

  return (
    <NumberCard
      title={`${days ? "Recent" : "Total"} Expenditure`}
      description={`Expenditure of ${days ? `the last ${days}` : "all"} days`}
      value={total}
      className="h-48"
    />
  );
}
