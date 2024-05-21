import { cn, toPercentString } from "@/lib/utils";

type Props = {
  percent: number;
  className?: string;
}

export default function ColoredPercent({
  percent, className
}: Props) {
  return (
    <span className={cn(
      percent > 0.0 && "text-green-700",
      percent < 0.0 && "text-red-600",
      percent === 0.0 && "text-black",
      className
    )}>
      ({toPercentString(percent, true)})
    </span>
  )
}
