function query(params: Record<string, string | number | undefined>): string {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') search.set(key, String(value));
  });
  const text = search.toString();
  return text ? `?${text}` : '';
}

function idPath(projectId: string): string {
  return `/projects/${encodeURIComponent(projectId)}`;
}

export const endpoints = {
  projects: (params: { status?: string; search?: string }) => `/projects${query(params)}`,
  project: (projectId: string) => idPath(projectId),
  overview: (projectId: string, asOn: string) => `${idPath(projectId)}/overview${query({ asOn })}`,
  unitInventory: (projectId: string, asOn: string) =>
    `${idPath(projectId)}/units/inventory${query({ asOn })}`,
  parkingInventory: (projectId: string, asOn: string) =>
    `${idPath(projectId)}/parking/inventory${query({ asOn })}`,
  areaStatement: (projectId: string, asOn: string) =>
    `${idPath(projectId)}/area-statement${query({ asOn })}`,
  collectionTrend: (projectId: string, asOn: string) =>
    `${idPath(projectId)}/collections/trend${query({ asOn })}`,
  installments: (projectId: string, asOn: string) =>
    `${idPath(projectId)}/collections/installments${query({ asOn })}`,
  outstandingCustomers: (projectId: string, asOn: string, limit: number) =>
    `${idPath(projectId)}/outstanding/customers${query({ asOn, limit })}`,
  outstandingUnits: (projectId: string, asOn: string) =>
    `${idPath(projectId)}/outstanding/units${query({ asOn })}`,
  outstandingAgeing: (projectId: string, asOn: string) =>
    `${idPath(projectId)}/outstanding/ageing${query({ asOn })}`,
  construction: (projectId: string) => `${idPath(projectId)}/construction`,
};
