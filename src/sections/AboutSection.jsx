import { TerminalWindow } from "@/components/TerminalWindow"
import { TerminalOutput, TerminalOutputBlock } from "@/components/TerminalOutput"
import { aboutLines } from "@/data/portfolio"

function AboutSection() {
  return (
    <TerminalWindow title="~/about.md">
      <TerminalOutputBlock prompt="$" lines={["cat about.md", ""]} />
      <div className="mt-2 space-y-0.5">
        {aboutLines.map((line, i) => (
          <TerminalOutput key={i} prompt={line.length === 0 ? "" : ">"}>
            {line}
          </TerminalOutput>
        ))}
      </div>
    </TerminalWindow>
  )
}

export { AboutSection }
