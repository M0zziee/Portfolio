import { useRef, useState } from "react"
import { TerminalWindow } from "@/components/TerminalWindow"
import { TerminalOutput } from "@/components/TerminalOutput"
import { TerminalInput, TerminalTextarea } from "@/components/TerminalInput"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SocialLinks } from "@/components/SocialLinks"
import { useAnimateIn } from "@/hooks/useAnimateIn"
import { stagger } from "animejs"
import { socialLinks, email } from "@/data/portfolio"

function ContactSection() {
  const sectionRef = useRef(null)
  const [name, setName] = useState("")
  const [mail, setMail] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState("idle")

  const validate = () => {
    const next = {}
    if (!name.trim()) next.name = "name is required"
    if (!mail.trim()) next.mail = "email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) next.mail = "invalid email format"
    if (!message.trim()) next.message = "message is required"
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    // TODO: wire up Formspree or email service
  }

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
    selector: "[data-id='contact-submit']",
    scale: [0.9, 1],
    opacity: [0, 1],
    duration: 400,
    delay: 900,
  })

  useAnimateIn(sectionRef, {
    selector: "[data-id='contact-info'], [data-id='contact-social']",
    translateY: [20, 0],
    opacity: [0, 1],
    duration: 500,
    delay: stagger(200, { from: "first", start: 1100 }),
  })

  return (
    <div ref={sectionRef}>
      <TerminalWindow title="~/contact">
        <div data-id="contact-cmd">
          <TerminalOutput prompt="$" className="mb-4">
            mail --send
          </TerminalOutput>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3" noValidate>
          <div data-id="contact-field">
            <TerminalInput
              label="name"
              placeholder="your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <TerminalOutput prompt="!" className="text-destructive mt-0.5">
                error: {errors.name}
              </TerminalOutput>
            )}
          </div>
          <div data-id="contact-field">
            <TerminalInput
              label="email"
              type="email"
              placeholder="you@example.com"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              required
              aria-invalid={!!errors.mail}
            />
            {errors.mail && (
              <TerminalOutput prompt="!" className="text-destructive mt-0.5">
                error: {errors.mail}
              </TerminalOutput>
            )}
          </div>
          <div data-id="contact-field">
            <TerminalTextarea
              label="message"
              placeholder="say something..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              aria-invalid={!!errors.message}
            />
            {errors.message && (
              <TerminalOutput prompt="!" className="text-destructive mt-0.5">
                error: {errors.message}
              </TerminalOutput>
            )}
          </div>

          <div data-id="contact-submit" className="flex gap-2 flex-wrap items-center">
            <TerminalOutput prompt="$" className="shrink-0 self-center">
              ./send.sh
            </TerminalOutput>
            <Button type="submit" size="sm" variant="default" disabled={status === "loading"}>
              {status === "loading" ? "[Sending...]" : "[Send]"}
            </Button>
            <span className="text-muted-foreground self-center text-xs select-none">
              (C-c to cancel)
            </span>
          </div>
        </form>

        {status === "success" && (
          <div className="mt-3">
            <TerminalOutput prompt="✓" className="text-green-500">
              mail sent successfully!
            </TerminalOutput>
          </div>
        )}

        {status === "error" && (
          <div className="mt-3">
            <TerminalOutput prompt="✗" className="text-destructive">
              failed to send mail. try again later.
            </TerminalOutput>
          </div>
        )}

        <Separator className="my-4" />

        <div data-id="contact-info">
          <TerminalOutput prompt="$" className="mb-1">
            echo $EMAIL
          </TerminalOutput>
          <a
            href={`mailto:${email}`}
            className="font-sans text-xs text-primary hover:underline transition-colors"
          >
            {email}
          </a>
        </div>

        <Separator className="my-4" />

        <div data-id="contact-social">
          <SocialLinks links={socialLinks} />
        </div>
      </TerminalWindow>
    </div>
  )
}

export { ContactSection }
