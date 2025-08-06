import * as React from "react"
import { cn } from "@/lib/utils"

export type PlaceholderPatternProps = React.SVGProps<SVGSVGElement>

export function PlaceholderPattern({ className, ...props }: PlaceholderPatternProps) {
  return (
    <svg
      className={cn("absolute inset-0 h-full w-full", className)}
      {...props}
    >
      <defs>
        <pattern
          id="placeholder-pattern"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <rect x="0" y="0" width="4" height="4" className="fill-current" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#placeholder-pattern)" />
    </svg>
  )
}