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
      <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
        <pre
          className={cn(
            "font-sans text-xs leading-tight text-primary/60 select-none shrink-0 hidden sm:block",
            className
          )}
        >
          {art}
        </pre>
        <div className="font-sans text-xs leading-tight text-foreground w-full">
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
