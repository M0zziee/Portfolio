import { useRef, useState, useEffect } from "react"
import { animate } from "animejs"
import { cn } from "@/lib/utils"
import { TerminalOutput } from "@/components/TerminalOutput"
import {
  SiReact,
  SiNodedotjs,
  SiPostgresql,
  SiGo,
  SiTailwindcss,
  SiNextdotjs,
  SiRedis,
  SiDocker,
  SiTypescript,
  SiJavascript,
  SiGithub,
} from "react-icons/si"
import { ExternalLink } from "lucide-react"

const techIconMap = {
  React: SiReact,
  "Node.js": SiNodedotjs,
  PostgreSQL: SiPostgresql,
  Go: SiGo,
  "Tailwind CSS": SiTailwindcss,
  "Next.js": SiNextdotjs,
  Redis: SiRedis,
  Docker: SiDocker,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
}

const statusStyles = {
  active: "bg-green-500",
  archived: "bg-muted-foreground",
  wip: "bg-yellow-500",
}

const statusLabels = {
  active: "active",
  archived: "archived",
  wip: "work in progress",
}

function ProjectCard({ item }) {
  const detailsRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const animRef = useRef(null)

  useEffect(() => {
    if (!detailsRef.current) return

    if (animRef.current) animRef.current.pause()

    if (isHovered) {
      animRef.current = animate(detailsRef.current, {
        opacity: [0, 1],
        translateY: [8, 0],
        duration: 350,
        easing: "easeOutQuad",
      })
    } else {
      animRef.current = animate(detailsRef.current, {
        opacity: [1, 0],
        translateY: [0, 8],
        duration: 250,
        easing: "easeOutQuad",
      })
    }

    return () => animRef.current?.pause()
  }, [isHovered])

  if (item.img) {
    return (
      <div
        className="border border-border bg-background font-sans text-xs flex flex-col h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center border-b border-border px-3 py-1.5 shrink-0 select-none">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-red-500" />
            <span className="size-2.5 rounded-full bg-yellow-500" />
            <span className="size-2.5 rounded-full bg-green-500" />
          </div>
          <span className="ml-3 font-medium text-muted-foreground tracking-wider uppercase truncate">
            {item.name}
          </span>
          <span className={cn("ml-auto size-1.5 rounded-full shrink-0", statusStyles[item.status])} />
        </div>
        <div className="relative flex-1 overflow-hidden">
          <img
            src={item.img}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div
            ref={detailsRef}
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-transparent flex flex-col justify-end p-3 gap-1.5 font-sans text-xs leading-relaxed"
            style={{ opacity: 0 }}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-white/50 select-none shrink-0">$</span>
              <span className="text-white/50 shrink-0">Description:</span>
              <span className="text-white/80 truncate">{item.description}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-white/50 select-none shrink-0">$</span>
              <span className="text-white/50 shrink-0">Status:</span>
              <span className={cn("size-1.5 rounded-full", statusStyles[item.status])} />
              <span className="text-white/70">{statusLabels[item.status]}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-white/50 select-none shrink-0">$</span>
              <span className="text-white/50 shrink-0">Tech:</span>
              <div className="flex items-center gap-1">
                {item.tech?.map((t) => {
                  const Icon = techIconMap[t]
                  return Icon ? <Icon key={t} className="size-3.5 text-white/70" /> : null
                })}
              </div>
              <span className="text-white/60 truncate">{item.tech?.join(", ")}</span>
            </div>

            {(item.github || item.demo) && (
              <div className="flex items-start gap-1.5">
                <span className="text-white/50 select-none shrink-0">$</span>
                <span className="text-white/50 shrink-0">Links:</span>
                <div className="flex items-center gap-2">
                  {item.github && (
                    <a
                      href={item.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center gap-1 text-white/70 hover:text-white transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <SiGithub size={11} />
                      <span>github</span>
                    </a>
                  )}
                  {item.demo && (
                    <a
                      href={item.demo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center gap-1 text-white/70 hover:text-white transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={11} />
                      <span>live demo</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="border border-border bg-background font-sans text-xs flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center border-b border-border px-3 py-1.5 shrink-0 select-none">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-red-500" />
          <span className="size-2.5 rounded-full bg-yellow-500" />
          <span className="size-2.5 rounded-full bg-green-500" />
        </div>
        <span className="ml-3 font-medium text-muted-foreground tracking-wider uppercase truncate">
          {item.name}
        </span>
        <span className={cn("ml-auto size-1.5 rounded-full shrink-0", statusStyles[item.status])} />
      </div>

      <div className="relative p-3 flex-1 flex flex-col justify-center overflow-hidden">
        <div className={cn("transition-opacity duration-200", isHovered && "opacity-15")}>
          <TerminalOutput prompt="$">ls -la</TerminalOutput>
          <TerminalOutput prompt="$" className="mt-1">nothing to show</TerminalOutput>
        </div>

        <div
          ref={detailsRef}
          className="absolute inset-3 flex flex-col gap-1.5 font-sans text-xs leading-relaxed"
          style={{ opacity: 0 }}
        >
          <TerminalOutput prompt="$">cat README.md</TerminalOutput>

          <div className="flex items-start gap-1.5">
            <span className="text-muted-foreground select-none shrink-0">$</span>
            <span className="text-muted-foreground shrink-0">Description:</span>
            <span className="text-foreground/80 truncate">{item.description}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground select-none shrink-0">$</span>
            <span className="text-muted-foreground shrink-0">Tech:</span>
            <div className="flex items-center gap-1">
              {item.tech?.map((t) => {
                const Icon = techIconMap[t]
                return Icon ? <Icon key={t} className="size-3.5 text-foreground/70" /> : null
              })}
            </div>
            <span className="text-foreground/60 truncate">{item.tech?.join(", ")}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground select-none shrink-0">$</span>
            <span className="text-muted-foreground shrink-0">Status:</span>
            <span className={cn("size-1.5 rounded-full", statusStyles[item.status])} />
            <span className="text-foreground/70">{statusLabels[item.status]}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground select-none shrink-0">$</span>
            <span className="text-muted-foreground shrink-0">Links:</span>
            <div className="flex items-center gap-2">
              {item.github && (
                <a
                  href={item.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <SiGithub size={11} />
                  <span>github</span>
                </a>
              )}
              {item.demo && (
                <a
                  href={item.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={11} />
                  <span>demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
