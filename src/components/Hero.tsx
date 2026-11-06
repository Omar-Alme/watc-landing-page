"use client"

import { useEffect, useRef, useState } from "react"
import { ClipboardCheck, Factory, FileText, Ship } from "lucide-react"
import { BookAction, WhatsAppAction } from "@/components/Actions"
import { useI18n } from "@/lib/i18n"

/*
 * Scroll-driven hero. A reach stacker loads a container onto a truck (all of it in the clip,
 * which is only ever scrubbed, never played), the camera pulls back onto a black ground,
 * and the services slide past behind and beneath the truck.
 */

const CLIP = {
  hd: "/video/freight-1080.mp4",
  sd: "/video/freight-720.mp4",
  poster: "/video/freight-poster.jpg",
  w: 1920,
  h: 1080,
  duration: 4.0417,
}
// Where the clip's ground line sits, as a share of frame height: at the start and once settled
const EDGE_START = 0.829
const EDGE_END = 0.448
// Scroll budget for the clip, in viewports
const A = 2.4

const SERVICES = [
  { key: "sourcing", Icon: Factory },
  { key: "inspection", Icon: ClipboardCheck },
  { key: "shipping", Icon: Ship },
  { key: "consulting", Icon: FileText },
] as const

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v))

/** Current time in Guangzhou; null until mounted so server and client agree. */
function useGuangzhouTime() {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const id = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(id)
  }, [])
  if (!now) return null
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Shanghai",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now)
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0)
  const minute = parts.find((p) => p.type === "minute")?.value ?? "00"
  return { label: `${String(hour).padStart(2, "0")}:${minute}`, awake: hour >= 8 && hour < 21 }
}

/** Splits "Shipping & Logistics" into two lines for the card titles. */
function twoLines(title: string) {
  const words = title.split(" ")
  if (words.length < 2) return [title, ""]
  const mid = Math.ceil(words.length / 2)
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")]
}

export function Hero() {
  const { t, locale, toLocaleDigits } = useI18n()
  const time = useGuangzhouTime()
  const [settled, setSettled] = useState(false)
  const [introGone, setIntroGone] = useState(false)

  const trackRef = useRef<HTMLDivElement | null>(null)
  const sceneRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const lettersRef = useRef<HTMLDivElement | null>(null)
  const stripRef = useRef<HTMLDivElement | null>(null)
  const introRef = useRef<HTMLDivElement | null>(null)
  const speedRef = useRef<HTMLSpanElement | null>(null)
  const cardRefs = useRef<(HTMLLIElement | null)[]>([])

  const rtl = locale === "ar"

  useEffect(() => {
    const track = trackRef.current
    const scene = sceneRef.current
    const video = videoRef.current
    const letters = lettersRef.current
    const strip = stripRef.current
    const intro = introRef.current
    if (!track || !scene || !video || !letters || !strip || !intro) return

    // Smaller file where the clip is drawn small
    const src = window.innerWidth <= 900 ? CLIP.sd : CLIP.hd
    if (!video.src.endsWith(src)) {
      video.src = src
      video.load()
    }
    // iOS paints nothing for a video that has never decoded a frame; nudge it once
    const prime = () => {
      const p = video.play()
      if (p) p.then(() => video.pause()).catch(() => {})
    }
    video.addEventListener("loadeddata", prime, { once: true })

    let vw = 0
    let vh = 0
    let stripW = 0
    let lettersW = 0
    let B = 1

    const layout = () => {
      vw = document.documentElement.clientWidth
      vh = window.innerHeight
      const phone = vw < 768 || vw <= vh
      let w: number, h: number, left: number, top: number
      if (phone) {
        w = vw * 1.55
        h = (w * CLIP.h) / CLIP.w
        left = vw / 2 - 0.4 * w
        top = 0.36 * vh - EDGE_END * h
      } else {
        const s = Math.max(vw / CLIP.w, vh / CLIP.h)
        w = CLIP.w * s
        h = CLIP.h * s
        left = (vw - w) / 2
        top = (vh - h) / 2
      }
      Object.assign(video.style, {
        width: `${w}px`,
        height: `${h}px`,
        left: `${left}px`,
        top: `${top}px`,
        objectFit: "fill",
      })
      scene.style.setProperty("--edge-px", `${top + EDGE_END * h}px`)
      scene.style.setProperty("--start-px", `${top + EDGE_START * h}px`)
      scene.style.setProperty("--ground-px", `${top + 0.9 * h}px`)
      stripW = strip.scrollWidth
      lettersW = letters.scrollWidth
      B = ((stripW + 0.45 * vw) / vw) * 1.1
      track.style.height = `${(1 + A + B) * vh}px`
    }

    let cur = 0
    let frame = 0
    let lastY = window.scrollY
    let lastT = performance.now()
    let speed = 0
    let wasSettled = false
    let wasGone = false

    const seek = () => {
      if (video.readyState < 1 || video.seeking) return
      if (Math.abs(video.currentTime - cur) > 1 / 60) video.currentTime = cur
    }
    video.addEventListener("seeked", seek)

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick)
      const y = -track.getBoundingClientRect().top
      if (y > track.offsetHeight) return

      // Clip
      const q = clamp(y / (A * vh))
      const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : CLIP.duration
      const target = q * (duration - 1 / 48)
      cur += (target - cur) * 0.2
      seek()

      // Intro steps aside as the stacker starts to lift
      const out = clamp(q / 0.12)
      intro.style.opacity = String(1 - out)
      intro.style.transform = `translateY(${-out * 40}px)`
      const gone = out > 0.6
      if (gone !== wasGone) {
        wasGone = gone
        setIntroGone(gone)
      }

      const isSettled = q >= 0.94
      if (isSettled !== wasSettled) {
        wasSettled = isSettled
        scene.dataset.settled = String(isSettled)
        setSettled(isSettled)
      }

      // Strip and giant letters travel across the band
      const r = clamp((y - A * vh) / (B * vh))
      const stripX = vw - r * (stripW + 0.45 * vw)
      const lettersX = vw - r * (lettersW + vw)
      strip.style.transform = rtl
        ? `translateX(${-(stripX + stripW - vw)}px)`
        : `translateX(${stripX}px)`
      letters.style.transform = rtl
        ? `translate(${-(lettersX + lettersW - vw)}px, -100%)`
        : `translate(${lettersX}px, -100%)`

      for (const card of cardRefs.current) {
        if (!card) continue
        const rect = card.getBoundingClientRect()
        const lead = rtl ? vw - rect.right : rect.left
        const s = clamp((0.98 - lead / vw) / 0.3, -0.4, 1.6) * 100
        card.style.setProperty("--s", `${s}%`)
      }

      // Speed readout: smoothed scroll speed
      const dt = Math.max(1, now - lastT) / 1000
      const inst = Math.abs(window.scrollY - lastY) / dt / 32
      speed += (inst - speed) * 0.12
      lastY = window.scrollY
      lastT = now
      if (speedRef.current) {
        speedRef.current.textContent = String(Math.min(99, Math.round(speed))).padStart(2, "0")
      }
    }

    layout()
    // Fonts change the strip's width; measure again once they land
    document.fonts?.ready.then(layout)
    const onResize = () => layout()
    window.addEventListener("resize", onResize)
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", onResize)
      video.removeEventListener("seeked", seek)
      video.removeEventListener("loadeddata", prime)
    }
  }, [rtl])

  const words = t("Hero.headline").split(" ")

  return (
    <section aria-labelledby="hero-title" className="freight">
      <div ref={trackRef} className="freight-track">
        <div ref={sceneRef} className="freight-scene" data-settled="false">
          <video
            ref={videoRef}
            className="freight-video"
            poster={CLIP.poster}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-hidden
            tabIndex={-1}
          />

          <div ref={lettersRef} aria-hidden className="freight-letters">
            {t("Hero.freight.letters")}
          </div>

          <p aria-hidden className="freight-speed">
            <span ref={speedRef}>00</span> {t("Hero.freight.kmh")}
          </p>

          {/* Before scrolling: the promise and the two ways to reach us */}
          <div ref={introRef} className="freight-intro" inert={introGone || undefined}>
            <div className="freight-head">
              <h1 id="hero-title" className="text-balance text-[clamp(2.25rem,3.6vw,3.5rem)] leading-[1.02] font-semibold tracking-[-0.03em]">
                {words.map((word, i) => (
                  <span key={`${word}-${i}`} className="word-rise" style={{ "--w": i } as React.CSSProperties}>
                    {word}
                    {i < words.length - 1 ? " " : ""}
                  </span>
                ))}
              </h1>
              <p className="hero-after mt-4 max-w-[34ch] text-base sm:text-lg [@media(max-height:700px)]:hidden">
                {t("Hero.subhead")}
              </p>
            </div>

            <div className="freight-actions hero-after">
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                <BookAction />
                <WhatsAppAction />
              </div>
              <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-[14px] text-white/70">
                <span aria-live="off">
                  {t("Hero.city")}{" "}
                  <span className="tabular font-medium text-white">
                    {time ? toLocaleDigits(time.label) : "··:··"}
                  </span>
                  {time && (
                    <>
                      {" · "}
                      <span className="inline-flex items-center gap-1.5">
                        <span aria-hidden className="relative inline-flex size-2">
                          {time.awake && <span className="pulse-dot absolute inset-0 rounded-full bg-lift" />}
                          <span
                            className={`relative inline-block size-2 rounded-full ${time.awake ? "bg-lift" : "bg-white/50"}`}
                          />
                        </span>
                        {time.awake ? t("Hero.awake") : t("Hero.asleep")}
                      </span>
                    </>
                  )}
                </span>
                <span>{toLocaleDigits(t("Hero.since"))}</span>
              </p>
            </div>
          </div>

          <div className="freight-band">
            <div ref={stripRef} className="freight-strip">
              <div className="freight-lead">
                <h2>
                  {[0, 1, 2].map((i) => (
                    <span key={i} className={`block ${i === 2 ? "text-[var(--lift)]" : ""}`}>
                      {t(`Hero.freight.lines.${i}`)}
                    </span>
                  ))}
                </h2>
                <div className="freight-lead-copy">
                  <p>{t("Hero.freight.paras.0")}</p>
                  <p>{t("Hero.freight.paras.1")}</p>
                </div>
              </div>

              <ul className="freight-cards" aria-label={t("Hero.freight.servicesLabel")}>
                {SERVICES.map(({ key, Icon }, i) => {
                  const [l1, l2] = twoLines(t(`Services.items.${key}.title`))
                  return (
                    <li
                      key={key}
                      ref={(el) => {
                        cardRefs.current[i] = el
                      }}
                      className="freight-card"
                    >
                      <Icon aria-hidden strokeWidth={1.25} className="text-white" />
                      <h3 className="freight-sweep">
                        <span className="block">{l1}</span>
                        <span className="block">{l2}</span>
                      </h3>
                      <p className="freight-sweep">{t(`Services.items.${key}.desc`)}</p>
                    </li>
                  )
                })}
              </ul>
            </div>

            <a
              href="#contact"
              inert={!settled || undefined}
              className="freight-pill press inline-flex h-11 items-center rounded-full border border-white/70 px-6 text-[13px] font-medium tracking-[0.1em] whitespace-nowrap text-white uppercase hover:bg-white hover:text-[#111]"
            >
              {t("Common.cta.button")}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
