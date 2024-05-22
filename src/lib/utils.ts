import React from "react";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toMoneyString(amount: number, withoutSymbol = false): string {
  const res = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)

  if (withoutSymbol) return res.slice(1);
  else return res;
}

export function toPercentString(percent: number, specific: boolean = false): string {
  if (!specific || percent <= 0.0) return `${percent.toFixed(2)}%`;

  // if (percent > 0.0) {
  return `+${percent.toFixed(2)}%`;
}

type TModalState = "open" | "closed"

export const useModalState = () => {
	const [state, setState] = React.useState<TModalState>("closed");
	return { state, set: setState } as const;
}

export type ModalState = ReturnType<typeof useModalState>
