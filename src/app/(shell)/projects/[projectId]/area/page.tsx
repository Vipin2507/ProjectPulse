'use client';

import { useState } from 'react';
import { ErrorState } from '@/components/common/ErrorState';
import { PageHeader } from '@/components/common/PageHeader';
import { SectionCard } from '@/components/common/SectionCard';
import { SegmentedTabs } from '@/components/common/SegmentedTabs';
import { SkeletonBlock } from '@/components/common/SkeletonCard';
import { AreaTable, type AreaMetric } from '@/components/dashboard/AreaTable';
import { DonutCard, toDonutData } from '@/components/dashboard/DonutCard';
import { useAreaStatement } from '@/hooks/useAreaStatement';
import { useProjects } from '@/hooks/useProjects';
import { errorMessage } from '@/lib/api/client';
import { UNIT_LEGEND_ORDER, UNIT_TYPE_COLORS } from '@/lib/constants';
import { formatIndianNumber, sum } from '@/lib/format';
import { useUiStore } from '@/store/uiStore';

const OPTIONS: Array<{ value: AreaMetric; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'sold', label: 'Sold Area' },
  { value: 'unsold', label: 'Unsold Area' },
];

export default function AreaPage({ params }: { params: { projectId: string } }) {
  const asOn = useUiStore((state) => state.asOnDate);
  const query = useAreaStatement(params.projectId, asOn);
  const projects = useProjects();
  const [metric, setMetric] = useState<AreaMetric>('all');
  const name = projects.data?.find((project) => project.id === params.projectId)?.name ?? 'Project';

  if (query.isPending) return <SkeletonBlock className="h-96 w-full" />;
  if (query.isError || !query.data) {
    return <ErrorState message={errorMessage(query.error)} onRetry={() => void query.refetch()} />;
  }

  const rows = query.data;
  const total = sum(rows.map((row) => row.totalArea));
  const data = toDonutData(
    UNIT_LEGEND_ORDER.map((unitType) => ({
      name: unitType,
      value: rows.find((row) => row.unitType === unitType)?.totalArea ?? 0,
      color: UNIT_TYPE_COLORS[unitType],
    })),
  );

  return (
    <div className="space-y-4">
      <PageHeader
        title="Area Statement"
        crumbs={[
          { label: 'Projects', href: '/projects' },
          { label: name, href: `/projects/${params.projectId}` },
          { label: 'Area Statement' },
        ]}
      />
      <DonutCard
        title={`Area by Unit Type (Total ${formatIndianNumber(total)} Sq. Ft.)`}
        centerLabel={formatIndianNumber(total)}
        centerSub="Sq. Ft."
        data={data}
      />
      <SectionCard>
        <SegmentedTabs value={metric} onChange={setMetric} options={OPTIONS} label="Area statement view" />
        <div className="mt-4">
          <AreaTable rows={rows} metric={metric} framed={false} compact />
        </div>
      </SectionCard>
    </div>
  );
}
