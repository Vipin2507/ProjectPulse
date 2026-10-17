'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ErrorState } from '@/components/common/ErrorState';
import { PageHeader } from '@/components/common/PageHeader';
import { SectionCard } from '@/components/common/SectionCard';
import { SegmentedTabs } from '@/components/common/SegmentedTabs';
import { SkeletonBlock, SkeletonCard } from '@/components/common/SkeletonCard';
import { AgeingTable } from '@/components/outstanding/AgeingTable';
import { OutstandingSummary } from '@/components/outstanding/OutstandingSummary';
import { TopCustomersTable } from '@/components/outstanding/TopCustomersTable';
import { UnitWiseTable } from '@/components/outstanding/UnitWiseTable';
import { useOutstanding } from '@/hooks/useOutstanding';
import { useProjectOverview } from '@/hooks/useProjectOverview';
import { useProjects } from '@/hooks/useProjects';
import { errorMessage } from '@/lib/api/client';
import { useUiStore } from '@/store/uiStore';

type OutstandingTab = 'customers' | 'units' | 'ageing';

export default function OutstandingPage({ params }: { params: { projectId: string } }) {
  const asOn = useUiStore((state) => state.asOnDate);
  const [tab, setTab] = useState<OutstandingTab>('customers');
  const [limit, setLimit] = useState(5);
  const overview = useProjectOverview(params.projectId, asOn);
  const outstanding = useOutstanding(params.projectId, asOn, limit);
  const projects = useProjects();
  const name = projects.data?.find((project) => project.id === params.projectId)?.name ?? 'Project';
  const active =
    tab === 'customers'
      ? outstanding.customers
      : tab === 'units'
        ? outstanding.units
        : outstanding.ageing;

  if (overview.isPending || outstanding.customers.isPending) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
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
          void outstanding.customers.refetch();
          void outstanding.units.refetch();
          void outstanding.ageing.refetch();
        }}
      />
    );
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title="Outstanding Details"
        crumbs={[
          { label: 'Projects', href: '/projects' },
          { label: name, href: `/projects/${params.projectId}` },
          { label: 'Outstanding' },
        ]}
      />
      <OutstandingSummary financials={overview.data.financials} />
      <SectionCard>
        <SegmentedTabs
          value={tab}
          onChange={setTab}
          label="Outstanding view"
          options={[
            { value: 'customers', label: 'Top Customers' },
            { value: 'units', label: 'Unit Wise' },
            { value: 'ageing', label: 'Ageing' },
          ]}
        />
        <div className="mt-4">
          {tab === 'customers' && outstanding.customers.data ? (
            <TopCustomersTable rows={outstanding.customers.data} />
          ) : null}
          {tab === 'units' && outstanding.units.data ? (
            <UnitWiseTable rows={outstanding.units.data} />
          ) : null}
          {tab === 'ageing' && outstanding.ageing.data ? (
            <AgeingTable rows={outstanding.ageing.data} />
          ) : null}
        </div>
        {tab === 'customers' ? (
          <div className="mt-3 flex justify-end">
            {limit < 15 ? (
              <button
                type="button"
                className="text-sm font-medium text-brand"
                onClick={() => setLimit(15)}
              >
                View All →
              </button>
            ) : (
              <Link href={`/projects/${params.projectId}`} className="text-sm font-medium text-brand">
                Back to overview →
              </Link>
            )}
          </div>
        ) : null}
      </SectionCard>
    </div>
  );
}
