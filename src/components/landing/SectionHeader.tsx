import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: string
  title: string | React.ReactNode
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeaderProps) {
  const alignCls = align === 'center' ? 'mx-auto text-center items-center' : 'items-start text-left'
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={cn('flex max-w-2xl flex-col gap-3', alignCls, className)}
    >
      {eyebrow && <span className="editorial-eyebrow">{eyebrow}</span>}
      <h2 className="font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg text-balance">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
