"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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

export interface AreaChartCardProps {
  title?: string;
  description?: string;
  chartData: Record<string, any>[];
  chartConfig: ChartConfig;
  xAxisKey: string;
  xAxisFormatter?: (value: any, index: number) => string;
  className?: string;
}

export function AreaChartCard({
  title,
  description,
  chartData,
  chartConfig,
  xAxisKey,
  xAxisFormatter,
  className,
}: AreaChartCardProps) {
  // Extract data keys to determine which series to render
  const dataKeys = Object.keys(chartConfig || {});

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className={cn("aspect-auto", className)}
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={xAxisFormatter}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              {dataKeys.map((key) => (
                <linearGradient
                  id={`fill${key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                  key={`gradient-${key}`}
                >
                  <stop
                    offset="5%"
                    stopColor={`var(--color-${key.toLowerCase()})`}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={`var(--color-${key.toLowerCase()})`}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              ))}
            </defs>
            {dataKeys.map((key, _index) => (
              <Area
                key={`area-${key}`}
                dataKey={key}
                type="natural"
                fill={`url(#fill${key})`}
                fillOpacity={0.4}
                stroke={`var(--color-${key.toLowerCase()})`}
                stackId="a"
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
