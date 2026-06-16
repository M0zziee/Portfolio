import { useEffect } from "react"
import { animate, stagger } from "animejs"

function useAnimateIn(ref, params) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const { selector, ...animParams } = params
    const targets = selector ? el.querySelectorAll(selector) : el
    if (selector && targets.length === 0) return

    const instance = animate(targets, {
      opacity: [0, 1],
      translateY: [15, 0],
      easing: "easeOutQuad",
      duration: 500,
      delay: selector ? stagger(60, { start: 100, from: "first" }) : 0,
      ...animParams,
    })

    return () => instance.pause()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export { useAnimateIn }
