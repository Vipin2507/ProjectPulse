'use client';

import { useEffect, useState } from 'react';
import { Building2 } from 'lucide-react';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { PageHeader } from '@/components/common/PageHeader';
import { SkeletonCard } from '@/components/common/SkeletonCard';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectFilterChips } from '@/components/projects/ProjectFilterChips';
import { ProjectSearch } from '@/components/projects/ProjectSearch';
import { useProjects } from '@/hooks/useProjects';
import { errorMessage } from '@/lib/api/client';
import { FILTER_TO_STATUS } from '@/lib/constants';
import { useUiStore } from '@/store/uiStore';

export default function ProjectsPage() {
  const filter = useUiStore((state) => state.projectFilter);
  const setFilter = useUiStore((state) => state.setProjectFilter);
  const search = useUiStore((state) => state.projectSearch);
  const setSearch = useUiStore((state) => state.setProjectSearch);
  const [debounced, setDebounced] = useState(search);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(search), 250);
    return () => window.clearTimeout(timer);
  }, [search]);

  const status = filter === 'All' ? undefined : FILTER_TO_STATUS[filter];
  const query = useProjects(status ? { status } : {});
  const needle = debounced.trim().toLowerCase();
  const projects = (query.data ?? []).filter((project) => {
    if (!needle) return true;
    return project.name.toLowerCase().includes(needle) || project.city.toLowerCase().includes(needle);
  });

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Projects" crumbs={[{ label: 'Buildesk', href: '/projects' }, { label: 'Projects' }]} />
      <h1 className="mb-3 text-2xl font-semibold lg:hidden">Projects</h1>
      <div className="mb-4 space-y-3">
        <ProjectSearch value={search} onChange={setSearch} />
        <ProjectFilterChips value={filter} onChange={setFilter} />
      </div>
      {query.isPending ? (
        <div className="grid gap-3 lg:grid-cols-2">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : query.isError ? (
        <ErrorState message={errorMessage(query.error)} onRetry={() => void query.refetch()} />
      ) : projects.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="No projects found"
          message="Try another status or search by project name or city."
        />
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
