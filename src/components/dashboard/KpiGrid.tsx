import { AlertTriangle, Building2, CalendarDays, FileText, Wallet } from 'lucide-react';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { formatCrore, percent } from '@/lib/format';
import type { FinancialSummary } from '@/types/project';

export function KpiGrid({
  financials,
  variant = 'full',
}: {
  financials: FinancialSummary;
  variant?: 'full' | 'compact';
}) {
  const sales = financials.totalSalesValue;
  const receivedPct = percent(financials.totalReceived, sales);
  const outstandingPct = percent(financials.outstanding, sales);
  const overduePct = percent(financials.overdue, sales);
  const duePct = percent(financials.notYetDue, sales);

  const cards = [
    <KpiCard
      key="sales"
      icon={Building2}
      tone="sales"
      label="Total Sales Value"
      value={formatCrore(financials.totalSalesValue)}
      subLabel="Agreement Value"
    />,
    <KpiCard
      key="received"
      icon={Wallet}
      tone="received"
      label="Total Received"
      value={formatCrore(financials.totalReceived)}
      subLabel={`${receivedPct}% of Sales`}
    />,
    <KpiCard
      key="outstanding"
      icon={FileText}
      tone="outstanding"
      label="Outstanding"
      value={formatCrore(financials.outstanding)}
      subLabel={`${outstandingPct}% of Sales`}
    />,
    <KpiCard
      key="overdue"
      icon={AlertTriangle}
      tone="overdue"
      label="Overdue Amount"
      value={formatCrore(financials.overdue)}
      subLabel={`${overduePct}% of Sales`}
      subTone="danger"
    />,
  ];

  if (variant === 'full') {
    cards.push(
      <KpiCard
        key="due"
        icon={CalendarDays}
        tone="due"
        label="Not Yet Due"
        value={formatCrore(financials.notYetDue)}
        subLabel={`${duePct}% of Sales`}
      />,
    );
  }

  return (
    <div className={variant === 'full' ? 'grid gap-3 sm:grid-cols-2 xl:grid-cols-5' : 'grid grid-cols-2 gap-3'}>
      {cards}
    </div>
  );
}
