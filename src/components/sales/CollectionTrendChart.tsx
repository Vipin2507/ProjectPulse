'use client';

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { CHART } from '@/lib/constants';
import { CRORE, formatCrore } from '@/lib/format';
import type { CollectionTrendPoint } from '@/types/project';

interface ChartRow {
  month: string;
  sales: number;
  received: number;
}

function TrendTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ dataKey?: string; value?: number; color?: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-line bg-white px-3 py-2 text-xs shadow-card">
      <p className="mb-1 font-medium">{label}</p>
      {payload.map((item) => (
        <p key={String(item.dataKey)} className="tabular-nums" style={{ color: item.color }}>
          {item.dataKey === 'sales' ? 'Sales Value' : 'Received'}: {formatCrore((item.value ?? 0) * CRORE)}
        </p>
      ))}
    </div>
  );
}

export function CollectionTrendChart({ points }: { points: CollectionTrendPoint[] }) {
  const data: ChartRow[] = points.map((point) => ({
    month: point.month,
    sales: point.salesValueCumulative / CRORE,
    received: point.receivedCumulative / CRORE,
  }));
  const summary = data
    .map((row) => `${row.month} sales ${row.sales.toFixed(2)} Cr, received ${row.received.toFixed(2)} Cr`)
    .join('; ');

  return (
    <figure>
      <div className="h-72 w-full" role="img" aria-label={`Collection trend. Amount in crore. ${summary}`}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={CHART.grid} vertical={false} />
            <XAxis dataKey="month" tick={{ fill: CHART.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis
              domain={[0, 120]}
              ticks={[0, 20, 40, 60, 80, 100]}
              tick={{ fill: CHART.muted, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={36}
              label={{
                value: 'Amount (₹ Cr)',
                angle: -90,
                position: 'insideLeft',
                offset: 10,
                style: { fill: CHART.muted, fontSize: 11 },
              }}
            />
            <Tooltip content={<TrendTooltip />} />
            <Legend
              verticalAlign="bottom"
              wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
              formatter={(value) =>
                value === 'sales' ? 'Sales Value (Cumulative)' : 'Received (Cumulative)'
              }
            />
            <Bar dataKey="sales" name="sales" fill={CHART.brand} radius={[4, 4, 0, 0]} barSize={22} />
            <Line
              dataKey="received"
              name="received"
              stroke={CHART.success}
              strokeWidth={2}
              dot={{ r: 3, fill: CHART.success }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <table className="sr-only">
        <caption>Collection trend in crore</caption>
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">Sales Value (Cumulative)</th>
            <th scope="col">Received (Cumulative)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.month}>
              <th scope="row">{row.month}</th>
              <td>{row.sales.toFixed(2)} Cr</td>
              <td>{row.received.toFixed(2)} Cr</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
