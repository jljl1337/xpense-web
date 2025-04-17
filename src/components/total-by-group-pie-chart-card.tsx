import { redirect } from "next/navigation";

import { PieChartCard } from "./pie-chart-card";

import { getTotalByGroup } from "@/lib/db/summary";
import { TotalByGroup } from "@/lib/db/types";

interface TotalByGroupPieChartCardProps {
  bookId: string;
  days?: number;
}

interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
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

  const chartConfig = totalByGroup.reduce(
    (acc: ChartConfig, item: TotalByGroup) => {
      acc[item["id"]] = {
        label: item["name"],
        color: `var(--chart-${(Object.keys(acc).length + 1) % 12})`,
      };
      return acc;
    },
    {},
  );

  const chartData = totalByGroup.map((item: TotalByGroup) => ({
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
