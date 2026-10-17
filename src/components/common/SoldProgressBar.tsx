import { cn } from '@/lib/utils';

const FILLS = {
  green: 'bg-success',
  blue: 'bg-brand',
  orange: 'bg-warning',
} as const;

export function SoldProgressBar({
  value,
  tone,
}: {
  value: number;
  tone: 'green' | 'blue' | 'orange';
}) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="flex items-center gap-2">
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${clamped}% sold`}
        className="h-1.5 w-16 overflow-hidden rounded-full bg-track"
      >
        <div className={cn('h-full rounded-full', FILLS[tone])} style={{ width: `${clamped}%` }} />
      </div>
      <span className="w-9 text-right text-[11px] tabular-nums text-ink-secondary">{clamped}%</span>
    </div>
  );
}
