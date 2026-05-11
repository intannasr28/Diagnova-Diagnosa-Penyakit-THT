import { Link } from 'react-router-dom'
import { BookOpen, Github, Linkedin, Twitter } from 'lucide-react'
import { Logo } from './Logo'

const NAV_GROUPS = [
  {
    label: 'Produk',
    items: [
      { to: '/', label: 'Beranda' },
      { to: '/konsultasi', label: 'Konsultasi' },
      { to: '/penyakit', label: 'Knowledge Base' },
      { to: '/tentang', label: 'Metodologi' },
    ],
  },
  {
    label: 'Kapabilitas',
    items: [
      { to: '/tentang', label: 'Certainty Factor' },
      { to: '/tentang', label: 'Explainable AI' },
      { to: '/penyakit', label: 'Disease Library' },
      { to: '/konsultasi', label: 'Pre-konsultasi' },
    ],
  },
]

const REFS = [
  'Setyaputri, K.E., Fadlil, A., & Sunardi (2018) — Jurnal Teknik Elektro Vol. 10 No. 1',
  'dr. M. Agus Sugicharto, Sp.THT-KL — Sumber bobot pakar',
  'MYCIN expert system framework — Stanford Univ. (1976)',
]

const SOCIALS = [
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
]

export function Footer() {
  return (
    <footer className="relative mt-12 overflow-hidden border-t border-border/60 bg-background">
      {/* Editorial brand statement */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="container py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Diagnova adalah platform <em>Explainable Medical Intelligence</em>{' '}
              untuk gangguan Telinga, Hidung, dan Tenggorokan. Mengubah gejala yang
              tidak pasti menjadi insight diagnostik yang transparan — pendamping
              pre-konsultasi, bukan pengganti dokter.
            </p>

            <div className="mt-6 flex items-center gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background/60 text-muted-foreground backdrop-blur-md transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav groups */}
          {NAV_GROUPS.map((g) => (
            <div key={g.label}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {g.label}
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {g.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-foreground/80 transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* References */}
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <BookOpen className="h-3.5 w-3.5" />
              Referensi
            </p>
            <ul className="mt-4 space-y-2.5 text-xs leading-relaxed text-muted-foreground">
              {REFS.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Brand statement */}
        <div className="mt-14 rounded-3xl border border-border/60 bg-muted/30 p-6 md:p-10">
          <p className="font-display text-xl font-semibold tracking-tight md:text-2xl">
            "Where symptoms become clarity."
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Filosofi Diagnova — kepercayaan dimulai dari penjelasan, dan setiap
            diagnosis berhak ditelusuri kembali ke alasannya.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Diagnova — Frontend prototype</p>
          <p>Bukan pengganti diagnosis medis profesional.</p>
        </div>
      </div>
    </footer>
  )
}
