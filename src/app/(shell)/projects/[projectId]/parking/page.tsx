'use client';

import { useState } from 'react';
import { ErrorState } from '@/components/common/ErrorState';
import { PageHeader } from '@/components/common/PageHeader';
import { SectionCard } from '@/components/common/SectionCard';
import { SegmentedTabs } from '@/components/common/SegmentedTabs';
import { SkeletonBlock } from '@/components/common/SkeletonCard';
import { DonutCard, toDonutData } from '@/components/dashboard/DonutCard';
import { ParkingTable, type ParkingMetric } from '@/components/dashboard/ParkingTable';
import { useParkingInventory } from '@/hooks/useParkingInventory';
import { useProjects } from '@/hooks/useProjects';
import { errorMessage } from '@/lib/api/client';
import { PARKING_COLORS, PARKING_LEGEND_ORDER } from '@/lib/constants';
import { formatIndianNumber, sum } from '@/lib/format';
import { useUiStore } from '@/store/uiStore';

const OPTIONS: Array<{ value: ParkingMetric; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'sold', label: 'Sold' },
  { value: 'unsold', label: 'Unsold' },
];

export default function ParkingPage({ params }: { params: { projectId: string } }) {
  const asOn = useUiStore((state) => state.asOnDate);
  const query = useParkingInventory(params.projectId, asOn);
  const projects = useProjects();
  const [metric, setMetric] = useState<ParkingMetric>('all');
  const name = projects.data?.find((project) => project.id === params.projectId)?.name ?? 'Project';

  if (query.isPending) return <SkeletonBlock className="h-96 w-full" />;
  if (query.isError || !query.data) {
    return <ErrorState message={errorMessage(query.error)} onRetry={() => void query.refetch()} />;
  }

  const rows = query.data;
  const total = sum(rows.map((row) => row.total));
  const data = toDonutData(
    PARKING_LEGEND_ORDER.map((parkingType) => ({
      name: parkingType,
      value: rows.find((row) => row.parkingType === parkingType)?.total ?? 0,
      color: PARKING_COLORS[parkingType],
    })),
  );

  return (
    <div className="space-y-4">
      <PageHeader
        title="Parking"
        crumbs={[
          { label: 'Projects', href: '/projects' },
          { label: name, href: `/projects/${params.projectId}` },
          { label: 'Parking' },
        ]}
      />
      <DonutCard
        title={`Parking by Type (Total ${formatIndianNumber(total)})`}
        centerLabel={formatIndianNumber(total)}
        centerSub="Parking"
        data={data}
      />
      <SectionCard>
        <SegmentedTabs value={metric} onChange={setMetric} options={OPTIONS} label="Parking inventory view" />
        <div className="mt-4">
          <ParkingTable rows={rows} metric={metric} framed={false} compact />
        </div>
      </SectionCard>
    </div>
  );
}
