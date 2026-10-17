import Link from 'next/link';

export function PageHeader({
  title,
  crumbs,
}: {
  title: string;
  crumbs: Array<{ label: string; href?: string }>;
}) {
  return (
    <header className="mb-4 hidden lg:block">
      <nav aria-label="Breadcrumb" className="mb-1">
        <ol className="flex flex-wrap items-center gap-1 text-xs text-ink-muted">
          {crumbs.map((crumb, index) => (
            <li key={`${crumb.label}-${index}`} className="flex items-center gap-1">
              {index > 0 ? <span aria-hidden>/</span> : null}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-brand">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-ink-secondary">{crumb.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <h1 className="text-xl font-semibold text-ink">{title}</h1>
    </header>
  );
}
