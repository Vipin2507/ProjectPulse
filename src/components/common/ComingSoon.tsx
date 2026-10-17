import type { LucideIcon } from 'lucide-react';
import { EmptyState } from '@/components/common/EmptyState';
import { PageHeader } from '@/components/common/PageHeader';

export function ComingSoon({
  title,
  icon,
  message = 'This module will be available in a later release.',
}: {
  title: string;
  icon: LucideIcon;
  message?: string;
}) {
  return (
    <div className="mx-auto max-w-xl">
      <PageHeader title={title} crumbs={[{ label: title }]} />
      <EmptyState icon={icon} title="Coming soon" message={message} />
    </div>
  );
}
