import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { BrainCircuit, MousePointerClick, Sparkles } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { MiniConfidenceRing } from '@/components/visuals/MiniConfidenceRing'
import { Soundwave } from '@/components/visuals/Soundwave'
import { mockDiagnose } from '@/data/mockDiagnosis'
import { CF_WEIGHT_OPTIONS, confidenceColor, cn } from '@/lib/utils'

interface DemoSymptom {
  code: string
  name: string
  defaultWeight: number
}

const DEMO_SYMPTOMS: DemoSymptom[] = [
  { code: 'G014', name: 'Sakit kepala', defaultWeight: 0.6 },
  { code: 'G005', name: 'Hidung mampet', defaultWeight: 0.8 },
  { code: 'G013', name: 'Pilek', defaultWeight: 0.6 },
  { code: 'G001', name: 'Batuk', defaultWeight: 0.6 },
  { code: 'G003', name: 'Dahak di tenggorok', defaultWeight: 0.4 },
]

export function LiveDiagnosisDemo() {
  const [weights, setWeights] = useState<Record<string, number>>(() =>
    Object.fromEntries(DEMO_SYMPTOMS.map((s) => [s.code, s.defaultWeight])),
  )

  // Subtle auto-pulse on default for first impression — only if untouched
  const [touched, setTouched] = useState(false)
  useEffect(() => {
    if (touched) return
    const id = setInterval(() => {
      setWeights((prev) => ({
        ...prev,
        G014: prev.G014 === 0.6 ? 1.0 : 0.6,
      }))
    }, 3500)
    return () => clearInterval(id)
  }, [touched])

  const result = useMemo(() => {
    const map = new Map<string, number>()
    for (const [k, v] of Object.entries(weights)) {
      if (v > 0) map.set(k, v)
    }
    return mockDiagnose(map)
  }, [weights])

  const primary = result[0]
  const c = primary ? confidenceColor(primary.confidenceLevel) : null

  return (
    <section className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 mesh-gradient-soft opacity-80 dark:opacity-50" />
      <div className="container">
        <SectionHeader
          align="left"
          eyebrow="Live · Interactive"
          title={
            <>
              Coba langsung —{' '}
              <span className="text-gradient">tanpa perlu daftar.</span>
            </>
          }
          subtitle="Geser tingkat keyakinan setiap gejala dan lihat sistem Diagnova memperbarui peringkat diagnosis dan tingkat keyakinannya secara real-time."
          className="!max-w-3xl"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_minmax(0,420px)]">
          {/* Symptom panel */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Panel Gejala · Demo
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold">
                  Tingkat keyakinan Anda
                </h3>
              </div>
              <div className="hidden items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-1 text-[10px] text-muted-foreground sm:flex">
                <MousePointerClick className="h-3 w-3" />
                Klik untuk mengubah
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {DEMO_SYMPTOMS.map((s) => (
                <div
                  key={s.code}
                  className="rounded-xl border border-border/60 bg-background/60 p-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{s.name}</p>
                      <p className="font-mono text-[10px] text-muted-foreground">{s.code}</p>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      cf user · {weights[s.code]?.toFixed(1) ?? '0.0'}
                    </span>
                  </div>

                  <div className="mt-2.5 grid grid-cols-6 gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setTouched(true)
                        setWeights((p) => ({ ...p, [s.code]: 0 }))
                      }}
                      className={cn(
                        'rounded-md border py-1.5 text-[10px] font-medium transition-colors',
                        weights[s.code] === 0
                          ? 'border-rose-500/40 bg-rose-500/10 text-rose-600 dark:text-rose-400'
                          : 'border-border bg-background hover:border-rose-300',
                      )}
                    >
                      tidak
                    </button>
                    {CF_WEIGHT_OPTIONS.map((opt) => {
                      const active = weights[s.code] === opt.value
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            setTouched(true)
                            setWeights((p) => ({ ...p, [s.code]: opt.value }))
                          }}
                          className={cn(
                            'rounded-md border py-1.5 font-mono text-[10px] font-semibold transition-colors',
                            active
                              ? 'border-primary/50 bg-primary/10 text-primary'
                              : 'border-border bg-background hover:border-primary/30',
                          )}
                        >
                          {opt.short}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Result panel */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="space-y-4"
          >
            <div className="glass-card relative overflow-hidden p-6">
              <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-gradient-to-br from-emerald-400/30 to-cyan-500/30 blur-3xl" />
              <div className="flex items-center justify-between">
                <span className="editorial-eyebrow !text-[10px]">
                  <Sparkles className="h-3 w-3 text-amber-500" />
                  Diagnosis utama
                </span>
                {primary && (
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {primary.diseaseCode}
                  </span>
                )}
              </div>

              {primary ? (
                <div className="mt-5 flex items-center gap-5">
                  <MiniConfidenceRing
                    value={primary.cfValue}
                    size={120}
                    stroke={10}
                    color={c?.hex ?? '#10B981'}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {primary.diseaseCategory}
                    </p>
                    <h4 className="mt-0.5 font-display text-2xl font-semibold leading-tight">
                      {primary.diseaseName}
                    </h4>
                    {c && (
                      <span
                        className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${c.bg} ${c.text}`}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: c.hex }}
                        />
                        {c.label}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
                  <BrainCircuit className="h-6 w-6 text-muted-foreground" />
                  <p className="mt-2 text-sm font-medium">Pilih minimal satu gejala</p>
                  <p className="text-xs text-muted-foreground">
                    Sistem akan menampilkan diagnosis di sini
                  </p>
                </div>
              )}

              <div className="mt-5 flex items-center gap-2 rounded-lg border border-border/60 bg-background/60 px-3 py-2">
                <BrainCircuit className="h-3.5 w-3.5 text-violet-500" />
                <Soundwave bars={20} className="h-5 flex-1" />
                <span className="font-mono text-[10px] text-muted-foreground">
                  {result.length > 0 ? `${result.length} kandidat` : 'idle'}
                </span>
              </div>
            </div>

            {/* Ranking */}
            <div className="glass-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Peringkat kandidat
              </p>
              <ul className="mt-3 space-y-2">
                {result.length === 0 && (
                  <li className="rounded-lg border border-dashed border-border bg-muted/30 px-3 py-3 text-center text-xs text-muted-foreground">
                    Belum ada kandidat
                  </li>
                )}
                {result.map((r) => {
                  const cc = confidenceColor(r.confidenceLevel)
                  return (
                    <motion.li
                      key={r.diseaseCode}
                      layout
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={cn(
                        'flex items-center gap-3 rounded-xl border px-3 py-2.5',
                        r.rank === 1
                          ? 'border-emerald-500/30 bg-emerald-500/5'
                          : 'border-border/60 bg-background',
                      )}
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted font-mono text-[10px] font-bold">
                        #{r.rank}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{r.diseaseName}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {r.diseaseCategory}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`font-mono text-sm font-semibold ${cc.text}`}>
                          {r.cfPercentage}
                        </p>
                        <p className="text-[10px] text-muted-foreground">{cc.label}</p>
                      </div>
                    </motion.li>
                  )
                })}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
