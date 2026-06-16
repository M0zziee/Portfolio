import { TerminalWindow } from "@/components/TerminalWindow"
import { TerminalOutput } from "@/components/TerminalOutput"
import { Badge } from "@/components/ui/badge"
import { skills } from "@/data/portfolio"

function SkillsSection() {
  return (
    <TerminalWindow title="~/skills">
      <TerminalOutput prompt="$" className="mb-4">
        cat skills.json
      </TerminalOutput>
      {Object.entries(skills).map(([category, items]) => (
        <div key={category} className="mb-3 last:mb-0">
          <div className="flex gap-2 mb-1">
            <span className="text-blue-500 shrink-0">[{category}]</span>
            <span className="text-muted-foreground">// {items.join(", ")}</span>
          </div>
          <div className="flex flex-wrap gap-1.5 pl-0">
            {items.map((skill) => (
              <Badge key={skill} variant="outline" className="font-sans text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </TerminalWindow>
  )
}

export { SkillsSection }
