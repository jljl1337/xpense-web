"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

interface PieChartCardProps {
  title?: string;
  description?: string;
  chartData: Record<string, any>[];
  chartConfig: ChartConfig;
  dataKey: string;
  nameKey: string;
  className?: string;
}

export function PieChartCard({
  title,
  description,
  chartData,
  chartConfig,
  dataKey,
  nameKey,
  className,
}: PieChartCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className={cn("mx-auto aspect-auto", className)}
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey={dataKey}
              nameKey={nameKey}
              startAngle={90}
              endAngle={-270}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
