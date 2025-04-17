import { redirect } from "next/navigation";

import { PieChartCard } from "./pie-chart-card";

import { getTotalByGroup } from "@/lib/db/summary";

interface TotalByGroupPieChartCardProps {
  bookId: string;
  days?: number;
}

export default async function TotalByGroupPieChartCard({
  bookId,
  days,
}: TotalByGroupPieChartCardProps) {
  const { data: totalByGroup, error } = await getTotalByGroup({
    bookId,
    days,
  });

  if (error) {
    redirect("/error");
  }

  const chartConfig = totalByGroup.reduce((acc: any, item: any) => {
    acc[item["id"]] = {
      label: item["name"],
      color: `var(--chart-${(Object.keys(acc).length + 1) % 12})`,
    };
    return acc;
  }, {});

  const chartData = totalByGroup.map((item: any) => ({
    id: item["id"],
    value: item["total_amount"],
    fill: `var(--color-${item["id"]})`,
  }));

  return (
    <PieChartCard
      title={`${days ? "Recent" : "Total"} Expenditure`}
      description={`Expenditure of ${days ? `the last ${days}` : "all"} days`}
      chartData={chartData}
      chartConfig={chartConfig}
      dataKey={"value"}
      nameKey={"id"}
      className="h-48"
    />
  );
}
