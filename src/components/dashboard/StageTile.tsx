import {
  BadgeCheck,
  BrickWall,
  Building2,
  HardHat,
  KeyRound,
  Mountain,
  Paintbrush,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { stageTone, type StageTone } from '@/lib/constants';
import type { ConstructionStage } from '@/types/project';

const ICONS: Record<ConstructionStage['key'], LucideIcon> = {
  land_approvals: BadgeCheck,
  foundation: Mountain,
  structure: Building2,
  brickwork: BrickWall,
  plastering: HardHat,
  finishing: Paintbrush,
  possession: KeyRound,
};

const TONE: Record<StageTone, { icon: string; text: string; bar: string }> = {
  green: { icon: 'bg-success-soft text-success', text: 'text-success', bar: 'bg-success' },
  blue: { icon: 'bg-brand-soft text-brand', text: 'text-brand', bar: 'bg-brand' },
  orange: { icon: 'bg-warning-soft text-warning', text: 'text-warning', bar: 'bg-warning' },
  grey: { icon: 'bg-track text-ink-muted', text: 'text-ink-muted', bar: 'bg-slate-300' },
};

export function StageTile({
  stage,
  layout = 'tile',
}: {
  stage: ConstructionStage;
  layout?: 'tile' | 'row';
}) {
  const tone = stageTone(stage.percent);
  const styles = TONE[tone];
  const Icon = ICONS[stage.key];

  if (layout === 'row') {
    return (
      <div className="flex items-center gap-3 py-2">
        <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-full', styles.icon)}>
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center justify-between gap-2 text-sm">
            <span className="font-medium">{stage.label}</span>
            <span className={cn('font-semibold tabular-nums', styles.text)}>{stage.percent}%</span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={stage.percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${stage.label} ${stage.percent}%`}
            className="h-1.5 overflow-hidden rounded-full bg-track"
          >
            <div className={cn('h-full rounded-full', styles.bar)} style={{ width: `${stage.percent}%` }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-w-[104px] flex-1 flex-col items-center rounded-xl border border-line bg-white px-2 py-3 text-center">
      <span className={cn('mb-2 flex h-9 w-9 items-center justify-center rounded-full', styles.icon)}>
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <p className="text-[11px] font-medium leading-tight text-ink-secondary">{stage.label}</p>
      <p className={cn('mt-1 text-sm font-semibold tabular-nums', styles.text)}>{stage.percent}%</p>
    </div>
  );
}
