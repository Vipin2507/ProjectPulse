import type { LucideIcon } from 'lucide-react';

export function EmptyState({
  icon: Icon,
  title,
  message,
}: {
  icon: LucideIcon;
  title: string;
  message: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line bg-white px-6 py-14 text-center">
      <Icon className="mb-3 h-8 w-8 text-ink-muted" aria-hidden />
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="mt-1 max-w-sm text-sm text-ink-muted">{message}</p>
    </div>
  );
}
