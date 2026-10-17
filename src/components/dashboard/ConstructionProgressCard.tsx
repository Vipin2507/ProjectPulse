'use client';

import { ChevronRight } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { SectionCard } from '@/components/common/SectionCard';
import { StageTile } from '@/components/dashboard/StageTile';
import { CHART } from '@/lib/constants';
import type { ConstructionProgress } from '@/types/project';

export function ConstructionProgressCard({ progress }: { progress: ConstructionProgress }) {
  return (
    <SectionCard
      title="Construction Progress"
      action={
        <span className="text-sm font-semibold text-success tabular-nums">
          {progress.overallPercent}% Completed
        </span>
      }
    >
      <div className="mb-4 flex items-center gap-3">
        <div
          role="progressbar"
          aria-valuenow={progress.overallPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Overall construction ${progress.overallPercent}% completed`}
          className="h-2.5 flex-1 overflow-hidden rounded-full bg-track"
        >
          <div
            className="h-full rounded-full bg-success"
            style={{ width: `${progress.overallPercent}%` }}
          />
        </div>
      </div>
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {progress.stages.map((stage, index) => (
          <div key={stage.key} className="flex min-w-0 flex-1 items-center gap-1">
            <StageTile stage={stage} />
            {index < progress.stages.length - 1 ? (
              <ChevronRight className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden />
            ) : null}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export function ConstructionRing({ progress }: { progress: ConstructionProgress }) {
  const data = [
    { name: 'Completed', value: progress.overallPercent, color: CHART.success },
    { name: 'Remaining', value: Math.max(0, 100 - progress.overallPercent), color: CHART.track },
  ];
  return (
    <SectionCard>
      <figure className="flex flex-col items-center">
        <div
          className="relative h-52 w-52"
          role="img"
          aria-label={`Overall completion ${progress.overallPercent} percent`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius="68%"
                outerRadius="100%"
                startAngle={90}
                endAngle={-270}
                stroke="none"
                paddingAngle={0}
              >
                {data.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-semibold tabular-nums text-success">
              {progress.overallPercent}%
            </span>
            <span className="text-xs text-ink-muted">Overall Completion</span>
          </div>
        </div>
        <table className="sr-only">
          <caption>Overall completion</caption>
          <tbody>
            {data.map((item) => (
              <tr key={item.name}>
                <th scope="row">{item.name}</th>
                <td>{item.value}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </figure>
    </SectionCard>
  );
}
