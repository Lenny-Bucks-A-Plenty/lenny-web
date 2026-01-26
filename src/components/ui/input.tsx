import * as React from "react"

import { cn } from "@/lib/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--bg-deep)] px-4 py-2 text-sm text-[var(--text)] shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] transition-all duration-200",
          "placeholder:text-[var(--text-dim)]",
          "hover:border-[var(--border-strong)]",
          "focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-soft)] focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_0_0_3px_var(--accent-soft)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
