import { DataTable } from '@/components/common/DataTable';
import { formatInr } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { OutstandingCustomerRow } from '@/types/project';

export function TopCustomersTable({ rows }: { rows: OutstandingCustomerRow[] }) {
  return (
    <DataTable
      caption="Top customers by outstanding"
      columns={[
        { id: 'name', header: 'Customer', cell: (row) => row.customerName },
        { id: 'unit', header: 'Unit No.', cell: (row) => row.unitNo },
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
      rowKey={(row) => row.customerId}
    />
  );
}
