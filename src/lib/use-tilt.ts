"use client"

import { useCallback, useRef } from "react"

/**
 * Lets a card lean toward the pointer. Writes --rx/--ry (degrees) on the element;
 * CSS does the rest. Skipped for touch and reduced motion.
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>(max = 5) {
  const ref = useRef<T | null>(null)
  const frame = useRef(0)

  const onPointerMove = useCallback(
    (e: React.PointerEvent<T>) => {
      const el = ref.current
      if (!el || e.pointerType !== "mouse") return
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
      const { left, top, width, height } = el.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5
      cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        el.style.setProperty("--rx", `${(-y * max).toFixed(2)}deg`)
        el.style.setProperty("--ry", `${(x * max).toFixed(2)}deg`)
        el.dataset.tilting = "true"
      })
    },
    [max]
  )

  const onPointerLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    cancelAnimationFrame(frame.current)
    el.style.setProperty("--rx", "0deg")
    el.style.setProperty("--ry", "0deg")
    delete el.dataset.tilting
  }, [])

  return { ref, onPointerMove, onPointerLeave }
}
