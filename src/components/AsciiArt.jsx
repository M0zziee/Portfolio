import { cn } from "@/lib/utils"

const art = String.raw`
███╗   ███╗
████╗ ████║
██╔████╔██║
██║╚██╔╝██║
██║ ╚═╝ ██║
╚═╝     ╚═╝
`

function AsciiArt({ children, className }) {
  if (children) {
    return (
      <div className="flex items-start gap-8">
        <pre
          className={cn(
            "font-sans text-xs leading-tight text-primary/60 select-none shrink-0",
            className
          )}
        >
          {art}
        </pre>
        <div className="font-sans text-xs leading-tight text-foreground">
          {children}
        </div>
      </div>
    )
  }

  return (
    <pre
      className={cn(
        "font-sans text-xs leading-tight text-primary/60 select-none",
        className
      )}
    >
      {art}
    </pre>
  )
}

export { AsciiArt }
