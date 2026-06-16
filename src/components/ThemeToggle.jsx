import { Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"

function ThemeToggle({ theme, onToggle, className }) {
  const isDark = theme === "dark"

  return (
    <button
      type="button"
      onClick={onToggle}
      data-slot="theme-toggle"
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "flex items-center gap-1.5",
        "border border-border bg-background px-3 py-1.5",
        "font-sans text-xs font-medium text-muted-foreground",
        "hover:text-foreground hover:bg-muted transition-colors",
        "select-none",
        className
      )}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
      <span className="tracking-wider uppercase">{isDark ? "light" : "dark"}</span>
    </button>
  )
}

export { ThemeToggle }
