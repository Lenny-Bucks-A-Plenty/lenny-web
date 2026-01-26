import { toMoneyString, toPercentString } from "@/lib/utils";
import { TrendingUpIcon, TrendingDownIcon, MinusIcon } from "lucide-react";

type Props = {
  stock: {
    ticker: string;
    current_price: number;
    percent_diff: number;
  }
}

export default function StockTickerSection({
  stock
}: Props) {
  const isPositive = stock.percent_diff > 0;
  const isNegative = stock.percent_diff < 0;
  
  return (
    <div className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-sm px-4 py-2 transition-all hover:border-[var(--border-strong)] hover:bg-[var(--surface)]">
      {/* Ticker Symbol */}
      <span className="font-mono font-semibold text-sm text-[var(--accent)] tracking-wide">
        {stock.ticker}
      </span>
      
      {/* Price */}
      <span className="font-mono text-sm text-[var(--text)] tabular-nums">
        {toMoneyString(stock.current_price)}
      </span>
      
      {/* Percent Change */}
      <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-mono font-medium tabular-nums ${
        isPositive 
          ? 'bg-[var(--positive-soft)] text-[var(--positive)]' 
          : isNegative 
            ? 'bg-[var(--negative-soft)] text-[var(--negative)]'
            : 'bg-[var(--surface-raised)] text-[var(--text-muted)]'
      }`}>
        {isPositive && <TrendingUpIcon className="w-3 h-3" />}
        {isNegative && <TrendingDownIcon className="w-3 h-3" />}
        {!isPositive && !isNegative && <MinusIcon className="w-3 h-3" />}
        <span>{toPercentString(stock.percent_diff, true)}</span>
      </div>
    </div>
  )
}
