'use client';

import { useState, type ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { DataTable, type DataColumn } from '@/components/common/DataTable';
import { SoldProgressBar } from '@/components/common/SoldProgressBar';
import { SectionCard } from '@/components/common/SectionCard';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { formatIndianNumber, percent, sum } from '@/lib/format';
import type { UnitInventoryRow } from '@/types/project';

export type UnitMetric = 'all' | 'sold' | 'unsold' | 'hold';

function progressCell(part: number, total: number, tone: 'green' | 'blue') {
  return <SoldProgressBar value={percent(part, total)} tone={tone} />;
}

export function InventoryTable({
  rows,
  metric = 'all',
  framed = true,
  compact = false,
}: {
  rows: UnitInventoryRow[];
  metric?: UnitMetric;
  framed?: boolean;
  compact?: boolean;
}) {
  const [selected, setSelected] = useState<UnitInventoryRow | null>(null);
  const totals = {
    total: sum(rows.map((row) => row.total)),
    sold: sum(rows.map((row) => row.sold)),
    unsold: sum(rows.map((row) => row.unsold)),
    hold: sum(rows.map((row) => row.hold)),
  };

  const chevron: DataColumn<UnitInventoryRow> = {
    id: 'chevron',
    header: '',
    className: 'lg:hidden',
    cell: () => <ChevronRight className="h-4 w-4 text-ink-muted" aria-hidden />,
  };

  const typeCol: DataColumn<UnitInventoryRow> = {
    id: 'type',
    header: 'Unit Type',
    cell: (row) => row.unitType,
  };

  const columns: Array<DataColumn<UnitInventoryRow>> = [typeCol];
  if (metric === 'all' || metric === 'sold') {
    columns.push({
      id: 'total',
      header: metric === 'all' ? 'Total Units' : 'Sold',
      align: 'right',
      cell: (row) => formatIndianNumber(metric === 'all' ? row.total : row.sold),
    });
  }
  if (metric === 'all') {
    columns.push(
      { id: 'sold', header: 'Sold', align: 'right', cell: (row) => formatIndianNumber(row.sold) },
      { id: 'unsold', header: 'Unsold', align: 'right', cell: (row) => formatIndianNumber(row.unsold) },
      { id: 'hold', header: 'Hold', align: 'right', cell: (row) => formatIndianNumber(row.hold) },
      { id: 'pct', header: 'Sold %', cell: (row) => progressCell(row.sold, row.total, 'green') },
    );
  } else if (metric === 'unsold') {
    columns.push({
      id: 'unsold',
      header: 'Unsold',
      align: 'right',
      cell: (row) => formatIndianNumber(row.unsold),
    });
  } else if (metric === 'hold') {
    columns.push({
      id: 'hold',
      header: 'Hold',
      align: 'right',
      cell: (row) => formatIndianNumber(row.hold),
    });
  }
  if (compact) columns.push(chevron);

  const footer: ReactNode[] = ['Total'];
  if (metric === 'all') {
    footer.push(
      formatIndianNumber(totals.total),
      formatIndianNumber(totals.sold),
      formatIndianNumber(totals.unsold),
      formatIndianNumber(totals.hold),
      progressCell(totals.sold, totals.total, 'blue'),
    );
  } else if (metric === 'sold') {
    footer.push(formatIndianNumber(totals.sold));
  } else if (metric === 'unsold') {
    footer.push(formatIndianNumber(totals.unsold));
  } else {
    footer.push(formatIndianNumber(totals.hold));
  }
  if (compact) footer.push('');

  const table = (
    <DataTable
      caption="Unit type wise inventory"
      columns={columns}
      rows={rows}
      rowKey={(row) => row.unitType}
      footer={footer}
      onRowClick={compact ? setSelected : undefined}
      rowLabel={(row) => `View ${row.unitType} inventory`}
    />
  );

  return (
    <>
      {framed ? <SectionCard title="Unit Type Wise Inventory">{table}</SectionCard> : table}
      <Sheet open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent>
          {selected ? (
            <>
              <SheetHeader>
                <SheetTitle>{selected.unitType}</SheetTitle>
              </SheetHeader>
              <dl className="space-y-3 px-5 py-4 text-sm">
                <Row label="Total units" value={formatIndianNumber(selected.total)} />
                <Row label="Sold" value={formatIndianNumber(selected.sold)} />
                <Row label="Unsold" value={formatIndianNumber(selected.unsold)} />
                <Row label="Hold" value={formatIndianNumber(selected.hold)} />
                <Row label="Sold %" value={`${percent(selected.sold, selected.total)}%`} />
              </dl>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-ink-muted">{label}</dt>
      <dd className="font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
