"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Flips to true once the element's top has come within `ratio` of the viewport height,
 * including when the reader jumps past it (anchor links, fast scrolls), then stops checking.
 * Pair with `data-reveal` / `data-settle` / `data-in` attributes in globals.css.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(ratio = 0.88) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let frame = 0
    const check = () => {
      frame = 0
      if (el.getBoundingClientRect().top < window.innerHeight * ratio) {
        setInView(true)
        stop()
      }
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(check)
    }
    const stop = () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    check()
    return stop
  }, [ratio])

  return [ref, inView] as const
}
