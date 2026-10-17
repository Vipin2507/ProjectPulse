import { DataTable } from '@/components/common/DataTable';
import { formatInr } from '@/lib/format';
import type { InstallmentRow } from '@/types/project';

export function InstallmentWiseTable({ rows }: { rows: InstallmentRow[] }) {
  return (
    <DataTable
      caption="Installment wise collections"
      columns={[
        { id: 'name', header: 'Installment', cell: (row) => row.installment },
        { id: 'demanded', header: 'Demanded', align: 'right', cell: (row) => formatInr(row.demanded) },
        { id: 'received', header: 'Received', align: 'right', cell: (row) => formatInr(row.received) },
        { id: 'pending', header: 'Pending', align: 'right', cell: (row) => formatInr(row.pending) },
      ]}
      rows={rows}
      rowKey={(row) => row.installment}
    />
  );
}
