"use client"

import { useEffect, useMemo, useState } from "react"
import { useI18n } from "@/lib/i18n"
import { useInView } from "@/lib/use-in-view"

type Square = { x: number; y: number; tone: "pale" | "pale2" | "ink" | "green"; dx: number; dy: number; d: number; phase: number }

// Deterministic noise so server and client draw the same diagram
function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}

const W = 960
const H = 210
const S = 12

/** Many suppliers (scatter) pass through one agent (ribbon) and leave as ordered shipments (rows). */
function buildSquares(): Square[] {
  const r = rng(2004)
  const out: Square[] = []
  // Scatter: the many factories
  for (let i = 0; i < 46; i++) {
    out.push({
      x: 8 + r() * (W / 3 - 40),
      y: 8 + r() * (H - 28),
      tone: r() > 0.5 ? "pale" : "pale2",
      dx: (r() - 0.5) * 60,
      dy: (r() - 0.5) * 60,
      d: Math.round(r() * 300),
      phase: 0,
    })
  }
  // Ribbon: one agent, three squares high
  const ribbonTop = H / 2 - (3 * (S + 2)) / 2
  for (let c = 0; c < 21; c++) {
    for (let row = 0; row < 3; row++) {
      out.push({
        x: W / 3 + c * (S + 2),
        y: ribbonTop + row * (S + 2),
        tone: "ink",
        dx: -80 + r() * 20,
        dy: (row - 1) * 40,
        d: 250 + c * 18,
        phase: 1,
      })
    }
  }
  // Rows: ordered shipments
  for (let row = 0; row < 5; row++) {
    for (let c = 0; c < 9; c++) {
      out.push({
        x: (2 * W) / 3 + 24 + c * 30,
        y: 22 + row * 38,
        tone: "green",
        dx: -60,
        dy: (2 - row) * 18,
        d: 650 + c * 30 + row * 20,
        phase: 2,
      })
    }
  }
  return out
}

const FILL: Record<Square["tone"], string> = {
  pale: "#bdbdbd",
  pale2: "#d6d6d6",
  ink: "var(--ink)",
  green: "var(--green)",
}

const PHASES = [
  { steps: [0, 1] },
  { steps: [2, 3] },
  { steps: [4, 5, 6] },
]

function Diagram({ vertical, label, active }: { vertical?: boolean; label: string; active: number | null }) {
  const squares = useMemo(buildSquares, [])
  return (
    <svg
      viewBox={vertical ? `0 0 ${H} ${W}` : `0 0 ${W} ${H}`}
      role="img"
      aria-label={label}
      className="block h-auto w-full rtl:-scale-x-100"
    >
      {PHASES.map((_, phase) => (
        <g
          key={phase}
          className="transition-opacity duration-500"
          style={{ opacity: active === null || active === phase ? 1 : 0.22 }}
        >
          {squares
            .filter((s) => s.phase === phase)
            .map((s, i) => (
              <rect
                key={i}
                className="flow-sq"
                x={vertical ? s.y : s.x}
                y={vertical ? s.x : s.y}
                width={S}
                height={S}
                fill={FILL[s.tone]}
                style={
                  {
                    "--dx": `${vertical ? s.dy : s.dx}px`,
                    "--dy": `${vertical ? s.dx : s.dy}px`,
                    "--d": `${s.d}ms`,
                  } as React.CSSProperties
                }
              />
            ))}
        </g>
      ))}
    </svg>
  )
}

const CYCLE_MS = 2600

/** Once the diagram has assembled, it walks through the phases until the reader takes over. */
function usePhaseTour(started: boolean, count: number) {
  const [active, setActive] = useState<number | null>(null)
  const [touched, setTouched] = useState(false)
  useEffect(() => {
    if (!started || touched || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = window.setTimeout(
      () => setActive((i) => (i === null ? 0 : (i + 1) % count)),
      active === null ? 2200 : CYCLE_MS
    )
    return () => window.clearTimeout(id)
  }, [started, touched, active, count])
  const choose = (i: number | null) => {
    setTouched(true)
    setActive(i)
  }
  return [active, choose] as const
}

export function WorkflowSection() {
  const { t, locale } = useI18n()
  const [headRef, headIn] = useInView()
  const [diagramRef, diagramIn] = useInView(0.8)
  const [listRef, listIn] = useInView()
  const [active, choose] = usePhaseTour(diagramIn, PHASES.length)
  const label = t("Workflow.diagramAlt")

  return (
    <section id="workflow" aria-labelledby="workflow-title" className="bg-paper-2 px-5 py-20 sm:px-8 md:py-40">
      <div className="mx-auto max-w-[1360px]">
        <div ref={headRef} data-reveal data-in={headIn} className="grid gap-6 md:grid-cols-12">
          <h2 id="workflow-title" className="max-w-[12ch] text-heading font-semibold text-ink md:col-span-5">
            {t("Workflow.title")}
          </h2>
          <p className="max-w-[40ch] self-end text-lg text-ink md:col-span-5 md:col-start-7">{t("Workflow.intro")}</p>
        </div>

        <div className="mt-16 grid grid-cols-[38%_1fr] gap-6 md:mt-24 md:block">
          <div ref={diagramRef} data-in={diagramIn}>
            <div className="hidden md:block">
              <Diagram label={label} active={active} />
            </div>
            <div className="md:hidden">
              <Diagram vertical label={label} active={active} />
            </div>
          </div>

          <div
            ref={listRef}
            data-reveal
            data-in={listIn}
            onPointerLeave={(e) => e.pointerType === "mouse" && choose(null)}
            className="grid content-between gap-8 md:mt-12 md:grid-cols-3 md:gap-10"
          >
            {PHASES.map((phase, i) => (
              <div
                key={i}
                onPointerEnter={(e) => e.pointerType === "mouse" && choose(i)}
                className="relative pt-5"
              >
                <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-[#d6d6d6]" />
                <span
                  aria-hidden
                  className={`absolute inset-x-0 top-0 h-0.5 origin-left bg-green transition-transform duration-500 ease-[var(--ease-out-strong)] rtl:origin-right ${active === i ? "scale-x-100" : "scale-x-0"}`}
                />
                <h3>
                  <button
                    type="button"
                    onClick={() => choose(active === i ? null : i)}
                    aria-pressed={active === i}
                    className="cursor-pointer text-start text-xl font-semibold text-ink"
                  >
                    {t(`Workflow.phases.${i}.name`)}
                  </button>
                </h3>
                <p className="mt-1 text-body text-ink">{t(`Workflow.phases.${i}.desc`)}</p>
                <ol
                  start={phase.steps[0] + 1}
                  className="mt-4 space-y-3 ps-5 text-[15px] text-ink-soft marker:font-semibold marker:text-ink"
                  style={{ listStyleType: locale === "ar" ? "arabic-indic" : "decimal" }}
                >
                  {phase.steps.map((s) => (
                    <li key={s}>
                      <span className="font-medium text-ink">{t(`Workflow.steps.${s}.title`)}</span>
                      <span className="block">{t(`Workflow.steps.${s}.desc`)}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
