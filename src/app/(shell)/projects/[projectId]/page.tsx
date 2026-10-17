'use client';

import Link from 'next/link';
import {
  Building2,
  CalendarDays,
  CircleParking,
  FileText,
  HardHat,
  IndianRupee,
  LayoutGrid,
  MapPin,
  Ruler,
  Warehouse,
} from 'lucide-react';
import { ErrorState } from '@/components/common/ErrorState';
import { StatusBadge } from '@/components/common/StatusBadge';
import { SkeletonBlock, SkeletonCard } from '@/components/common/SkeletonCard';
import { AreaTable } from '@/components/dashboard/AreaTable';
import { ConstructionProgressCard } from '@/components/dashboard/ConstructionProgressCard';
import { DonutCard, toDonutData } from '@/components/dashboard/DonutCard';
import { InventoryTable } from '@/components/dashboard/InventoryTable';
import { KpiGrid } from '@/components/dashboard/KpiGrid';
import { ParkingTable } from '@/components/dashboard/ParkingTable';
import { ProjectHeaderCard } from '@/components/dashboard/ProjectHeaderCard';
import { useProjectOverview } from '@/hooks/useProjectOverview';
import { errorMessage } from '@/lib/api/client';
import {
  PARKING_COLORS,
  PARKING_LEGEND_ORDER,
  UNIT_LEGEND_ORDER,
  UNIT_TYPE_COLORS,
  projectSectionPath,
} from '@/lib/constants';
import { formatIndianNumber, formatMonthYear, sum } from '@/lib/format';
import { cn } from '@/lib/utils';
import { useUiStore } from '@/store/uiStore';
import type { AreaStatementRow, ParkingInventoryRow, ProjectDetails, UnitInventoryRow } from '@/types/project';

const QUICK_LINKS = [
  { section: 'units', label: 'Units', icon: LayoutGrid, tone: 'bg-brand-soft text-brand' },
  { section: 'parking', label: 'Parking', icon: CircleParking, tone: 'bg-success-soft text-success' },
  { section: 'area', label: 'Area', icon: Ruler, tone: 'bg-purple/10 text-purple' },
  { section: 'sales-collections', label: 'Collections', icon: IndianRupee, tone: 'bg-warning-soft text-warning' },
  { section: 'construction', label: 'Construction', icon: HardHat, tone: 'bg-brand-soft text-brand' },
  { section: 'details', label: 'Details', icon: FileText, tone: 'bg-track text-ink-secondary' },
] as const;

function unitDonut(rows: UnitInventoryRow[]) {
  return toDonutData(
    UNIT_LEGEND_ORDER.map((unitType) => ({
      name: unitType,
      value: rows.find((row) => row.unitType === unitType)?.total ?? 0,
      color: UNIT_TYPE_COLORS[unitType],
    })),
  );
}

function parkingDonut(rows: ParkingInventoryRow[]) {
  return toDonutData(
    PARKING_LEGEND_ORDER.map((parkingType) => ({
      name: parkingType,
      value: rows.find((row) => row.parkingType === parkingType)?.total ?? 0,
      color: PARKING_COLORS[parkingType],
    })),
  );
}

function areaDonut(rows: AreaStatementRow[]) {
  return toDonutData(
    UNIT_LEGEND_ORDER.map((unitType) => ({
      name: unitType,
      value: rows.find((row) => row.unitType === unitType)?.totalArea ?? 0,
      color: UNIT_TYPE_COLORS[unitType],
    })),
  );
}

function MobileFact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
      <div>
        <p className="text-sm font-semibold tabular-nums leading-tight">{value}</p>
        <p className="text-[11px] text-ink-muted">{label}</p>
      </div>
    </div>
  );
}

function MobileOverview({ project }: { project: ProjectDetails }) {
  return (
    <div className="space-y-3 lg:hidden">
      <article className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
        <div className="relative h-40 bg-track">
          {project.imageUrl ? (
            // Decorative; the project name is the heading beside the badge.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.imageUrl} alt="" className="h-full w-full object-cover" />
          ) : null}
        </div>
        <div className="p-4">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold">{project.name}</h2>
            <StatusBadge status={project.status} />
          </div>
          <p className="mt-1 flex items-center gap-1 text-sm text-ink-muted">
            <MapPin className="h-4 w-4" aria-hidden />
            {project.city}
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <MobileFact icon={Warehouse} label="Wings" value={String(project.totalWings)} />
            <MobileFact icon={Building2} label="Towers" value={String(project.totalTowers)} />
            <MobileFact icon={LayoutGrid} label="Units" value={formatIndianNumber(project.totalUnits)} />
            <MobileFact icon={CircleParking} label="Parking" value={formatIndianNumber(project.totalParking)} />
            <MobileFact icon={CalendarDays} label="Start Date" value={formatMonthYear(project.projectStart)} />
            <MobileFact icon={CalendarDays} label="Expected" value={formatMonthYear(project.expectedCompletion)} />
          </div>
        </div>
      </article>
    </div>
  );
}

export default function ProjectOverviewPage({ params }: { params: { projectId: string } }) {
  const asOn = useUiStore((state) => state.asOnDate);
  const query = useProjectOverview(params.projectId, asOn);

  if (query.isPending) {
    return (
      <div className="space-y-4">
        <SkeletonBlock className="h-36 w-full" />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <div className="grid gap-3 xl:grid-cols-3">
          <SkeletonBlock className="h-64" />
          <SkeletonBlock className="h-64" />
          <SkeletonBlock className="h-64" />
        </div>
      </div>
    );
  }

  if (query.isError || !query.data) {
    return <ErrorState message={errorMessage(query.error)} onRetry={() => void query.refetch()} />;
  }

  const { project, financials, unitInventory, parkingInventory, areaStatement, construction } = query.data;
  const unitTotal = sum(unitInventory.map((row) => row.total));
  const parkingTotal = sum(parkingInventory.map((row) => row.total));
  const areaTotal = sum(areaStatement.map((row) => row.totalArea));

  return (
    <div className="space-y-4">
      <div className="hidden space-y-4 lg:block">
        <ProjectHeaderCard project={project} />
        <KpiGrid financials={financials} />
        <div className="grid gap-3 xl:grid-cols-3">
          <InventoryTable rows={unitInventory} />
          <ParkingTable rows={parkingInventory} />
          <AreaTable rows={areaStatement} />
        </div>
        <div className="grid gap-3 xl:grid-cols-3">
          <DonutCard
            title={`Units by Type (Total ${formatIndianNumber(unitTotal)})`}
            centerLabel={formatIndianNumber(unitTotal)}
            centerSub="Units"
            data={unitDonut(unitInventory)}
          />
          <DonutCard
            title={`Parking by Type (Total ${formatIndianNumber(parkingTotal)})`}
            centerLabel={formatIndianNumber(parkingTotal)}
            centerSub="Parking"
            data={parkingDonut(parkingInventory)}
          />
          <DonutCard
            title={`Area by Unit Type (Total ${formatIndianNumber(areaTotal)} Sq. Ft.)`}
            centerLabel={formatIndianNumber(areaTotal)}
            centerSub="Sq. Ft."
            data={areaDonut(areaStatement)}
          />
        </div>
        <ConstructionProgressCard progress={construction} />
      </div>

      <div className="space-y-3 lg:hidden">
        <MobileOverview project={project} />
        <KpiGrid financials={financials} variant="compact" />
        <div className="grid grid-cols-3 gap-3">
          {QUICK_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.section}
                href={projectSectionPath(project.id, link.section)}
                className="flex min-h-[88px] flex-col items-center justify-center gap-2 rounded-xl border border-line bg-white p-3 text-center shadow-card"
              >
                <span className={cn('flex h-9 w-9 items-center justify-center rounded-full', link.tone)}>
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="text-xs font-medium">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
