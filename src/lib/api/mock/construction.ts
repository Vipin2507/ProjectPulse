import type { ConstructionProgress, ConstructionStage, ProjectDetails } from '@/types/project';
import { withMock } from './delay';
import { requireProject } from './projects';

const LABELS: ConstructionStage['key'][] = [
  'land_approvals',
  'foundation',
  'structure',
  'brickwork',
  'plastering',
  'finishing',
  'possession',
];

const LABEL_TEXT: Record<ConstructionStage['key'], string> = {
  land_approvals: 'Land & Approvals',
  foundation: 'Foundation',
  structure: 'Structure',
  brickwork: 'Brickwork',
  plastering: 'Plastering',
  finishing: 'Finishing',
  possession: 'Possession',
};

const STAGE_PERCENTS: Record<string, number[]> = {
  'proj-a': [100, 100, 80, 60, 40, 20, 0],
  'proj-b': [100, 100, 50, 20, 10, 0, 0],
  'proj-c': [80, 10, 0, 0, 0, 0, 0],
  'proj-d': [100, 100, 100, 100, 100, 100, 100],
};

export function constructionFor(project: ProjectDetails): ConstructionProgress {
  const percents = STAGE_PERCENTS[project.id] ?? STAGE_PERCENTS['proj-a'];
  const stages: ConstructionStage[] = LABELS.map((key, index) => ({
    key,
    label: LABEL_TEXT[key],
    percent: percents?.[index] ?? 0,
  }));
  return { overallPercent: project.completionPercent, stages };
}

export function getConstructionProgress(projectId: string): Promise<ConstructionProgress> {
  return withMock(() => constructionFor(requireProject(projectId)));
}
