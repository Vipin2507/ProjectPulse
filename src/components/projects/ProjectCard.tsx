import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, MapPin } from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';
import { formatIndianNumber } from '@/lib/format';
import type { ProjectSummary } from '@/types/project';

export function ProjectCard({ project }: { project: ProjectSummary }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="flex items-center gap-3 rounded-xl border border-line bg-white p-3 shadow-card"
    >
      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-track">
        {project.imageUrl ? (
          <Image src={project.imageUrl} alt="" fill sizes="80px" className="object-cover" />
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h2 className="truncate text-sm font-semibold">{project.name}</h2>
          <StatusBadge status={project.status} />
        </div>
        <p className="mt-1 flex items-center gap-1 text-xs text-ink-muted">
          <MapPin className="h-3.5 w-3.5" aria-hidden />
          {project.city}
        </p>
        <p className="mt-1 text-xs text-ink-secondary">
          <span className="tabular-nums">{formatIndianNumber(project.totalUnits)}</span> Units
          <span aria-hidden> • </span>
          <span className="tabular-nums">{formatIndianNumber(project.totalParking)}</span> Parking
        </p>
        <div className="mt-2 flex items-center gap-2">
          <div
            role="progressbar"
            aria-valuenow={project.completionPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${project.completionPercent}% completed`}
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-track"
          >
            <div
              className="h-full rounded-full bg-success"
              style={{ width: `${project.completionPercent}%` }}
            />
          </div>
          <span className="whitespace-nowrap text-[11px] font-medium tabular-nums text-ink-secondary">
            {project.completionPercent}% Completed
          </span>
        </div>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden />
    </Link>
  );
}
