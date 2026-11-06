"use client"

import { useEffect, useRef, useState } from "react"
import createGlobe from "cobe"
import { useI18n } from "@/lib/i18n"
import { useInView } from "@/lib/use-in-view"

const HOME: [number, number] = [23.13, 113.26]

// Offices are white and carry a note in the list; the arcs all leave from Guangzhou.
const COUNTRIES = [
  { id: "br", location: [-23.55, -46.63] },
  { id: "se", location: [59.33, 18.07] },
  { id: "za", location: [-26.2, 28.05] },
  { id: "sa", location: [24.71, 46.68] },
  { id: "ae", location: [25.2, 55.27] },
  { id: "my", location: [3.14, 101.69] },
  { id: "cn", location: HOME, office: true },
  { id: "hk", location: [22.32, 114.17], office: true },
] as const satisfies { id: string; location: [number, number]; office?: boolean }[]

// Neighbours on the map would stack their labels, so a few hang off another side of their dot
const SIDES: Partial<Record<(typeof COUNTRIES)[number]["id"], "left" | "below">> = { sa: "left", hk: "below", my: "below" }

const isOffice = (c: (typeof COUNTRIES)[number]) => "office" in c

type Id = (typeof COUNTRIES)[number]["id"]

const LIFT: [number, number, number] = [0.3, 0.76, 0.54]

/** The globe angles that bring a latitude/longitude to the front. */
function anglesFor([lat, lng]: readonly [number, number]) {
  return { phi: Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2), theta: (lat * Math.PI) / 180 }
}

const TAU = Math.PI * 2
const nearest = (from: number, to: number) => from + ((((to - from) % TAU) + TAU + Math.PI) % TAU) - Math.PI

/**
 * Where the clients are. Spins slowly, turns under a drag, and flies to a country
 * picked from the list. Labels ride the markers through CSS anchor positioning.
 */
export function ClientsGlobe() {
  const { t } = useI18n()
  const [headRef, headIn] = useInView()
  const hostRef = useRef<HTMLDivElement>(null)
  const focusRef = useRef<{ phi: number; theta: number } | null>(null)
  const [active, setActive] = useState<Id | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const canvas = document.createElement("canvas")
    canvas.className = "block size-full"
    host.append(canvas)

    const size = () => host.clientWidth || 1
    let phi = anglesFor(COUNTRIES.find((c) => c.id === "ae")!.location).phi
    let theta = 0.3
    let drag: { x: number; y: number; phi: number; theta: number } | null = null

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      width: size(),
      height: size(),
      phi,
      theta,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 16000,
      mapBrightness: 5,
      mapBaseBrightness: 0.04,
      baseColor: [0.32, 0.32, 0.32],
      markerColor: LIFT,
      glowColor: [0.16, 0.16, 0.16],
      markers: COUNTRIES.map((c) => ({
        id: c.id,
        location: [...c.location] as [number, number],
        size: isOffice(c) ? 0.07 : 0.05,
        color: isOffice(c) ? ([1, 1, 1] as [number, number, number]) : undefined,
      })),
      arcs: COUNTRIES.filter((c) => !isOffice(c)).map((c) => ({ from: HOME, to: [...c.location] as [number, number] })),
      arcColor: LIFT,
      arcWidth: 0.6,
      arcHeight: 0.28,
      markerElevation: 0.02,
    })

    let frame = 0
    let visible = false
    const tick = () => {
      frame = 0
      const focus = focusRef.current
      if (drag) {
        // the pointer handlers move phi/theta directly
      } else if (focus) {
        const k = still ? 1 : 0.08
        phi += (nearest(phi, focus.phi) - phi) * k
        theta += (focus.theta - theta) * k
      } else if (!still) {
        phi += 0.0025
        theta += (0.3 - theta) * 0.02
      }
      globe.update({ phi, theta })
      if (visible) frame = requestAnimationFrame(tick)
    }

    // Only draw while the globe is on screen
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !frame) frame = requestAnimationFrame(tick)
    })
    io.observe(host)

    const ro = new ResizeObserver(() => globe.update({ width: size(), height: size() }))
    ro.observe(host)

    const down = (e: PointerEvent) => {
      drag = { x: e.clientX, y: e.clientY, phi, theta }
      host.setPointerCapture(e.pointerId)
      host.dataset.dragging = "true"
      focusRef.current = null
      setActive(null)
    }
    const move = (e: PointerEvent) => {
      if (!drag) return
      const s = size()
      phi = drag.phi + ((e.clientX - drag.x) / s) * Math.PI
      theta = Math.max(-0.8, Math.min(0.8, drag.theta + ((e.clientY - drag.y) / s) * Math.PI))
    }
    const up = () => {
      drag = null
      delete host.dataset.dragging
    }
    host.addEventListener("pointerdown", down)
    host.addEventListener("pointermove", move)
    host.addEventListener("pointerup", up)
    host.addEventListener("pointercancel", up)

    const fade = window.setTimeout(() => setReady(true), 50)

    return () => {
      window.clearTimeout(fade)
      if (frame) cancelAnimationFrame(frame)
      io.disconnect()
      ro.disconnect()
      host.removeEventListener("pointerdown", down)
      host.removeEventListener("pointermove", move)
      host.removeEventListener("pointerup", up)
      host.removeEventListener("pointercancel", up)
      globe.destroy()
      host.replaceChildren()
    }
  }, [])

  const choose = (id: Id) => {
    if (active === id) {
      focusRef.current = null
      setActive(null)
      return
    }
    const country = COUNTRIES.find((c) => c.id === id)!
    focusRef.current = anglesFor(country.location)
    setActive(id)
  }

  return (
    <section aria-labelledby="clients-title" className="overflow-hidden bg-navy px-5 pt-20 pb-16 text-on-navy sm:px-8 md:pt-32 md:pb-24">
      <div className="mx-auto grid max-w-[1360px] gap-10 md:grid-cols-12 md:grid-rows-[1fr_auto_auto_1fr] md:gap-x-8 md:gap-y-0">
        {/* On phones the globe sits between the heading and the list, so a tapped country is in view */}
        <div ref={headRef} data-reveal data-in={headIn} className="md:col-span-5 md:row-start-2">
          <h2 id="clients-title" className="max-w-[14ch] text-heading font-semibold tracking-tight">
            {t("Clients.title")}
          </h2>
          <p className="mt-5 max-w-[40ch] text-lg text-on-navy-soft">{t("Clients.lead")}</p>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[640px] md:col-span-7 md:col-start-6 md:row-span-4 md:row-start-1 md:self-center">
          <div
            ref={hostRef}
            role="img"
            aria-label={t("Clients.globeAlt")}
            className={`globe size-full transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
          />
          {COUNTRIES.map((c) => (
            <span
              key={c.id}
              aria-hidden
              data-active={active === c.id}
              data-side={SIDES[c.id]}
              className="globe-label"
              style={{ positionAnchor: `--cobe-${c.id}`, "--seen": `var(--cobe-visible-${c.id}, 0)` } as React.CSSProperties}
            >
              {t(`Clients.countries.${c.id}`)}
            </span>
          ))}
        </div>

        <div className="md:col-span-5 md:row-start-3 md:mt-10">
          <ul className="grid grid-cols-2 gap-x-6 border-t border-white/10">
            {COUNTRIES.map((c) => (
              <li key={c.id} className="border-b border-white/10">
                <button
                  type="button"
                  onClick={() => choose(c.id)}
                  aria-pressed={active === c.id}
                  className="group flex w-full cursor-pointer items-center gap-3 py-3.5 text-start"
                >
                  <span
                    aria-hidden
                    className={`size-2 shrink-0 rounded-full transition-[background-color,scale] duration-300 ${active === c.id ? "scale-150 bg-lift" : isOffice(c) ? "bg-white" : "bg-white/30 group-hover:bg-lift"}`}
                  />
                  <span className="min-w-0">
                    <span className={`block font-medium transition-colors ${active === c.id ? "text-lift" : "text-on-navy"}`}>
                      {t(`Clients.countries.${c.id}`)}
                    </span>
                    {isOffice(c) && <span className="block text-sm text-on-navy-soft">{t(`Clients.offices.${c.id}`)}</span>}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-on-navy-soft">{t("Clients.hint")}</p>
        </div>
      </div>
    </section>
  )
}
