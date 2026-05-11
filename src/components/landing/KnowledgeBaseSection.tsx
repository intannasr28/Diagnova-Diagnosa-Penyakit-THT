import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BrainCircuit,
  Ear,
  Stethoscope,
  Wind,
} from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DISEASES, CF_RULES } from '@/data/diseases'
import { SYMPTOM_BY_CODE } from '@/data/symptoms'
import { cn } from '@/lib/utils'

const ICONS = {
  ear: Ear,
  nose: Wind,
  throat: Stethoscope,
  sinus: BrainCircuit,
  general: Stethoscope,
} as const

export function KnowledgeBaseSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            align="left"
            eyebrow="Knowledge Base"
            title={
              <>
                Lima penyakit THT,{' '}
                <span className="text-gradient">divalidasi pakar.</span>
              </>
            }
            subtitle="Setiap entri lengkap dengan ICD-10, gejala diagnostik, bobot pakar, dan saran penanganan."
            className="!max-w-2xl"
          />
          <Link
            to="/penyakit"
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          >
            Lihat semua
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DISEASES.map((d, idx) => {
            const Icon = ICONS[d.iconKey]
            const rules = CF_RULES.filter((r) => r.diseaseCode === d.code)
              .sort((a, b) => b.expertWeight - a.expertWeight)
              .slice(0, 4)
            const heaviest = rules[0]?.expertWeight ?? 0

            return (
              <motion.div
                key={d.code}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: idx * 0.06, duration: 0.5 }}
              >
                <Link to={`/penyakit/${d.code}`} className="group block h-full">
                  <article className="glass-card relative h-full overflow-hidden p-6 transition-transform group-hover:-translate-y-1">
                    <div
                      className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full blur-3xl"
                      style={{
                        background:
                          'radial-gradient(circle, rgba(14,165,233,0.25), transparent 70%)',
                      }}
                    />

                    <div className="flex items-start justify-between gap-3">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/15 via-violet-500/15 to-cyan-500/15 text-sky-600 dark:text-sky-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="font-mono text-[10px]">
                          {d.icdCode}
                        </Badge>
                        <p className="mt-1.5 font-mono text-[10px] text-muted-foreground">
                          peak cf {heaviest.toFixed(1)}
                        </p>
                      </div>
                    </div>

                    <h3 className="mt-5 font-display text-lg font-semibold leading-tight">
                      {d.name}
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {d.category}
                    </p>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {d.description}
                    </p>

                    <div className="mt-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Gejala diagnostik
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {rules.map((r) => {
                          const sym = SYMPTOM_BY_CODE[r.symptomCode]
                          if (!sym) return null
                          return (
                            <span
                              key={r.symptomCode}
                              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/70 px-2 py-0.5 text-[10px]"
                            >
                              <span
                                className="h-1 w-1 rounded-full"
                                style={{
                                  background:
                                    r.expertWeight >= 0.8
                                      ? '#10B981'
                                      : r.expertWeight >= 0.6
                                      ? '#0EA5E9'
                                      : '#94A3B8',
                                }}
                              />
                              {sym.name}
                              <span className="font-mono text-muted-foreground">
                                {r.expertWeight.toFixed(1)}
                              </span>
                            </span>
                          )
                        })}
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4 text-xs">
                      <Badge
                        variant={
                          d.severity === 'severe'
                            ? 'danger'
                            : d.severity === 'moderate'
                            ? 'warning'
                            : 'success'
                        }
                      >
                        {d.severity === 'severe'
                          ? 'Berat'
                          : d.severity === 'moderate'
                          ? 'Sedang'
                          : 'Ringan'}
                      </Badge>
                      <span className="inline-flex items-center gap-1 font-medium text-primary">
                        Detail
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </article>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
