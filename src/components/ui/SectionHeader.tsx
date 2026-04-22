import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  id: string
  label?: string
  title: string
  subtitle?: string
  center?: boolean
  dark?: boolean
}

export function SectionHeader({
  id,
  label,
  title,
  subtitle,
  center,
  dark,
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-14', center && 'text-center')}>
      {label && (
        <p
          className={cn(
            'mb-5 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em]',
            dark ? 'text-white/40' : 'text-[var(--color-text-muted)]'
          )}
        >
          <span
            className={cn('block h-px w-8 opacity-50', dark ? 'bg-white' : 'bg-[var(--color-text-muted)]')}
            aria-hidden="true"
          />
          {label}
          <span
            className={cn('block h-px w-8 opacity-50', dark ? 'bg-white' : 'bg-[var(--color-text-muted)]')}
            aria-hidden="true"
          />
        </p>
      )}
      <h2
        id={id}
        className={cn(
          'text-fluid-section uppercase',
          dark ? 'text-white' : 'text-[var(--color-text)]'
        )}
        style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-fluid-sub max-w-2xl leading-relaxed',
            center && 'mx-auto',
            dark ? 'text-white/60' : 'text-[var(--color-text-secondary)]'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
