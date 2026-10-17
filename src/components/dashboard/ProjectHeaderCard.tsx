import Image from 'next/image';
import {
  Building2,
  CalendarDays,
  CircleParking,
  LayoutGrid,
  MapPin,
  Warehouse,
} from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Card } from '@/components/ui/card';
import { formatIndianNumber, formatMonthYear } from '@/lib/format';
import type { ProjectDetails } from '@/types/project';

function Meta({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-[92px] items-start gap-2">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" aria-hidden />
      <div>
        <p className="text-[11px] text-ink-muted">{label}</p>
        <p className="text-sm font-semibold tabular-nums text-ink">{value}</p>
      </div>
    </div>
  );
}

export function ProjectHeaderCard({ project }: { project: ProjectDetails }) {
  return (
    <Card className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
      <div className="relative h-[100px] w-full shrink-0 overflow-hidden rounded-lg bg-track sm:h-[100px] sm:w-[160px]">
        {project.imageUrl ? (
          <Image src={project.imageUrl} alt="" fill sizes="160px" className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-ink-muted">
            <Building2 className="h-8 w-8" aria-hidden />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <h1 className="text-xl font-semibold text-ink">{project.name}</h1>
          <StatusBadge status={project.status} />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-7">
          <Meta icon={MapPin} label="Location" value={project.city} />
          <Meta icon={Warehouse} label="Total Wings" value={formatIndianNumber(project.totalWings)} />
          <Meta icon={Building2} label="Total Towers" value={formatIndianNumber(project.totalTowers)} />
          <Meta icon={LayoutGrid} label="Total Units" value={formatIndianNumber(project.totalUnits)} />
          <Meta icon={CircleParking} label="Total Parking" value={formatIndianNumber(project.totalParking)} />
          <Meta icon={CalendarDays} label="Project Start" value={formatMonthYear(project.projectStart)} />
          <Meta icon={CalendarDays} label="Expected Completion" value={formatMonthYear(project.expectedCompletion)} />
        </div>
      </div>
    </Card>
  );
}
