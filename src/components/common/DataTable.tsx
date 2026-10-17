import type { ReactNode } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

export interface DataColumn<T> {
  id: string;
  header: string;
  align?: 'left' | 'right';
  className?: string;
  cell: (row: T) => ReactNode;
}

export function DataTable<T>({
  caption,
  columns,
  rows,
  rowKey,
  footer,
  onRowClick,
  rowLabel,
}: {
  caption: string;
  columns: Array<DataColumn<T>>;
  rows: T[];
  rowKey: (row: T) => string;
  footer?: ReactNode[];
  onRowClick?: (row: T) => void;
  rowLabel?: (row: T) => string;
}) {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[460px] text-[12.5px] lg:min-w-full">
        <TableCaption>{caption}</TableCaption>
        <TableHeader>
          <TableRow className="border-t-0">
            {columns.map((column) => (
              <TableHead
                key={column.id}
                scope="col"
                className={cn(column.align === 'right' && 'text-right', column.className)}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={rowKey(row)}
              className={onRowClick ? 'cursor-pointer hover:bg-page' : undefined}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {columns.map((column, index) =>
                index === 0 ? (
                  <th
                    key={column.id}
                    scope="row"
                    className={cn('px-2 py-2.5 text-left text-[12.5px] font-medium', column.className)}
                  >
                    {onRowClick ? (
                      <button
                        type="button"
                        className="text-left font-medium"
                        aria-label={rowLabel ? rowLabel(row) : undefined}
                        onClick={(event) => {
                          event.stopPropagation();
                          onRowClick(row);
                        }}
                      >
                        {column.cell(row)}
                      </button>
                    ) : (
                      column.cell(row)
                    )}
                  </th>
                ) : (
                  <TableCell
                    key={column.id}
                    className={cn(
                      'tabular-nums',
                      column.align === 'right' && 'text-right',
                      column.className,
                    )}
                  >
                    {column.cell(row)}
                  </TableCell>
                ),
              )}
            </TableRow>
          ))}
        </TableBody>
        {footer ? (
          <TableFooter>
            <TableRow className="border-t-0">
              {footer.map((cell, index) =>
                index === 0 ? (
                  <th
                    key={columns[index]?.id ?? index}
                    scope="row"
                    className="rounded-l-lg px-2 py-2.5 text-left text-[12.5px] font-semibold"
                  >
                    {cell}
                  </th>
                ) : (
                  <TableCell
                    key={columns[index]?.id ?? index}
                    className={cn(
                      'font-semibold tabular-nums',
                      index === footer.length - 1 && 'rounded-r-lg',
                      columns[index]?.align === 'right' && 'text-right',
                    )}
                  >
                    {cell}
                  </TableCell>
                ),
              )}
            </TableRow>
          </TableFooter>
        ) : null}
      </Table>
    </div>
  );
}
