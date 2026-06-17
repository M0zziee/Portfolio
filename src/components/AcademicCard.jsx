import { cn } from "@/lib/utils"
import { GraduationCap } from "lucide-react"

const gradients = [
  "from-blue-500/10 via-indigo-500/10 to-purple-500/10",
  "from-emerald-500/10 via-teal-500/10 to-cyan-500/10",
]

function AcademicCard({ item, index }) {
  const gradient = gradients[index % gradients.length]

  return (
    <div
      className={cn(
        "flex gap-4 p-3 border border-border bg-muted/10 rounded-[10px] shadow-[0px_4px_20px_-8px_rgba(0,0,0,0.15)]",
        "hover:bg-muted/20 transition-colors duration-200",
      )}
    >
      <div className="shrink-0 mt-0.5">
        <div className={cn("size-8 rounded-full bg-gradient-to-br flex items-center justify-center", gradient)}>
          <GraduationCap size={16} className="text-foreground/70" />
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-[10px] text-muted-foreground mb-1">{item.period}</div>
        <div className="font-semibold text-foreground text-xs mb-0.5">
          {item.degree}
        </div>
        <div className="text-muted-foreground text-[11px] mb-1.5">{item.institution}</div>
        <div className="text-muted-foreground/70 text-[10px] leading-relaxed mb-1.5">
          {item.description}
        </div>
        {item.achievements?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.achievements.map((a) => (
              <span
                key={a}
                className="inline-flex px-1.5 py-0.5 rounded bg-muted/30 text-[9px] text-muted-foreground"
              >
                {a}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AcademicCard
