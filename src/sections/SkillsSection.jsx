import { useRef } from "react"
import { TerminalWindow } from "@/components/TerminalWindow"
import { TerminalOutput } from "@/components/TerminalOutput"
import { Badge } from "@/components/ui/badge"
import { useAnimateIn } from "@/hooks/useAnimateIn"
import { skills } from "@/data/portfolio"
import { stagger } from "animejs"

function SkillsSection() {
  const sectionRef = useRef(null)

  useAnimateIn(sectionRef, {
    selector: "[data-id='skills-cmd']",
    translateY: [15, 0],
    duration: 500,
    delay: 100,
  })

  useAnimateIn(sectionRef, {
    selector: "[data-id='skills-category']",
    translateX: [-20, 0],
    opacity: [0, 1],
    duration: 600,
    delay: stagger(150, { from: "first", start: 300 }),
  })

  useAnimateIn(sectionRef, {
    selector: "[data-id='skills-category'] .skill-badge",
    scale: [0, 1],
    opacity: [0, 1],
    duration: 400,
    delay: stagger(50, { from: "first", start: 500 }),
  })

  return (
    <div ref={sectionRef}>
      <TerminalWindow title="~/skills">
        <div data-id="skills-cmd">
          <TerminalOutput prompt="$" className="mb-4">
            cat skills.json
          </TerminalOutput>
        </div>
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="mb-3 last:mb-0" data-id="skills-category">
            <div className="flex gap-2 mb-1">
              <span className="text-blue-500 shrink-0">[{category}]</span>
              <span className="text-muted-foreground">// {items.join(", ")}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pl-0">
              {items.map((skill) => (
                <Badge key={skill} variant="outline" className="skill-badge font-sans text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </TerminalWindow>
    </div>
  )
}

export { SkillsSection }
