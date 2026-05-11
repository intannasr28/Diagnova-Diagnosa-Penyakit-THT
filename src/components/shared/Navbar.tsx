import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const NAV = [
  { to: '/', label: 'Beranda' },
  { to: '/penyakit', label: 'Penyakit' },
  { to: '/tentang', label: 'Tentang' },
]

export function Navbar() {
  const location = useLocation()
  const showCTA = location.pathname !== '/konsultasi'

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="sticky top-0 z-30 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl"
    >
      <div className="container flex h-16 items-center justify-between gap-6">
        <Link to="/" aria-label="Beranda Diagnova">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {showCTA && (
            <Link
              to="/konsultasi"
              className={cn(buttonVariants({ size: 'sm' }), 'hidden sm:inline-flex')}
            >
              <Sparkles className="h-4 w-4" />
              Mulai Konsultasi
            </Link>
          )}
        </div>
      </div>
    </motion.header>
  )
}
