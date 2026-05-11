import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  withWordmark?: boolean
}

export function Logo({ className, withWordmark = true }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <NovaMark />
      {withWordmark && (
        <div className="flex items-baseline leading-none">
          <span className="font-display text-lg font-bold tracking-tight">Diag</span>
          <span className="font-display text-lg font-bold tracking-tight text-gradient">
            nova
          </span>
        </div>
      )}
    </div>
  )
}

export function NovaMark({ className }: { className?: string }) {
  return (
    <div className={cn('relative h-9 w-9', className)}>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-sky-400 via-sky-500 to-violet-600 shadow-[0_4px_14px_-4px_rgba(14,165,233,0.55)]" />
      <div className="absolute inset-[2px] rounded-[10px] bg-background/95 backdrop-blur-md" />
      <svg
        viewBox="0 0 32 32"
        className="absolute inset-0 m-auto h-full w-full p-[6px]"
        fill="none"
      >
        <defs>
          <linearGradient id="nova-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <radialGradient id="nova-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* soft halo */}
        <circle cx="16" cy="16" r="11" fill="url(#nova-glow)" opacity="0.55" />
        {/* outer ring */}
        <circle
          cx="16"
          cy="16"
          r="9"
          stroke="url(#nova-stroke)"
          strokeWidth="1.2"
          opacity="0.55"
        />
        {/* radiating rays — alternating long/short */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const long = i % 2 === 0
          const r1 = 4
          const r2 = long ? 13.5 : 11
          const a = (angle * Math.PI) / 180
          const x1 = 16 + Math.cos(a) * r1
          const y1 = 16 + Math.sin(a) * r1
          const x2 = 16 + Math.cos(a) * r2
          const y2 = 16 + Math.sin(a) * r2
          return (
            <line
              key={angle}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#nova-stroke)"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          )
        })}
        {/* center spark */}
        <circle cx="16" cy="16" r="2.4" fill="url(#nova-stroke)" />
        <circle cx="16" cy="16" r="1.1" fill="white" />
      </svg>
    </div>
  )
}
