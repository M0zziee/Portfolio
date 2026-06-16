import { TerminalWindow } from "@/components/TerminalWindow"
import { TerminalOutput } from "@/components/TerminalOutput"
import { LsListing } from "@/components/LsListing"
import { projects } from "@/data/portfolio"

function ProjectsSection() {
  return (
    <TerminalWindow title="~/projects" statusBar="NORMAL  projects  UTF-8">
      <TerminalOutput prompt="$" className="mb-4">
        ls -la --color=auto
      </TerminalOutput>
      <LsListing items={projects} />
    </TerminalWindow>
  )
}

export { ProjectsSection }
