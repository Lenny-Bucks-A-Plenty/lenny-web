import { cn, toPercentString } from "@/lib/utils";
import { TrendingUpIcon, TrendingDownIcon, MinusIcon } from "lucide-react";

type Props = {
  percent: number;
  className?: string;
  showIcon?: boolean;
}

export default function ColoredPercent({
  percent, className, showIcon = false
}: Props) {
  const isPositive = percent > 0;
  const isNegative = percent < 0;
  
  return (
    <span className={cn(
      "inline-flex items-center gap-1 font-mono tabular-nums",
      isPositive && "text-[var(--positive)]",
      isNegative && "text-[var(--negative)]",
      !isPositive && !isNegative && "text-[var(--text-muted)]",
      className
    )}>
      {showIcon && (
        <>
          {isPositive && <TrendingUpIcon className="w-3.5 h-3.5" />}
          {isNegative && <TrendingDownIcon className="w-3.5 h-3.5" />}
          {!isPositive && !isNegative && <MinusIcon className="w-3.5 h-3.5" />}
        </>
      )}
      <span>{toPercentString(percent, true)}</span>
    </span>
  )
}
