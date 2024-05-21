import { Trash2Icon } from "lucide-react";
import { StockPick } from "@/stores";
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
    <div className="flex flex-row gap-0.5 items-center">
      <Tooltip>
        <TooltipTrigger asChild> 
          <div
            className={cn(
              "w-full border rounded-md pl-4 pr-3 pt-2 pb-2 cursor-default hover:cursor-pointer hover:bg-gray-100",
              isSelected && "border border-gray-800"
            )}
            onClick={onClick}
          >
            <span className="line-clamp-1 text-ellipsis text-sm">
              {stock.ticker} ({stock.name})
            </span>
          </div>
        </TooltipTrigger>
        <Button 
          size={"icon"}
          variant={"ghost"} 
          onClick={onDelete}
        >
          <Trash2Icon size={18} className="text-red-700" />
        </Button>
        <TooltipContent>
          <p>{stock.name}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
