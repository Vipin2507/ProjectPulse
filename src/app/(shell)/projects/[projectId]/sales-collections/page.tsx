'use client';

import { useState } from 'react';
import { ErrorState } from '@/components/common/ErrorState';
import { PageHeader } from '@/components/common/PageHeader';
import { SectionCard } from '@/components/common/SectionCard';
import { SegmentedTabs } from '@/components/common/SegmentedTabs';
import { SkeletonBlock, SkeletonCard } from '@/components/common/SkeletonCard';
import { KpiGrid } from '@/components/dashboard/KpiGrid';
import { CollectionTrendChart } from '@/components/sales/CollectionTrendChart';
import { InstallmentWiseTable } from '@/components/sales/InstallmentWiseTable';
import { useProjectOverview } from '@/hooks/useProjectOverview';
import { useProjects } from '@/hooks/useProjects';
import { useSalesCollections } from '@/hooks/useSalesCollections';
import { errorMessage } from '@/lib/api/client';
import { useUiStore } from '@/store/uiStore';

type SalesTab = 'trend' | 'installments';

export default function SalesCollectionsPage({ params }: { params: { projectId: string } }) {
  const asOn = useUiStore((state) => state.asOnDate);
  const overview = useProjectOverview(params.projectId, asOn);
  const sales = useSalesCollections(params.projectId, asOn);
  const projects = useProjects();
  const [tab, setTab] = useState<SalesTab>('trend');
  const name = projects.data?.find((project) => project.id === params.projectId)?.name ?? 'Project';
  const active = tab === 'trend' ? sales.trend : sales.installments;

  if (overview.isPending || sales.trend.isPending || sales.installments.isPending) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <SkeletonBlock className="h-80" />
      </div>
    );
  }

  if (overview.isError || !overview.data || active.isError) {
    return (
      <ErrorState
        message={errorMessage(overview.error ?? active.error)}
        onRetry={() => {
          void overview.refetch();
          void sales.trend.refetch();
          void sales.installments.refetch();
        }}
      />
    );
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title="Sales & Collections"
        crumbs={[
          { label: 'Projects', href: '/projects' },
          { label: name, href: `/projects/${params.projectId}` },
          { label: 'Sales & Collections' },
        ]}
      />
      <KpiGrid financials={overview.data.financials} variant="compact" />
      <SectionCard>
        <SegmentedTabs
          value={tab}
          onChange={setTab}
          label="Sales view"
          options={[
            { value: 'trend', label: 'Collection Trend' },
            { value: 'installments', label: 'Installment Wise' },
          ]}
        />
        <div className="mt-4">
          {tab === 'trend' && sales.trend.data ? <CollectionTrendChart points={sales.trend.data} /> : null}
          {tab === 'installments' && sales.installments.data ? (
            <InstallmentWiseTable rows={sales.installments.data} />
          ) : null}
        </div>
      </SectionCard>
    </div>
  );
}
