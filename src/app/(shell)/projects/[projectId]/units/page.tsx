'use client';

import { useState } from 'react';
import { ErrorState } from '@/components/common/ErrorState';
import { PageHeader } from '@/components/common/PageHeader';
import { SectionCard } from '@/components/common/SectionCard';
import { SegmentedTabs } from '@/components/common/SegmentedTabs';
import { SkeletonBlock } from '@/components/common/SkeletonCard';
import { DonutCard, toDonutData } from '@/components/dashboard/DonutCard';
import { InventoryTable, type UnitMetric } from '@/components/dashboard/InventoryTable';
import { useProjects } from '@/hooks/useProjects';
import { useUnitInventory } from '@/hooks/useUnitInventory';
import { errorMessage } from '@/lib/api/client';
import { UNIT_LEGEND_ORDER, UNIT_TYPE_COLORS } from '@/lib/constants';
import { formatIndianNumber, sum } from '@/lib/format';
import { useUiStore } from '@/store/uiStore';

const OPTIONS: Array<{ value: UnitMetric; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'sold', label: 'Sold' },
  { value: 'unsold', label: 'Unsold' },
  { value: 'hold', label: 'On Hold' },
];

export default function UnitsPage({ params }: { params: { projectId: string } }) {
  const asOn = useUiStore((state) => state.asOnDate);
  const query = useUnitInventory(params.projectId, asOn);
  const projects = useProjects();
  const [metric, setMetric] = useState<UnitMetric>('all');
  const name = projects.data?.find((project) => project.id === params.projectId)?.name ?? 'Project';

  if (query.isPending) return <SkeletonBlock className="h-96 w-full" />;
  if (query.isError || !query.data) {
    return <ErrorState message={errorMessage(query.error)} onRetry={() => void query.refetch()} />;
  }

  const rows = query.data;
  const total = sum(rows.map((row) => row.total));
  const data = toDonutData(
    UNIT_LEGEND_ORDER.map((unitType) => ({
      name: unitType,
      value: rows.find((row) => row.unitType === unitType)?.total ?? 0,
      color: UNIT_TYPE_COLORS[unitType],
    })),
  );

  return (
    <div className="space-y-4">
      <PageHeader
        title="Units"
        crumbs={[
          { label: 'Projects', href: '/projects' },
          { label: name, href: `/projects/${params.projectId}` },
          { label: 'Units' },
        ]}
      />
      <DonutCard
        title={`Units by Type (Total ${formatIndianNumber(total)})`}
        centerLabel={formatIndianNumber(total)}
        centerSub="Units"
        data={data}
      />
      <SectionCard>
        <SegmentedTabs value={metric} onChange={setMetric} options={OPTIONS} label="Unit inventory view" />
        <div className="mt-4">
          <InventoryTable rows={rows} metric={metric} framed={false} compact />
        </div>
      </SectionCard>
    </div>
  );
}
