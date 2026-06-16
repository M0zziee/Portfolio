import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

function RotatingTypewriter({ words = [], speed = 80, deleteSpeed = 40, pause = 2000, className }) {
  const [displayed, setDisplayed] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[currentIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayed === currentWord) {
          setIsDeleting(true)
          return
        }
        setDisplayed(currentWord.slice(0, displayed.length + 1))
      } else {
        if (displayed === "") {
          setIsDeleting(false)
          setCurrentIndex((prev) => (prev + 1) % words.length)
          return
        }
        setDisplayed(displayed.slice(0, -1))
      }
    }, isDeleting ? (displayed === "" ? 0 : deleteSpeed) : (displayed === currentWord ? pause : speed))

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, currentIndex, words, speed, deleteSpeed, pause])

  if (!words.length) return null

  return (
    <span className={cn("font-sans text-primary", className)}>
      {displayed}
      <span className="inline-block w-[0.5em] h-[1em] bg-primary align-middle ml-0.5 animate-pulse" />
    </span>
  )
}

export { RotatingTypewriter }
