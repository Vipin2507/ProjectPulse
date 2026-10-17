import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const TONES = {
  sales: { card: 'bg-kpi-sales', icon: 'bg-white text-brand' },
  received: { card: 'bg-kpi-received', icon: 'bg-white text-success' },
  outstanding: { card: 'bg-kpi-outstanding', icon: 'bg-white text-warning' },
  overdue: { card: 'bg-kpi-overdue', icon: 'bg-white text-danger' },
  due: { card: 'bg-kpi-due', icon: 'bg-white text-brand' },
} as const;

export type KpiTone = keyof typeof TONES;

export function KpiCard({
  icon: Icon,
  label,
  value,
  subLabel,
  tone,
  subTone = 'muted',
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  subLabel: string;
  tone: KpiTone;
  subTone?: 'muted' | 'danger';
}) {
  return (
    <article className={cn('flex items-center gap-3 rounded-xl p-3.5 shadow-card', TONES[tone].card)}>
      <span
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
          TONES[tone].icon,
        )}
      >
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-ink-muted">{label}</p>
        <p className="truncate text-lg font-semibold tabular-nums leading-tight text-ink">{value}</p>
        <p className={cn('text-[11px]', subTone === 'danger' ? 'font-medium text-danger' : 'text-ink-muted')}>
          {subLabel}
        </p>
      </div>
    </article>
  );
}
