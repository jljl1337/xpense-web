import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { formatAmount } from "@/lib/formats/number";

interface NumberCardProps {
  title: string;
  description: string;
  value: number;
  className?: string;
}

export function NumberCard({
  title,
  description,
  value,
  className,
}: NumberCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div
          className={cn(
            "flex items-center justify-center text-4xl font-bold",
            className,
          )}
        >
          {formatAmount(value)}
        </div>
      </CardContent>
    </Card>
  );
}
