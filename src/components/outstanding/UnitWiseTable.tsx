import { DataTable } from '@/components/common/DataTable';
import { formatInr } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { OutstandingUnitRow } from '@/types/project';

export function UnitWiseTable({ rows }: { rows: OutstandingUnitRow[] }) {
  return (
    <DataTable
      caption="Outstanding by unit"
      columns={[
        { id: 'unit', header: 'Unit No.', cell: (row) => row.unitNo },
        { id: 'type', header: 'Unit Type', cell: (row) => row.unitType },
        { id: 'tower', header: 'Tower', cell: (row) => row.tower },
        {
          id: 'outstanding',
          header: 'Outstanding',
          align: 'right',
          cell: (row) => formatInr(row.outstanding),
        },
        {
          id: 'overdue',
          header: 'Overdue',
          align: 'right',
          cell: (row) => (
            <span className={cn('tabular-nums', row.overdue > 0 ? 'text-danger' : 'text-ink-muted')}>
              {formatInr(row.overdue)}
            </span>
          ),
        },
      ]}
      rows={rows}
      rowKey={(row) => row.unitNo}
    />
  );
}
