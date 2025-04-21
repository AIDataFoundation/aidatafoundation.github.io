import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
        // Custom variants for tags
        ml: "bg-purple-900/50 text-purple-300",
        data: "bg-blue-900/50 text-blue-300",
        reinforcement: "bg-green-900/50 text-green-300",
        programming: "bg-yellow-900/50 text-yellow-300",
        llmFramework: "bg-pink-900/50 text-pink-300",
        llmModel: "bg-red-900/50 text-red-300",
        llmVector: "bg-indigo-900/50 text-indigo-300",
        llmTool: "bg-orange-900/50 text-orange-300",
        mcpCore: "bg-teal-900/50 text-teal-300",
        mcpDatabase: "bg-sky-900/50 text-sky-300",
        mcpFinance: "bg-emerald-900/50 text-emerald-300",
        mcpWeb: "bg-amber-900/50 text-amber-300",
        mcpDeveloper: "bg-cyan-900/50 text-cyan-300",
        mcpAI: "bg-fuchsia-900/50 text-fuchsia-300",
        mcpProductivity: "bg-lime-900/50 text-lime-300",
        default: "bg-gray-700/50 text-gray-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants } 