import { ApiError } from '@/lib/api/client';
import type { ProjectDetails, ProjectStatus, ProjectSummary } from '@/types/project';

export const PROJECTS: ProjectDetails[] = [
  {
    id: 'proj-a',
    name: 'Project A - The Elevate',
    shortName: 'The Elevate',
    status: 'Active',
    city: 'Bangalore',
    totalUnits: 500,
    totalParking: 600,
    completionPercent: 65,
    imageUrl: '/projects/elevate.jpg',
    totalWings: 4,
    totalTowers: 4,
    projectType: 'Residential',
    reraNumber: 'PRM/KA/RERA/1234',
    projectStart: '2024-01-01',
    expectedCompletion: '2027-12-01',
    about:
      'The Elevate is a premium residential project located in Bangalore, offering modern living with world-class amenities and excellent connectivity.',
  },
  {
    id: 'proj-b',
    name: 'Skyline Residency',
    shortName: 'Skyline Residency',
    status: 'Active',
    city: 'Mumbai',
    totalUnits: 320,
    totalParking: 400,
    completionPercent: 40,
    imageUrl: '/projects/skyline.jpg',
    totalWings: 3,
    totalTowers: 3,
    projectType: 'Residential',
    reraNumber: 'PRM/MH/RERA/5678',
    projectStart: '2023-06-01',
    expectedCompletion: '2026-12-01',
    about:
      'Skyline Residency is a high-rise residential community in Mumbai with skyline views, landscaped podiums and strong transit access.',
  },
  {
    id: 'proj-c',
    name: 'Green Valley',
    shortName: 'Green Valley',
    status: 'Planning',
    city: 'Pune',
    totalUnits: 250,
    totalParking: 300,
    completionPercent: 10,
    imageUrl: '/projects/green-valley.jpg',
    totalWings: 2,
    totalTowers: 2,
    projectType: 'Residential',
    reraNumber: 'PRM/MH/RERA/9012',
    projectStart: '2026-03-01',
    expectedCompletion: '2029-12-01',
    about:
      'Green Valley is a planned residential township in Pune, designed around open greens and neighbourhood retail.',
  },
  {
    id: 'proj-d',
    name: 'Ocean View',
    shortName: 'Ocean View',
    status: 'Completed',
    city: 'Goa',
    totalUnits: 180,
    totalParking: 250,
    completionPercent: 100,
    imageUrl: '/projects/ocean-view.jpg',
    totalWings: 2,
    totalTowers: 2,
    projectType: 'Residential',
    reraNumber: 'PRM/GA/RERA/3456',
    projectStart: '2020-01-01',
    expectedCompletion: '2024-12-01',
    about:
      'Ocean View is a completed coastal residence in Goa, with low-rise wings facing the water and resort-style amenities.',
  },
];

export function toSummary(project: ProjectDetails): ProjectSummary {
  return {
    id: project.id,
    name: project.name,
    shortName: project.shortName,
    status: project.status,
    city: project.city,
    totalUnits: project.totalUnits,
    totalParking: project.totalParking,
    completionPercent: project.completionPercent,
    imageUrl: project.imageUrl,
  };
}

export function requireProject(projectId: string): ProjectDetails {
  const project = PROJECTS.find((item) => item.id === projectId);
  if (!project) throw new ApiError(404, 'Project not found');
  return project;
}

export function listProjects(params: { status?: ProjectStatus; search?: string }): ProjectSummary[] {
  const search = params.search?.trim().toLowerCase();
  return PROJECTS.filter((project) => {
    if (params.status && project.status !== params.status) return false;
    if (!search) return true;
    return (
      project.name.toLowerCase().includes(search) || project.city.toLowerCase().includes(search)
    );
  }).map(toSummary);
}
