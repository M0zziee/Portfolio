import { useRef } from "react"
import { TerminalWindow } from "@/components/TerminalWindow"
import { TerminalOutput, TerminalOutputBlock } from "@/components/TerminalOutput"
import { TerminalShell } from "@/components/TerminalShell"
import { SocialLinks } from "@/components/SocialLinks"
import { useAnimateIn } from "@/hooks/useAnimateIn"
import { aboutLines, quotes, socialLinks } from "@/data/portfolio"
import { stagger } from "animejs"

function AboutSection() {
  const sectionRef = useRef(null)

  useAnimateIn(sectionRef, {
    selector: "[data-id='about-cmd'], [data-id='about-lines'] > *, [data-id='about-shell'], [data-id='about-social']",
    translateY: [20, 0],
    duration: 600,
    delay: stagger(100, { from: "first", start: 150 }),
  })

  return (
    <div ref={sectionRef}>
      <TerminalWindow title="~/about.md">
        <div data-id="about-cmd">
          <TerminalOutputBlock prompt="$" lines={["cat about.md", ""]} />
        </div>

        <div data-id="about-lines" className="mt-2 space-y-0.5">
          {aboutLines.map((line, i) => (
            <TerminalOutput key={i} prompt={line.length === 0 ? "" : ">"}>
              {line}
            </TerminalOutput>
          ))}
        </div>

        <div className="my-3 border-t border-border" />

        <div data-id="about-shell" className="space-y-1">
          <TerminalOutput prompt="$" className="mb-1">./fortune.sh</TerminalOutput>
          <TerminalShell quotes={quotes} />
        </div>

        <div className="my-3 border-t border-border" />

        <div data-id="about-social">
          <SocialLinks links={socialLinks} />
        </div>
      </TerminalWindow>
    </div>
  )
}

export { AboutSection }
