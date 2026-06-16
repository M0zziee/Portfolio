import { useRef } from "react"
import { TerminalWindow } from "@/components/TerminalWindow"
import { TerminalOutput } from "@/components/TerminalOutput"
import { TerminalInput, TerminalTextarea } from "@/components/TerminalInput"
import { Button } from "@/components/ui/button"
import { useAnimateIn } from "@/hooks/useAnimateIn"
import { stagger } from "animejs"

function ContactSection() {
  const sectionRef = useRef(null)

  useAnimateIn(sectionRef, {
    selector: "[data-id='contact-cmd']",
    translateY: [15, 0],
    duration: 500,
    delay: 100,
  })

  useAnimateIn(sectionRef, {
    selector: "[data-id='contact-field']",
    translateY: [20, 0],
    opacity: [0, 1],
    duration: 500,
    delay: stagger(120, { from: "first", start: 300 }),
  })

  useAnimateIn(sectionRef, {
    selector: "[data-id='contact-send']",
    scale: [0.9, 1],
    opacity: [0, 1],
    duration: 400,
    delay: 900,
  })

  return (
    <div ref={sectionRef}>
      <TerminalWindow title="~/contact">
        <div data-id="contact-cmd">
          <TerminalOutput prompt="$" className="mb-4">
            mail --send
          </TerminalOutput>
        </div>
        <form className="space-y-3">
          <div data-id="contact-field">
            <TerminalInput label="name" placeholder="your name" />
          </div>
          <div data-id="contact-field">
            <TerminalInput label="email" type="email" placeholder="you@example.com" />
          </div>
          <div data-id="contact-field">
            <TerminalTextarea label="message" placeholder="say something..." />
          </div>
          <div data-id="contact-send" className="flex gap-2 flex-wrap items-center">
            <TerminalOutput prompt="$" className="shrink-0 self-center">
              ./send.sh
            </TerminalOutput>
            <Button type="submit" size="sm" variant="default">
              [Send]
            </Button>
            <span className="text-muted-foreground self-center text-xs select-none">
              (C-c to cancel)
            </span>
          </div>
        </form>
      </TerminalWindow>
    </div>
  )
}

export { ContactSection }
