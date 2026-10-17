'use client';

import Link from 'next/link';
import {
  CircleParking,
  FileText,
  HardHat,
  IndianRupee,
  LayoutGrid,
  Ruler,
  AlertTriangle,
  Building2,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { useProjects } from '@/hooks/useProjects';
import { DEFAULT_PROJECT_ID } from '@/lib/constants';
import { useUiStore } from '@/store/uiStore';

interface MoreItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export default function MorePage() {
  const { data } = useProjects();
  const lastProjectId = useUiStore((state) => state.lastProjectId);
  const projectId = lastProjectId ?? data?.[0]?.id ?? DEFAULT_PROJECT_ID;

  const items: MoreItem[] = [
    { label: 'Units', href: `/projects/${projectId}/units`, icon: LayoutGrid },
    { label: 'Parking', href: `/projects/${projectId}/parking`, icon: CircleParking },
    { label: 'Area Statement', href: `/projects/${projectId}/area`, icon: Ruler },
    {
      label: 'Sales & Collections',
      href: `/projects/${projectId}/sales-collections`,
      icon: IndianRupee,
    },
    {
      label: 'Outstanding',
      href: `/projects/${projectId}/outstanding`,
      icon: AlertTriangle,
    },
    {
      label: 'Construction Progress',
      href: `/projects/${projectId}/construction`,
      icon: HardHat,
    },
    { label: 'Project Details', href: `/projects/${projectId}/details`, icon: Building2 },
    { label: 'Documents', href: '/documents', icon: FileText },
    { label: 'Reports', href: '/reports', icon: FileText },
  ];

  return (
    <div className="mx-auto max-w-xl">
      <PageHeader title="More" crumbs={[{ label: 'More' }]} />
      <ul className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.label} className="border-b border-line last:border-b-0">
              <Link
                href={item.href}
                className="flex min-h-14 items-center gap-3 px-4 text-sm font-medium text-ink"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-brand">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="flex-1">{item.label}</span>
                <ChevronRight className="h-4 w-4 text-ink-muted" aria-hidden />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
