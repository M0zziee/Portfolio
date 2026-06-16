import { cn } from "@/lib/utils"

function TabBar({ tabs, activeTab, onChange, className }) {
  return (
    <div
      data-slot="tab-bar"
      className={cn("sticky top-0 z-50 flex items-center border border-border bg-background", className)}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={cn(
            "px-3 py-1.5 font-sans text-xs font-medium tracking-wider uppercase transition-colors",
            "border-r border-border last:border-r-0",
            activeTab === tab
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )}
          data-active={activeTab === tab || undefined}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export { TabBar }
