import { motion } from 'framer-motion'
import { BrainCircuit, ListChecks, ScanSearch } from 'lucide-react'
import { Soundwave } from '@/components/visuals/Soundwave'
import { SectionHeader } from './SectionHeader'

const STEPS = [
  {
    icon: ListChecks,
    eyebrow: 'Step 01',
    title: 'Pilih gejala yang Anda rasakan',
    desc: 'Tandai 24 gejala THT terverifikasi dengan tingkat keyakinan dari ragu-ragu hingga pasti.',
    visual: <SymptomVisual />,
    accent: 'from-sky-400 to-sky-600',
  },
  {
    icon: BrainCircuit,
    eyebrow: 'Step 02',
    title: 'AI menganalisis Certainty Factor',
    desc: 'Bobot Anda dikombinasikan dengan bobot pakar secara iteratif untuk menghasilkan keyakinan diagnosis.',
    visual: <CFVisual />,
    accent: 'from-violet-400 to-violet-600',
  },
  {
    icon: ScanSearch,
    eyebrow: 'Step 03',
    title: 'Diagnosis yang bisa dijelaskan',
    desc: 'Lihat peringkat penyakit, persentase keyakinan, dan jejak penalaran lengkap di balik tiap kesimpulan.',
    visual: <ExplainVisual />,
    accent: 'from-emerald-400 to-cyan-500',
  },
]

export function HowItWorksSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container">
        <SectionHeader
          eyebrow="Cara Kerja"
          title={
            <>
              Tiga langkah,{' '}
              <span className="text-gradient">satu pemahaman utuh.</span>
            </>
          }
          subtitle="Bukan kotak hitam — Anda dapat menelusuri tepat gejala mana yang berkontribusi dan seberapa besar pengaruhnya pada hasil akhir."
        />

        <div className="relative mt-16">
          {/* Connector line */}
          <div className="pointer-events-none absolute left-1/2 top-12 hidden h-[calc(100%-3rem)] w-px -translate-x-1/2 bg-gradient-to-b from-sky-400/0 via-violet-400/40 to-emerald-400/0 lg:block" />

          <div className="grid gap-12 lg:grid-cols-3 lg:gap-6">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="glass-card relative overflow-hidden p-6">
                  {/* Step accent */}
                  <div
                    className={`pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br ${s.accent} opacity-20 blur-3xl`}
                  />
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      {s.eyebrow}
                    </span>
                    <div
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.accent} text-white shadow-[0_10px_22px_-10px_rgba(14,165,233,0.5)]`}
                    >
                      <s.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold leading-tight text-balance">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                  <div className="mt-6 rounded-xl border border-border/60 bg-background/60 p-4">
                    {s.visual}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SymptomVisual() {
  const items = [
    { code: 'G014', name: 'Sakit kepala', w: 0.6, active: true },
    { code: 'G005', name: 'Hidung mampet', w: 0.8, active: true },
    { code: 'G013', name: 'Pilek', w: 0.6, active: true },
    { code: 'G001', name: 'Batuk', w: 0, active: false },
  ]
  return (
    <div className="space-y-1.5">
      {items.map((it, i) => (
        <motion.div
          key={it.code}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 + i * 0.08 }}
          className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-xs ${
            it.active
              ? 'border-sky-500/30 bg-sky-500/5'
              : 'border-border/60 bg-muted/30 opacity-60'
          }`}
        >
          <span className="font-mono text-[10px] text-muted-foreground">{it.code}</span>
          <span className="flex-1 truncate">{it.name}</span>
          {it.active ? (
            <span className="rounded-full bg-sky-500/15 px-2 py-0.5 font-mono text-[10px] text-sky-600 dark:text-sky-300">
              {it.w.toFixed(1)}
            </span>
          ) : (
            <span className="font-mono text-[10px] text-muted-foreground">—</span>
          )}
        </motion.div>
      ))}
    </div>
  )
}

function CFVisual() {
  return (
    <div className="space-y-2.5">
      <div className="rounded-lg bg-slate-900/95 p-3 font-mono text-[11px] leading-relaxed text-slate-100 dark:bg-slate-100/95 dark:text-slate-900">
        <p className="text-violet-300 dark:text-violet-600">// combine iteratif</p>
        <p>cf₁ = 0.48</p>
        <p>cf₂ = 0.48 + 0.60·(1−0.48)</p>
        <p className="text-emerald-400 dark:text-emerald-700">
          cf₃ = 0.794 + 0.48·(1−0.794) ≈ 0.917
        </p>
      </div>
      <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-background p-2.5">
        <BrainCircuit className="h-4 w-4 text-violet-500" />
        <Soundwave bars={20} className="h-5 flex-1" />
        <span className="font-mono text-[10px] text-muted-foreground">analyzing…</span>
      </div>
    </div>
  )
}

function ExplainVisual() {
  const items = [
    { name: 'Sinusitis', cf: 0.917, top: true },
    { name: 'Rhinitis Kronis', cf: 0.612 },
    { name: 'OMA', cf: 0.34 },
  ]
  return (
    <div className="space-y-1.5">
      {items.map((it, i) => (
        <motion.div
          key={it.name}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 + i * 0.1 }}
          className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-xs ${
            it.top
              ? 'border-emerald-500/30 bg-emerald-500/5'
              : 'border-border/60 bg-background'
          }`}
        >
          <span className="w-4 text-center font-mono text-[10px] text-muted-foreground">
            #{i + 1}
          </span>
          <span className="flex-1 truncate font-medium">{it.name}</span>
          <div className="relative h-1.5 w-16 overflow-hidden rounded-full bg-muted">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${it.cf * 100}%` }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.7 }}
              className={`absolute inset-y-0 left-0 rounded-full ${
                it.top
                  ? 'bg-gradient-to-r from-emerald-400 to-cyan-500'
                  : 'bg-muted-foreground/40'
              }`}
            />
          </div>
          <span className="w-10 text-right font-mono text-[10px]">
            {(it.cf * 100).toFixed(0)}%
          </span>
        </motion.div>
      ))}
    </div>
  )
}
