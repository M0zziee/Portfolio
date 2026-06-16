import { cn } from "@/lib/utils"

function TerminalOutput({ prompt = "$", children, className }) {
  return (
    <div className={cn("font-sans text-xs leading-relaxed", className)}>
      <span className="text-muted-foreground select-none">{prompt}</span>{" "}
      <span>{children}</span>
    </div>
  )
}

function TerminalOutputBlock({ prompt = "$", lines, className }) {
  return (
    <div className={cn("font-sans text-xs leading-relaxed space-y-0.5", className)}>
      {lines.map((line, i) => (
        <div key={i}>
          <span className="text-muted-foreground select-none">{prompt}</span>{" "}
          <span>{line}</span>
        </div>
      ))}
    </div>
  )
}

export { TerminalOutput, TerminalOutputBlock }
