import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BrainCircuit, Sparkles } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Soundwave } from '@/components/visuals/Soundwave'
import { cn } from '@/lib/utils'

export function CTASection() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-14 text-center text-slate-100 md:px-12 md:py-20"
        >
          {/* Decorative blobs */}
          <div className="ambient-blob inset-x-10 -top-20 h-72 bg-gradient-to-br from-sky-500/40 via-violet-500/30 to-cyan-500/40 opacity-90" />
          <div className="ambient-blob inset-x-20 bottom-0 h-40 bg-gradient-to-r from-violet-500/30 to-cyan-400/30" />
          <div
            className="pointer-events-none absolute inset-0 bg-grid-pattern bg-[size:48px_48px] opacity-30"
            style={{
              maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
              WebkitMaskImage:
                'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            }}
          />

          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
              <BrainCircuit className="h-3.5 w-3.5 text-sky-300" />
              Explainable Medical Intelligence
            </span>

            <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
              Diagnova menerangi gejala Anda{' '}
              <span className="bg-gradient-to-br from-sky-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                dalam tiga menit.
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
              Tanpa akun, tanpa kompromi privasi. Riwayat tersimpan lokal di perangkat
              Anda. Hasil bisa dibagikan dan dicetak — siap dibawa saat bertemu dokter
              spesialis THT.
            </p>

            <Soundwave bars={28} className="mx-auto mt-8 h-7 w-64 opacity-70" />

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/konsultasi"
                className={cn(buttonVariants({ size: 'xl' }), 'group min-w-[220px]')}
              >
                <Sparkles className="h-4 w-4" />
                Mulai Konsultasi Gratis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/tentang"
                className={cn(
                  'inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 text-sm font-semibold text-slate-100 backdrop-blur-md transition-colors hover:bg-white/10',
                )}
              >
                Pelajari metodologi
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
