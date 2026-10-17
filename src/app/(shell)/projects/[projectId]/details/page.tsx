'use client';

import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { ErrorState } from '@/components/common/ErrorState';
import { PageHeader } from '@/components/common/PageHeader';
import { SectionCard } from '@/components/common/SectionCard';
import { SkeletonBlock } from '@/components/common/SkeletonCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { useProjectDetails } from '@/hooks/useProjectOverview';
import { errorMessage } from '@/lib/api/client';
import { formatIndianNumber, formatMonthYear } from '@/lib/format';

export default function ProjectDetailsPage({ params }: { params: { projectId: string } }) {
  const query = useProjectDetails(params.projectId);

  if (query.isPending) return <SkeletonBlock className="h-96 w-full" />;
  if (query.isError || !query.data) {
    return <ErrorState message={errorMessage(query.error)} onRetry={() => void query.refetch()} />;
  }

  const project = query.data;
  const facts = [
    { label: 'Total Wings', value: formatIndianNumber(project.totalWings) },
    { label: 'Total Towers', value: formatIndianNumber(project.totalTowers) },
    { label: 'Total Units', value: formatIndianNumber(project.totalUnits) },
    { label: 'Total Parking', value: formatIndianNumber(project.totalParking) },
    { label: 'Project Type', value: project.projectType },
    { label: 'RERA No.', value: project.reraNumber },
    { label: 'Project Start', value: formatMonthYear(project.projectStart) },
    { label: 'Expected Completion', value: formatMonthYear(project.expectedCompletion) },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Project Details"
        crumbs={[
          { label: 'Projects', href: '/projects' },
          { label: project.name, href: `/projects/${params.projectId}` },
          { label: 'Details' },
        ]}
      />
      <SectionCard bodyClassName="p-0">
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
          <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-lg bg-track sm:h-24 sm:w-36">
            {project.imageUrl ? (
              <Image src={project.imageUrl} alt="" fill sizes="144px" className="object-cover" />
            ) : null}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold">{project.name}</h2>
              <StatusBadge status={project.status} />
            </div>
            <p className="mt-1 flex items-center gap-1 text-sm text-ink-muted">
              <MapPin className="h-4 w-4" aria-hidden />
              {project.city}
            </p>
          </div>
        </div>
      </SectionCard>
      <SectionCard title="Project Specs">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-4">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-xs text-ink-muted">{fact.label}</dt>
              <dd className="mt-0.5 text-sm font-semibold tabular-nums text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </SectionCard>
      <SectionCard title="About Project">
        <p className="text-sm leading-relaxed text-ink-secondary">{project.about}</p>
      </SectionCard>
    </div>
  );
}
