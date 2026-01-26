import { Trash2Icon, TrendingUpIcon, TrendingDownIcon } from "lucide-react";
import type { StockPick } from "@/stores/portfolio";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

type Props = {
  stock: StockPick;
  onClick: () => void;
  onDelete: () => void;
  isSelected: boolean;
}

export default function StockPickerCard({
  stock, onClick, onDelete, isSelected
}: Props) {
  return (
    <div className="group flex flex-row items-center gap-1">
      <Tooltip>
        <TooltipTrigger asChild> 
          <button
            type="button"
            className={cn(
              "relative w-full cursor-pointer rounded-xl border px-4 py-3 text-left transition-all duration-200",
              "border-[var(--border)] bg-[var(--surface-muted)]",
              "hover:border-[var(--border-strong)] hover:bg-[var(--surface-raised)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]",
              isSelected && [
                "border-[var(--accent)]/50 bg-[var(--accent-soft)]",
                "shadow-[0_0_20px_-5px_rgba(229,163,77,0.3),0_0_0_1px_rgba(229,163,77,0.1)_inset]",
              ]
            )}
            onClick={onClick}
            aria-pressed={isSelected}
          >
            {/* Glow effect for selected state */}
            {isSelected && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-[var(--accent)]/5 to-transparent pointer-events-none z-0" />
            )}
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className={cn(
                  "font-mono text-sm font-semibold tracking-wide",
                  isSelected ? "text-[var(--accent)]" : "text-[var(--text)]"
                )}>
                  {stock.ticker}
                </span>
                <span className="text-xs text-[var(--text-muted)] line-clamp-1">
                  {stock.name}
                </span>
              </div>
              
              {/* Direction indicator */}
              <div className={cn(
                "flex items-center justify-center w-6 h-6 rounded-md",
                isSelected ? "bg-[var(--accent)]/20" : "bg-[var(--surface-raised)]"
              )}>
                {isSelected ? (
                  <TrendingUpIcon className="w-3.5 h-3.5 text-[var(--accent)]" />
                ) : (
                  <TrendingDownIcon className="w-3.5 h-3.5 text-[var(--text-dim)]" />
                )}
              </div>
            </div>
          </button>
        </TooltipTrigger>
        
        <Button 
          size="icon"
          variant="ghost" 
          onClick={onDelete}
          className="h-8 w-8 rounded-lg text-[var(--text-dim)] opacity-0 group-hover:opacity-100 transition-opacity hover:text-[var(--negative)] hover:bg-[var(--negative-soft)]"
          aria-label="Remove stock"
        >
          <Trash2Icon className="w-4 h-4" />
        </Button>
        
        <TooltipContent side="left" sideOffset={8}>
          <p>{stock.name}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
