export function currentProjectId(pathname: string): string | null {
  const match = pathname.match(/^\/projects\/([^/]+)/);
  return match?.[1] ?? null;
}

export function replaceProjectId(pathname: string, nextId: string): string {
  if (/^\/projects\/[^/]+/.test(pathname)) {
    return pathname.replace(/^\/projects\/[^/]+/, `/projects/${nextId}`);
  }
  return `/projects/${nextId}`;
}

export function parentPath(pathname: string): string {
  if (/^\/projects\/[^/]+\/.+/.test(pathname)) {
    return pathname.split('/').slice(0, 3).join('/');
  }
  return '/projects';
}

export function mobileTitle(pathname: string): string {
  if (pathname === '/customers') return 'Customers';
  if (pathname === '/reports') return 'Reports';
  if (pathname === '/settings') return 'Settings';
  if (pathname === '/documents') return 'Documents';
  if (pathname === '/more') return 'More';
  if (/^\/projects\/[^/]+$/.test(pathname)) return 'Project Overview';
  if (pathname.endsWith('/units')) return 'Units by Type';
  if (pathname.endsWith('/parking')) return 'Parking by Type';
  if (pathname.endsWith('/area')) return 'Area Statement';
  if (pathname.endsWith('/sales-collections')) return 'Sales & Collections';
  if (pathname.endsWith('/outstanding')) return 'Outstanding Details';
  if (pathname.endsWith('/construction')) return 'Construction Progress';
  if (pathname.endsWith('/details')) return 'Project Details';
  return 'Buildesk CRM';
}
