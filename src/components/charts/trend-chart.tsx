import { redirect } from "next/navigation";

import { AreaChartCard } from "@/components/charts/area-chart-card";
import { getTrends } from "@/lib/db/summary";

interface TrendChartProps {
  bookId: string;
}

export default async function TrendChart({ bookId }: TrendChartProps) {
  const { data: trends, error } = await getTrends({
    bookId,
    days: 30,
  });

  if (error) {
    redirect("/error");
  }
  const chartConfig = {
    total_amount: {
      label: "Total",
      color: "var(--primary)",
    },
  };

  const chartData = trends.map((trend) => ({
    date: trend.date,
    total_amount: trend.total_amount,
    short_date: new Date(trend.date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      timeZone: "UTC",
    }),
  }));

  return (
    <AreaChartCard
      title="Overview"
      description="Trend of the last 30 days"
      chartData={chartData}
      chartConfig={chartConfig}
      xAxisKey={"short_date"}
      className={"h-48"}
    />
  );
}
