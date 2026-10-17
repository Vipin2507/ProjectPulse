'use client';

import { useState, type ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { DataTable, type DataColumn } from '@/components/common/DataTable';
import { SectionCard } from '@/components/common/SectionCard';
import { SoldProgressBar } from '@/components/common/SoldProgressBar';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { formatIndianNumber, percent, sum } from '@/lib/format';
import type { AreaStatementRow } from '@/types/project';

export type AreaMetric = 'all' | 'sold' | 'unsold';

export function AreaTable({
  rows,
  metric = 'all',
  framed = true,
  compact = false,
}: {
  rows: AreaStatementRow[];
  metric?: AreaMetric;
  framed?: boolean;
  compact?: boolean;
}) {
  const [selected, setSelected] = useState<AreaStatementRow | null>(null);
  const totals = {
    total: sum(rows.map((row) => row.totalArea)),
    sold: sum(rows.map((row) => row.soldArea)),
    unsold: sum(rows.map((row) => row.unsoldArea)),
  };

  const columns: Array<DataColumn<AreaStatementRow>> = [
    { id: 'type', header: 'Unit Type', cell: (row) => row.unitType },
  ];
  if (metric === 'all') {
    columns.push(
      {
        id: 'total',
        header: 'Total Area (Sq. Ft.)',
        align: 'right',
        cell: (row) => formatIndianNumber(row.totalArea),
      },
      { id: 'sold', header: 'Sold Area', align: 'right', cell: (row) => formatIndianNumber(row.soldArea) },
      {
        id: 'unsold',
        header: 'Unsold Area',
        align: 'right',
        cell: (row) => formatIndianNumber(row.unsoldArea),
      },
      {
        id: 'pct',
        header: 'Sold %',
        cell: (row) => <SoldProgressBar value={percent(row.soldArea, row.totalArea)} tone="green" />,
      },
    );
  } else if (metric === 'sold') {
    columns.push({
      id: 'sold',
      header: 'Sold Area',
      align: 'right',
      cell: (row) => formatIndianNumber(row.soldArea),
    });
  } else {
    columns.push({
      id: 'unsold',
      header: 'Unsold Area',
      align: 'right',
      cell: (row) => formatIndianNumber(row.unsoldArea),
    });
  }
  if (compact) {
    columns.push({
      id: 'chevron',
      header: '',
      className: 'lg:hidden',
      cell: () => <ChevronRight className="h-4 w-4 text-ink-muted" aria-hidden />,
    });
  }

  const footer: ReactNode[] = ['Total'];
  if (metric === 'all') {
    footer.push(
      formatIndianNumber(totals.total),
      formatIndianNumber(totals.sold),
      formatIndianNumber(totals.unsold),
      <SoldProgressBar key="pct" value={percent(totals.sold, totals.total)} tone="blue" />,
    );
  } else if (metric === 'sold') {
    footer.push(formatIndianNumber(totals.sold));
  } else {
    footer.push(formatIndianNumber(totals.unsold));
  }
  if (compact) footer.push('');

  const table = (
    <DataTable
      caption="Area statement by unit type"
      columns={columns}
      rows={rows}
      rowKey={(row) => row.unitType}
      footer={footer}
      onRowClick={compact ? setSelected : undefined}
      rowLabel={(row) => `View ${row.unitType} area`}
    />
  );

  return (
    <>
      {framed ? <SectionCard title="Area Statement (Unit Type Wise)">{table}</SectionCard> : table}
      <Sheet open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent>
          {selected ? (
            <>
              <SheetHeader>
                <SheetTitle>{selected.unitType} area</SheetTitle>
              </SheetHeader>
              <dl className="space-y-3 px-5 py-4 text-sm">
                <Detail label="Total area" value={`${formatIndianNumber(selected.totalArea)} Sq. Ft.`} />
                <Detail label="Sold area" value={formatIndianNumber(selected.soldArea)} />
                <Detail label="Unsold area" value={formatIndianNumber(selected.unsoldArea)} />
                <Detail label="Sold %" value={`${percent(selected.soldArea, selected.totalArea)}%`} />
              </dl>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-ink-muted">{label}</dt>
      <dd className="font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
