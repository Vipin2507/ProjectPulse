'use client';

import { useState, type ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { DataTable, type DataColumn } from '@/components/common/DataTable';
import { SectionCard } from '@/components/common/SectionCard';
import { SoldProgressBar } from '@/components/common/SoldProgressBar';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { formatIndianNumber, percent, sum } from '@/lib/format';
import type { ParkingInventoryRow } from '@/types/project';

export type ParkingMetric = 'all' | 'sold' | 'unsold';

export function ParkingTable({
  rows,
  metric = 'all',
  framed = true,
  compact = false,
}: {
  rows: ParkingInventoryRow[];
  metric?: ParkingMetric;
  framed?: boolean;
  compact?: boolean;
}) {
  const [selected, setSelected] = useState<ParkingInventoryRow | null>(null);
  const totals = {
    total: sum(rows.map((row) => row.total)),
    sold: sum(rows.map((row) => row.sold)),
    unsold: sum(rows.map((row) => row.unsold)),
  };

  const columns: Array<DataColumn<ParkingInventoryRow>> = [
    { id: 'type', header: 'Parking Type', cell: (row) => row.parkingType },
  ];
  if (metric === 'all') {
    columns.push(
      { id: 'total', header: 'Total', align: 'right', cell: (row) => formatIndianNumber(row.total) },
      { id: 'sold', header: 'Sold', align: 'right', cell: (row) => formatIndianNumber(row.sold) },
      { id: 'unsold', header: 'Unsold', align: 'right', cell: (row) => formatIndianNumber(row.unsold) },
      {
        id: 'pct',
        header: 'Sold %',
        cell: (row) => <SoldProgressBar value={percent(row.sold, row.total)} tone="green" />,
      },
    );
  } else if (metric === 'sold') {
    columns.push({
      id: 'sold',
      header: 'Sold',
      align: 'right',
      cell: (row) => formatIndianNumber(row.sold),
    });
  } else {
    columns.push({
      id: 'unsold',
      header: 'Unsold',
      align: 'right',
      cell: (row) => formatIndianNumber(row.unsold),
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
      caption="Parking type wise inventory"
      columns={columns}
      rows={rows}
      rowKey={(row) => row.parkingType}
      footer={footer}
      onRowClick={compact ? setSelected : undefined}
      rowLabel={(row) => `View ${row.parkingType}`}
    />
  );

  return (
    <>
      {framed ? <SectionCard title="Parking Type Wise">{table}</SectionCard> : table}
      <Sheet open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent>
          {selected ? (
            <>
              <SheetHeader>
                <SheetTitle>{selected.parkingType}</SheetTitle>
              </SheetHeader>
              <dl className="space-y-3 px-5 py-4 text-sm">
                <Detail label="Total" value={formatIndianNumber(selected.total)} />
                <Detail label="Sold" value={formatIndianNumber(selected.sold)} />
                <Detail label="Unsold" value={formatIndianNumber(selected.unsold)} />
                <Detail label="Sold %" value={`${percent(selected.sold, selected.total)}%`} />
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
    <div className="flex items-center justify-between">
      <dt className="text-ink-muted">{label}</dt>
      <dd className="font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
