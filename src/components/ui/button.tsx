import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 select-none',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-br from-sky-500 via-sky-600 to-violet-600 text-white shadow-[0_8px_24px_-8px_rgba(14,165,233,0.55)] hover:shadow-[0_12px_32px_-8px_rgba(14,165,233,0.65)] hover:-translate-y-0.5 active:translate-y-0',
        outline:
          'border border-border bg-background/60 backdrop-blur-md hover:bg-muted hover:border-primary/40',
        ghost:
          'hover:bg-muted text-foreground/80 hover:text-foreground',
        secondary:
          'bg-muted text-foreground hover:bg-muted/80',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        glass:
          'glass text-foreground hover:bg-white/80 dark:hover:bg-white/[0.08]',
      },
      size: {
        sm: 'h-9 px-3.5 text-xs',
        default: 'h-11 px-5',
        lg: 'h-12 px-7 text-base',
        xl: 'h-14 px-8 text-base rounded-2xl',
        icon: 'h-10 w-10 rounded-xl',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
  ),
)
Button.displayName = 'Button'

export { buttonVariants }
