import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"

function TypewriterText({ text, speed = 40, className, onComplete, cursor = true }) {
  const [displayed, setDisplayed] = useState("")
  const [i, setI] = useState(0)

  const tick = useCallback(() => {
    if (i < text.length) {
      setDisplayed(text.slice(0, i + 1))
      setI((prev) => prev + 1)
    } else {
      onComplete?.()
    }
  }, [i, text, onComplete])

  useEffect(() => {
    const id = setTimeout(tick, speed)
    return () => clearTimeout(id)
  }, [i, speed, tick])

  return (
    <span className={cn("font-sans", className)}>
      {displayed}
      {cursor && i < text.length && (
        <span className="inline-block w-[0.5em] h-[1em] bg-foreground align-middle ml-0.5 animate-pulse" />
      )}
    </span>
  )
}

export { TypewriterText }
