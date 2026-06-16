import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

function TerminalInput({ prompt = "$", label, className, ...props }) {
  return (
    <div className={cn("flex items-center gap-2 font-sans text-xs", className)}>
      <span className="text-muted-foreground select-none shrink-0">
        {prompt} {label}:
      </span>
      <Input
        className="flex-1 bg-transparent border-border text-foreground placeholder:text-muted-foreground"
        {...props}
      />
    </div>
  )
}

function TerminalTextarea({ prompt = "$", label, className, ...props }) {
  return (
    <div className={cn("flex gap-2 font-sans text-xs", className)}>
      <span className="text-muted-foreground select-none shrink-0 mt-2">
        {prompt} {label}:
      </span>
      <Textarea
        className="flex-1 bg-transparent border-border text-foreground placeholder:text-muted-foreground min-h-20"
        {...props}
      />
    </div>
  )
}

export { TerminalInput, TerminalTextarea }
