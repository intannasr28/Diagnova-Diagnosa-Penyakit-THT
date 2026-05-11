import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Compass, Sparkles } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────────────────────────────
// Static data — deterministic pseudo-random so no re-render jitter
// ─────────────────────────────────────────────────────────────────────────────

const PARTICLE_COLORS = ['#38BDF8', '#818CF8', '#34D399', '#A78BFA', '#67E8F9']

const PARTICLES = Array.from({ length: 52 }, (_, i) => ({
  id: i,
  left: `${(((i * 1.618 + 0.5) * 37) % 100).toFixed(2)}%`,
  bottom: `${((i * 7) % 18) - 8}%`,
  size: 1.5 + (i % 3) * 0.8,
  duration: `${3.8 + (i % 7) * 0.88}s`,
  // negative delay = start mid-flight for a full screen of particles on load
  delay: `-${((i * 0.61) % 6).toFixed(2)}s`,
  color: PARTICLE_COLORS[i % 5],
}))

const ORBS = [
  { left: '12%',  top: '18%',  w: 540, h: 420, color: '#0EA5E9', opacity: 0.10 },
  { left: '72%',  top: '10%',  w: 620, h: 520, color: '#8B5CF6', opacity: 0.09 },
  { left: '48%',  top: '80%',  w: 500, h: 380, color: '#06B6D4', opacity: 0.08 },
]

// ─────────────────────────────────────────────────────────────────────────────
// Brain neural-network data
// ─────────────────────────────────────────────────────────────────────────────

const NEURAL_NODES = [
  { id: 'a', cx: 20, cy: 26 },
  { id: 'b', cx: 80, cy: 22 },
  { id: 'c', cx: 86, cy: 74 },
  { id: 'd', cx: 16, cy: 78 },
]

const NEURAL_EDGES = [
  // outer nodes → center
  { id: 'e1', d: 'M 20 26 Q 32 42 50 50', delay: 0.00 },
  { id: 'e2', d: 'M 80 22 Q 68 38 50 50', delay: 0.18 },
  { id: 'e3', d: 'M 86 74 Q 72 64 50 50', delay: 0.36 },
  { id: 'e4', d: 'M 16 78 Q 30 64 50 50', delay: 0.54 },
  // cross-connections
  { id: 'e5', d: 'M 20 26 Q 50 12 80 22',  delay: 0.72 },
  { id: 'e6', d: 'M 16 78 Q 51 90 86 74',  delay: 0.90 },
]

// ─────────────────────────────────────────────────────────────────────────────
// HeroSection
// ─────────────────────────────────────────────────────────────────────────────

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect()
      // Normalize [-1 → 1] relative to section center
      const nx = ((e.clientX - left) / width  - 0.5) * 2
      const ny = ((e.clientY - top)  / height - 0.5) * 2
      // Cap at ±20 px
      setParallax({ x: nx * 20, y: ny * 20 })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden"
      style={{
        background: 'linear-gradient(150deg, #0F172A 0%, #1E293B 55%, #0F1B2D 100%)',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >

      {/* ── Ambient glow orbs ───────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {ORBS.map((orb, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: orb.left,
              top: orb.top,
              width: orb.w,
              height: orb.h,
              background: orb.color,
              opacity: orb.opacity,
              filter: `blur(${Math.round(Math.max(orb.w, orb.h) / 2.1)}px)`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      {/* ── Particles ───────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="hero-particle absolute rounded-full"
            style={{
              left: p.left,
              bottom: p.bottom,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* ── Subtle grid overlay ─────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,1) 1px,transparent 1px),' +
            'linear-gradient(to right,rgba(148,163,184,1) 1px,transparent 1px)',
          backgroundSize: '64px 64px',
        }}
        aria-hidden
      />

      {/* ── Main content ────────────────────────────────────────────────── */}
      <div className="container relative z-10 py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.18fr_1fr] lg:gap-16">

          {/* ─── Copy column ─────────────────────────────────────────── */}
          <div>

            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-1.5 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/60" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span
                className="text-[11px] font-medium uppercase tracking-[0.18em]"
                style={{ color: 'rgba(255,255,255,0.52)' }}
              >
                Explainable Medical Intelligence · Diagnova v0.1
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28, filter: 'blur(14px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.10, duration: 0.88, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 font-display font-bold leading-[1.04] tracking-tight text-balance"
              style={{ fontSize: 'clamp(48px, 7vw, 84px)' }}
            >
              <span className="text-white">Where symptoms</span>
              <br />
              <span
                style={{
                  background:
                    'linear-gradient(95deg, #ffffff 0%, #38BDF8 42%, #34D399 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                become clarity.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.30, duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-[540px] text-base leading-relaxed md:text-[1.05rem]"
              style={{ color: 'rgba(255,255,255,0.48)' }}
            >
              Diagnova adalah asisten diagnosis cerdas untuk gangguan Telinga, Hidung,
              dan Tenggorokan. Mengubah keluhan yang samar menjadi insight yang terang
              — memadukan{' '}
              <span style={{ color: 'rgba(255,255,255,0.80)', fontWeight: 500 }}>
                basis pengetahuan dokter spesialis
              </span>{' '}
              dengan{' '}
              <span style={{ color: 'rgba(255,255,255,0.80)', fontWeight: 500 }}>
                analisis Certainty Factor
              </span>{' '}
              yang dapat ditelusuri sepenuhnya.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.44, duration: 0.72 }}
              className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
            >
              <Link
                to="/konsultasi"
                className={cn(buttonVariants({ size: 'xl' }), 'group min-w-[220px]')}
              >
                <Sparkles className="h-4 w-4" />
                Mulai Konsultasi
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/penyakit"
                className="group inline-flex min-w-[210px] items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.06] px-8 py-3.5 text-base font-semibold backdrop-blur-sm transition-all duration-200 hover:border-white/25 hover:bg-white/10"
                style={{ color: 'rgba(255,255,255,0.75)' }}
              >
                <Compass className="h-4 w-4" />
                Jelajahi Knowledge Base
              </Link>
            </motion.div>

            {/* Metric tiles */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.58, duration: 0.72 }}
              className="mt-10 flex max-w-[540px] divide-x divide-white/[0.08] rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm"
            >
              {[
                { v: '24',      l: 'Gejala terverifikasi' },
                { v: '5',       l: 'Penyakit · ICD-10' },
                { v: '< 3 mnt', l: 'Pre-konsultasi' },
              ].map((it) => (
                <div
                  key={it.l}
                  className="flex-1 px-4 py-3.5 text-center"
                >
                  <p className="font-display text-lg font-bold text-white">
                    {it.v}
                  </p>
                  <p
                    className="mt-0.5 text-[11px]"
                    style={{ color: 'rgba(255,255,255,0.38)' }}
                  >
                    {it.l}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0, duration: 0.8 }}
              className="mt-12 hidden items-center gap-2 md:flex"
              style={{ color: 'rgba(255,255,255,0.28)' }}
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.22em]">
                Scroll
              </span>
              <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
            </motion.div>
          </div>

          {/* ─── Brain visual column ──────────────────────────────────── */}
          <div
            className="mx-auto flex items-center justify-center"
            style={{
              transform: `translate(${parallax.x}px, ${parallax.y}px)`,
              transition: 'transform 0.14s ease-out',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.86 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.22, duration: 0.96, ease: [0.16, 1, 0.3, 1] }}
            >
              <BrainVisual />
            </motion.div>
          </div>

        </div>
      </div>

      {/* ── Bottom fade to page background ──────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background: 'linear-gradient(to bottom, transparent, hsl(var(--background)))',
        }}
        aria-hidden
      />
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Brain Visual
// ─────────────────────────────────────────────────────────────────────────────

function BrainVisual() {
  return (
    <div
      className="relative"
      style={{ width: 340, height: 340 }}
    >

      {/* Decorative concentric rings */}
      {([318, 278, 240] as const).map((d, i) => (
        <div
          key={d}
          className="absolute inset-0 m-auto rounded-full border"
          style={{
            width: d,
            height: d,
            borderColor: `rgba(56,189,248,${0.07 + i * 0.025})`,
          }}
        />
      ))}

      {/* Clockwise orbiting ring */}
      <div
        className="absolute inset-0 m-auto animate-orbit rounded-full border"
        style={{
          width: 260,
          height: 260,
          borderColor: 'rgba(255,255,255,0.05)',
          animationDuration: '22s',
        }}
      >
        <div
          className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400"
          style={{ boxShadow: '0 0 10px 4px rgba(56,189,248,0.75)' }}
        />
      </div>

      {/* Counter-clockwise orbiting ring */}
      <div
        className="absolute inset-0 m-auto animate-orbit rounded-full border"
        style={{
          width: 236,
          height: 236,
          borderColor: 'rgba(139,92,246,0.07)',
          animationDuration: '34s',
          animationDirection: 'reverse',
        }}
      >
        <div
          className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-violet-400/80"
          style={{ boxShadow: '0 0 7px 3px rgba(139,92,246,0.6)' }}
        />
      </div>

      {/* ── Main brain orb ────────────────────────────────────────────── */}
      <div
        className="brain-orb absolute inset-0 m-auto flex items-center justify-center overflow-hidden rounded-full"
        style={{
          width: 200,
          height: 200,
          background:
            'radial-gradient(circle at 38% 35%, rgba(56,189,248,0.32) 0%, rgba(14,165,233,0.20) 26%, rgba(139,92,246,0.16) 52%, rgba(15,23,42,0.93) 100%)',
        }}
      >

        {/* Neural connection lines */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden
        >
          {NEURAL_EDGES.map((edge) => (
            <motion.path
              key={edge.id}
              d={edge.d}
              stroke="rgba(56,189,248,0.55)"
              strokeWidth="0.65"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                delay: 0.55 + edge.delay,
                duration: 0.85,
                ease: 'easeOut',
              }}
            />
          ))}
        </svg>

        {/* Outer neural-node dots */}
        {NEURAL_NODES.map((node, idx) => (
          <motion.div
            key={node.id}
            className="absolute rounded-full"
            style={{
              left: `${node.cx}%`,
              top: `${node.cy}%`,
              width: 5,
              height: 5,
              marginLeft: -2.5,
              marginTop: -2.5,
              background: '#38BDF8',
              boxShadow: '0 0 7px 3px rgba(56,189,248,0.55)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 1.0 + idx * 0.13,
              duration: 0.38,
              type: 'spring',
              stiffness: 280,
              damping: 20,
            }}
          />
        ))}

        {/* Center spark */}
        <motion.div
          className="absolute rounded-full bg-white"
          style={{
            width: 12,
            height: 12,
            boxShadow:
              '0 0 22px 9px rgba(56,189,248,0.80), 0 0 48px 20px rgba(56,189,248,0.32)',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.5, type: 'spring' }}
        />

      </div>{/* /brain-orb */}
    </div>
  )
}
