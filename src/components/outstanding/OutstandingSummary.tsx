import { AlertTriangle, CalendarDays } from 'lucide-react';
import { formatCrore, percent } from '@/lib/format';
import type { FinancialSummary } from '@/types/project';

export function OutstandingSummary({ financials }: { financials: FinancialSummary }) {
  const overduePct = percent(financials.overdue, financials.totalSalesValue);
  const duePct = percent(financials.notYetDue, financials.totalSalesValue);
  return (
    <div className="grid grid-cols-2 gap-3">
      <article className="rounded-xl bg-kpi-overdue p-4 shadow-card">
        <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-danger">
          <AlertTriangle className="h-4 w-4" aria-hidden />
        </div>
        <p className="text-[11px] font-medium text-ink-muted">Overdue Amount</p>
        <p className="text-lg font-semibold tabular-nums">{formatCrore(financials.overdue)}</p>
        <p className="text-[11px] font-medium text-danger">{overduePct}% of Sales</p>
      </article>
      <article className="rounded-xl bg-kpi-due p-4 shadow-card">
        <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand">
          <CalendarDays className="h-4 w-4" aria-hidden />
        </div>
        <p className="text-[11px] font-medium text-ink-muted">Not Yet Due</p>
        <p className="text-lg font-semibold tabular-nums">{formatCrore(financials.notYetDue)}</p>
        <p className="text-[11px] text-ink-muted">{duePct}% of Sales</p>
      </article>
    </div>
  );
}
