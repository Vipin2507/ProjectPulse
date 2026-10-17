'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { SectionCard } from '@/components/common/SectionCard';
import { useIsMobile } from '@/hooks/useIsMobile';
import { formatIndianNumber, percentParts } from '@/lib/format';

export interface DonutDatum {
  name: string;
  value: number;
  color: string;
  share: number;
}

export function toDonutData(
  items: Array<{ name: string; value: number; color: string }>,
): DonutDatum[] {
  const shares = percentParts(items.map((item) => item.value));
  return items.map((item, index) => ({ ...item, share: shares[index] ?? 0 }));
}

function DonutTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload?: DonutDatum }>;
}) {
  const item = payload?.[0]?.payload;
  if (!active || !item) return null;
  return (
    <div className="rounded-lg border border-line bg-white px-3 py-2 text-xs shadow-card">
      <p className="font-medium">{item.name}</p>
      <p className="tabular-nums text-ink-secondary">
        {formatIndianNumber(item.value)} ({item.share}%)
      </p>
    </div>
  );
}

export function DonutCard({
  title,
  centerLabel,
  centerSub,
  data,
}: {
  title: string;
  centerLabel: string;
  centerSub: string;
  data: DonutDatum[];
}) {
  const isMobile = useIsMobile();
  const size = isMobile ? 168 : 188;
  const summary = data.map((item) => `${item.name} ${formatIndianNumber(item.value)} (${item.share}%)`).join(', ');

  return (
    <SectionCard title={title}>
      <figure>
        <div className="flex flex-col items-center gap-4 xl:flex-row xl:items-center">
          <div
            className="relative shrink-0"
            style={{ width: size, height: size }}
            role="img"
            aria-label={`${title}. ${summary}`}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="65%"
                  outerRadius="100%"
                  paddingAngle={1}
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                >
                  {data.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
                <Tooltip content={<DonutTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span
                className={`font-semibold tabular-nums leading-tight ${centerLabel.length > 5 ? 'text-sm' : 'text-xl'}`}
              >
                {centerLabel}
              </span>
              <span className="text-[11px] text-ink-muted">{centerSub}</span>
            </div>
          </div>
          <ul className="grid w-full flex-1 gap-2">
            {data.map((item) => (
              <li key={item.name} className="flex items-center gap-2 text-sm">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                  aria-hidden
                />
                <span className="min-w-0 flex-1 text-ink-secondary">{item.name}</span>
                <span className="font-semibold tabular-nums">{formatIndianNumber(item.value)}</span>
                <span className="w-12 text-right tabular-nums text-ink-muted">({item.share}%)</span>
              </li>
            ))}
          </ul>
        </div>
        <table className="sr-only">
          <caption>{title}</caption>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Count</th>
              <th scope="col">Percent</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.name}>
                <th scope="row">{item.name}</th>
                <td>{formatIndianNumber(item.value)}</td>
                <td>{item.share}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </figure>
    </SectionCard>
  );
}
