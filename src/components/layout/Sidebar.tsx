'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building2,
  CircleParking,
  FileText,
  HardHat,
  IndianRupee,
  LayoutDashboard,
  LayoutGrid,
  Ruler,
  Settings,
  type LucideIcon,
} from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { useProjects } from '@/hooks/useProjects';
import { DEFAULT_PROJECT_ID } from '@/lib/constants';
import { currentProjectId } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { useUiStore } from '@/store/uiStore';

interface NavItem {
  label: string;
  icon: LucideIcon;
  href: string;
  exact?: boolean;
}

export function Sidebar() {
  const pathname = usePathname();
  const collapsed = useUiStore((state) => state.sidebarCollapsed);
  const { data } = useProjects();
  const projectId = currentProjectId(pathname) ?? data?.[0]?.id ?? DEFAULT_PROJECT_ID;

  const items: NavItem[] = [
    { label: 'Project Overview', icon: LayoutDashboard, href: `/projects/${projectId}`, exact: true },
    { label: 'Projects', icon: Building2, href: '/projects', exact: true },
    { label: 'Units', icon: LayoutGrid, href: `/projects/${projectId}/units` },
    { label: 'Sales & Collections', icon: IndianRupee, href: `/projects/${projectId}/sales-collections` },
    { label: 'Parking', icon: CircleParking, href: `/projects/${projectId}/parking` },
    { label: 'Area Statement', icon: Ruler, href: `/projects/${projectId}/area` },
    { label: 'Construction', icon: HardHat, href: `/projects/${projectId}/construction` },
    { label: 'Reports', icon: FileText, href: '/reports' },
    { label: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <aside
      className={cn(
        'sticky top-0 hidden h-screen shrink-0 flex-col border-r border-line bg-white transition-[width] duration-200 lg:flex',
        collapsed ? 'w-[72px]' : 'w-[240px]',
      )}
    >
      <div className={cn('flex h-16 items-center gap-2 border-b border-line px-4', collapsed && 'justify-center px-2')}>
        <Logo />
        {collapsed ? null : <span className="truncate text-[15px] font-semibold">Buildesk CRM</span>}
      </div>
      <nav aria-label="Primary" className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        {items.map((item) => {
          const active = item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              aria-label={item.label}
              aria-current={active ? 'page' : undefined}
              title={collapsed ? item.label : undefined}
              className={cn(
                'flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium text-ink-secondary hover:bg-page',
                collapsed && 'justify-center px-0',
                active && 'bg-brand-soft text-brand',
              )}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden />
              {collapsed ? null : <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
