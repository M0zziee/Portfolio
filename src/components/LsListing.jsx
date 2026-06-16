import { cn } from "@/lib/utils"

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function formatDate(date) {
  const d = new Date(date)
  return `${monthNames[d.getMonth()]} ${String(d.getDate()).padStart(2, " ")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes}B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}K`
  return `${(bytes / (1024 * 1024)).toFixed(1)}M`
}

const permsColors = {
  d: "text-blue-500",
  l: "text-cyan-400",
  "-": "text-foreground",
}

function Perms({ perms, className }) {
  const typeColor = permsColors[perms[0]] || "text-foreground"
  return (
    <span className={cn(typeColor, className)}>
      {perms}
    </span>
  )
}

function LsListing({ items = [], className, showTotal = true }) {
  return (
    <div className={cn("font-sans text-xs leading-relaxed", className)}>
      {showTotal && (
        <div className="text-muted-foreground mb-1">
          total {items.length}
        </div>
      )}

      <div className="overflow-x-auto">
        <div className="min-w-[400px]">
          {/* Header */}
          <div className="flex gap-2 text-muted-foreground border-b border-border pb-1 mb-1">
            <span className="w-[34px] shrink-0">perms</span>
            <span className="w-4 shrink-0 text-right hidden sm:block">#</span>
            <span className="w-12 shrink-0 hidden md:block">owner</span>
            <span className="w-12 shrink-0 hidden lg:block">group</span>
            <span className="w-14 shrink-0 text-right">size</span>
            <span className="w-28 shrink-0 hidden sm:block">modified</span>
            <span className="flex-1">name</span>
          </div>

          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex gap-2 hover:bg-muted/30 px-0.5 -mx-0.5"
            >
              <Perms perms={item.perms} className="w-[34px] shrink-0" />
              <span className="w-4 shrink-0 text-right text-muted-foreground hidden sm:block">
                {item.links || 1}
              </span>
              <span className="w-12 shrink-0 text-muted-foreground truncate hidden md:block">
                {item.owner || "user"}
              </span>
              <span className="w-12 shrink-0 text-muted-foreground truncate hidden lg:block">
                {item.group || "staff"}
              </span>
              <span className="w-14 shrink-0 text-right text-muted-foreground">
                {item.size != null ? formatSize(item.size) : "-"}
              </span>
              <span className="w-28 shrink-0 text-muted-foreground hidden sm:block">
                {item.date ? formatDate(item.date) : "-"}
              </span>
              <span
                className={cn(
                  "flex-1 truncate",
                  item.perms?.startsWith("d") && "text-blue-500 font-medium",
                  item.perms?.startsWith("l") && "text-cyan-400",
                  item.perms?.startsWith("x") && "text-green-500"
                )}
              >
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { LsListing }
