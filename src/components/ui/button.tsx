import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: 
          "bg-gradient-to-b from-[var(--accent-glow)] to-[var(--accent)] text-[var(--bg-deep)] font-semibold shadow-[0_1px_0_0_rgba(255,255,255,0.2)_inset,0_-1px_0_0_rgba(0,0,0,0.1)_inset,0_4px_12px_-4px_rgba(229,163,77,0.5)] hover:shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_-1px_0_0_rgba(0,0,0,0.1)_inset,0_6px_20px_-4px_rgba(229,163,77,0.6)] hover:brightness-110",
        destructive:
          "bg-gradient-to-b from-[var(--negative-glow)] to-[var(--negative)] text-white font-semibold shadow-[0_1px_0_0_rgba(255,255,255,0.2)_inset,0_-1px_0_0_rgba(0,0,0,0.1)_inset,0_4px_12px_-4px_rgba(248,113,113,0.4)] hover:shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_-1px_0_0_rgba(0,0,0,0.1)_inset,0_6px_20px_-4px_rgba(248,113,113,0.5)] hover:brightness-110",
        outline:
          "border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--surface-raised)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
        secondary:
          "bg-[var(--surface-raised)] text-[var(--text)] border border-[var(--border)] hover:bg-[var(--surface-glow)] hover:border-[var(--border-strong)]",
        ghost: 
          "text-[var(--text-muted)] hover:bg-[var(--surface-raised)] hover:text-[var(--text)]",
        link: 
          "text-[var(--accent)] underline-offset-4 hover:text-[var(--accent-glow)] hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
