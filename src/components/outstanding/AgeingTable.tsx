import { DataTable } from '@/components/common/DataTable';
import { formatInr, percent, sum } from '@/lib/format';
import type { AgeingBucket } from '@/types/project';

export function AgeingTable({ rows }: { rows: AgeingBucket[] }) {
  const total = sum(rows.map((row) => row.amount));
  return (
    <DataTable
      caption="Overdue ageing"
      columns={[
        { id: 'bucket', header: 'Bucket', cell: (row) => row.bucket },
        {
          id: 'amount',
          header: 'Amount',
          align: 'right',
          cell: (row) => formatInr(row.amount),
        },
        {
          id: 'customers',
          header: 'Customers',
          align: 'right',
          cell: (row) => row.customers.toLocaleString('en-IN'),
        },
        {
          id: 'share',
          header: 'Share',
          cell: (row) => (
            <span className="tabular-nums text-ink-secondary">{percent(row.amount, total)}%</span>
          ),
        },
      ]}
      rows={rows}
      rowKey={(row) => row.bucket}
      footer={['Total', formatInr(total), sum(rows.map((row) => row.customers)).toLocaleString('en-IN'), '100%']}
    />
  );
}
