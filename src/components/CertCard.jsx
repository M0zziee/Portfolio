import { cn } from "@/lib/utils"
import { Award, ExternalLink } from "lucide-react"

const gradients = [
  "from-amber-500/10 via-yellow-500/10 to-orange-500/10",
  "from-sky-500/10 via-blue-500/10 to-indigo-500/10",
]

function CertCard({ item, index }) {
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
          <Award size={16} className="text-foreground/70" />
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="font-semibold text-foreground text-xs mb-0.5">{item.name}</div>
        <div className="text-muted-foreground text-[11px] mb-1">
          {item.issuer} &middot; {item.date}
        </div>
        <div className="text-muted-foreground/70 text-[10px] leading-relaxed mb-1.5">
          {item.description}
        </div>
        {item.credentialUrl && item.credentialUrl !== "#" && (
          <a
            href={item.credentialUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 text-[10px] text-blue-500 hover:text-blue-400 transition-colors"
          >
            <ExternalLink size={10} />
            Verify
          </a>
        )}
      </div>
    </div>
  )
}

export default CertCard
