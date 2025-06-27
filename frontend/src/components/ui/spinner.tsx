import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
  text?: string
}

export function Spinner({ 
  className, 
  size = "md", 
  text,
  ...props 
}: SpinnerProps) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8"
  }

  return (
    <div 
      className={cn(
        "flex items-center gap-2",
        text ? "text-sm text-muted-foreground" : "",
        className
      )}
      {...props}
    >
      <Loader2 className={cn("animate-spin", sizes[size])} />
      {text && <span>{text}</span>}
    </div>
  )
}
