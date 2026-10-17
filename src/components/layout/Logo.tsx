import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand text-white',
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 20.5h16M6 20.5V9.2L12 5l6 4.2v11.3" strokeLinejoin="round" />
        <path d="M10 20.5v-5h4v5" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
