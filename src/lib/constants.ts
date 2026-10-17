import type { ParkingType, ProjectStatus, UnitType } from '@/types/project';

export const CHART = {
  brand: '#2563EB',
  success: '#16A34A',
  warning: '#F59E0B',
  danger: '#DC2626',
  purple: '#8B5CF6',
  track: '#E6EAF2',
  muted: '#6B7280',
  grid: '#EEF2F6',
  ink: '#111827',
} as const;

export const UNIT_TYPE_COLORS: Record<UnitType, string> = {
  '1 BHK': CHART.purple,
  '2 BHK': CHART.success,
  '3 BHK': CHART.brand,
  '4 BHK': CHART.warning,
};

export const UNIT_LEGEND_ORDER: UnitType[] = ['2 BHK', '3 BHK', '1 BHK', '4 BHK'];

export const PARKING_COLORS: Record<ParkingType, string> = {
  'Car Parking': CHART.success,
  'Two Wheeler': CHART.brand,
  'Visitor Parking': CHART.warning,
};

export const PARKING_LEGEND_ORDER: ParkingType[] = [
  'Car Parking',
  'Two Wheeler',
  'Visitor Parking',
];

export type StageTone = 'green' | 'blue' | 'orange' | 'grey';

export function stageTone(value: number): StageTone {
  if (value >= 100) return 'green';
  if (value >= 60) return 'blue';
  if (value >= 20) return 'orange';
  return 'grey';
}

export const PROJECT_FILTERS = ['All', 'Ongoing', 'Upcoming', 'Completed'] as const;
export type ProjectFilter = (typeof PROJECT_FILTERS)[number];

export const FILTER_TO_STATUS: Record<Exclude<ProjectFilter, 'All'>, ProjectStatus> = {
  Ongoing: 'Active',
  Upcoming: 'Planning',
  Completed: 'Completed',
};

export const DEFAULT_PROJECT_ID = 'proj-a';

export function projectBasePath(projectId: string): string {
  return `/projects/${projectId}`;
}

export function projectSectionPath(projectId: string, section: string): string {
  return `/projects/${projectId}/${section}`;
}
