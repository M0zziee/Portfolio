import { cn } from "@/lib/utils"

function TerminalWindow({ title = "terminal", children, className, statusBar }) {
  return (
    <div
      data-slot="terminal-window"
      className={cn(
        "border border-border bg-background font-sans text-xs",
        className
      )}
    >
      <div className="flex items-center border-b border-border px-3 py-1.5 select-none">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-red-500" />
          <span className="size-2.5 rounded-full bg-yellow-500" />
          <span className="size-2.5 rounded-full bg-green-500" />
        </div>
        <span className="ml-3 font-medium text-muted-foreground tracking-wider uppercase">
          {title}
        </span>
      </div>

      <div className="p-3 sm:p-4">
        {children}
      </div>

      {statusBar && (
        <div className="flex items-center border-t border-border px-3 py-1 text-muted-foreground select-none">
          {statusBar}
        </div>
      )}
    </div>
  )
}

export { TerminalWindow }
