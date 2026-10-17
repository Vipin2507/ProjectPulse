'use client';

import { ErrorState } from '@/components/common/ErrorState';
import { PageHeader } from '@/components/common/PageHeader';
import { SectionCard } from '@/components/common/SectionCard';
import { SkeletonBlock } from '@/components/common/SkeletonCard';
import { ConstructionRing } from '@/components/dashboard/ConstructionProgressCard';
import { StageTile } from '@/components/dashboard/StageTile';
import { useConstruction } from '@/hooks/useConstruction';
import { useProjects } from '@/hooks/useProjects';
import { errorMessage } from '@/lib/api/client';

export default function ConstructionPage({ params }: { params: { projectId: string } }) {
  const query = useConstruction(params.projectId);
  const projects = useProjects();
  const name = projects.data?.find((project) => project.id === params.projectId)?.name ?? 'Project';

  if (query.isPending) return <SkeletonBlock className="h-96 w-full" />;
  if (query.isError || !query.data) {
    return <ErrorState message={errorMessage(query.error)} onRetry={() => void query.refetch()} />;
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title="Construction Progress"
        crumbs={[
          { label: 'Projects', href: '/projects' },
          { label: name, href: `/projects/${params.projectId}` },
          { label: 'Construction' },
        ]}
      />
      <ConstructionRing progress={query.data} />
      <SectionCard title="Stages">
        <div className="divide-y divide-line">
          {query.data.stages.map((stage) => (
            <StageTile key={stage.key} stage={stage} layout="row" />
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
