import { cn } from "@/lib/utils"

interface ShimmerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Shimmer({ className, ...props }: ShimmerProps) {
  return (
    <div
      className={cn(
        "animate-shimmer bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%]",
        className
      )}
      {...props}
    />
  )
} 