'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, FileBarChart, LayoutDashboard, Menu, Users } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';
import { DEFAULT_PROJECT_ID } from '@/lib/constants';
import { currentProjectId } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { useUiStore } from '@/store/uiStore';

export function BottomNav() {
  const pathname = usePathname();
  const { data } = useProjects();
  const lastProjectId = useUiStore((state) => state.lastProjectId);
  const projectId =
    currentProjectId(pathname) ?? lastProjectId ?? data?.[0]?.id ?? DEFAULT_PROJECT_ID;
  const onProject = /^\/projects\/[^/]+/.test(pathname);

  const items = [
    { label: 'Dashboard', href: `/projects/${projectId}`, icon: LayoutDashboard, active: onProject },
    { label: 'Projects', href: '/projects', icon: Building2, active: pathname === '/projects' },
    { label: 'Customers', href: '/customers', icon: Users, active: pathname === '/customers' },
    {
      label: 'Reports',
      href: '/reports',
      icon: FileBarChart,
      active: pathname === '/reports' || pathname === '/documents',
    },
    { label: 'More', href: '/more', icon: Menu, active: pathname === '/more' },
  ];

  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="grid grid-cols-5">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                aria-current={item.active ? 'page' : undefined}
                className={cn(
                  'flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-medium text-ink-muted',
                  item.active && 'text-brand',
                )}
              >
                <Icon className="h-5 w-5" aria-hidden />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
