import { useRef } from "react"
import { TerminalWindow } from "@/components/TerminalWindow"
import { TerminalOutput } from "@/components/TerminalOutput"
import { LsListing } from "@/components/LsListing"
import { useAnimateIn } from "@/hooks/useAnimateIn"
import { projects } from "@/data/portfolio"
import { stagger } from "animejs"

function ProjectsSection() {
  const sectionRef = useRef(null)

  useAnimateIn(sectionRef, {
    selector: "[data-id='projects-cmd'], [data-id='projects-total']",
    translateY: [15, 0],
    duration: 500,
    delay: stagger(100, { from: "first" }),
  })

  useAnimateIn(sectionRef, {
    selector: "[data-id='projects-row']",
    translateX: [30, 0],
    opacity: [0, 1],
    duration: 500,
    delay: stagger(80, { from: "first", start: 300 }),
  })

  return (
    <div ref={sectionRef}>
      <TerminalWindow title="~/projects" statusBar="NORMAL  projects  UTF-8">
        <div data-id="projects-cmd">
          <TerminalOutput prompt="$" className="mb-4">
            ls -la --color=auto
          </TerminalOutput>
        </div>
        <div data-id="projects-listing">
          <div data-id="projects-total" className="text-muted-foreground mb-1 font-sans text-xs">
            total {projects.length}
          </div>
          <div className="overflow-x-auto font-sans text-xs leading-relaxed">
            <div className="min-w-[400px]">
              <div className="flex gap-2 text-muted-foreground border-b border-border pb-1 mb-1">
                <span className="w-[34px] shrink-0">perms</span>
                <span className="w-4 shrink-0 text-right hidden sm:block">#</span>
                <span className="w-12 shrink-0 hidden md:block">owner</span>
                <span className="w-12 shrink-0 hidden lg:block">group</span>
                <span className="w-14 shrink-0 text-right">size</span>
                <span className="w-28 shrink-0 hidden sm:block">modified</span>
                <span className="flex-1">name</span>
              </div>
              <LsListing items={projects} showTotal={false} rowIdPrefix="projects-row" />
            </div>
          </div>
        </div>
      </TerminalWindow>
    </div>
  )
}

export { ProjectsSection }
