import { TerminalWindow } from "@/components/TerminalWindow"
import { TerminalOutput } from "@/components/TerminalOutput"
import { TerminalInput, TerminalTextarea } from "@/components/TerminalInput"
import { Button } from "@/components/ui/button"

function ContactSection() {
  return (
    <TerminalWindow title="~/contact">
      <TerminalOutput prompt="$" className="mb-4">
        mail --send
      </TerminalOutput>
      <form className="space-y-3">
        <TerminalInput label="name" placeholder="your name" />
        <TerminalInput label="email" type="email" placeholder="you@example.com" />
        <TerminalTextarea label="message" placeholder="say something..." />
        <div className="flex gap-2 flex-wrap items-center">
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
  )
}

export { ContactSection }
