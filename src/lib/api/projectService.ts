import type {
  AgeingBucket,
  AreaStatementRow,
  CollectionTrendPoint,
  ConstructionProgress,
  InstallmentRow,
  OutstandingCustomerRow,
  OutstandingUnitRow,
  ParkingInventoryRow,
  ProjectDetails,
  ProjectOverviewResponse,
  ProjectStatus,
  ProjectSummary,
  UnitInventoryRow,
} from '@/types/project';
import { request } from './client';
import { endpoints } from './endpoints';
import {
  getAreaStatement as mockArea,
  getParkingInventory as mockParking,
  getProjectOverview as mockOverview,
  getUnitInventory as mockUnits,
} from './mock/overview';
import {
  getCollectionTrend as mockTrend,
  getInstallmentWise as mockInstallments,
} from './mock/collections';
import { getConstructionProgress as mockConstruction } from './mock/construction';
import {
  getOutstandingAgeing as mockAgeing,
  getOutstandingTopCustomers as mockCustomers,
  getOutstandingUnitWise as mockOutstandingUnits,
} from './mock/outstanding';
import { listProjects, requireProject } from './mock/projects';
import { withMock } from './mock/delay';

const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export function getProjects(params: {
  status?: ProjectStatus;
  search?: string;
}): Promise<ProjectSummary[]> {
  if (useMock) return withMock(() => listProjects(params));
  return request<ProjectSummary[]>(endpoints.projects(params));
}

export function getProjectOverview(
  projectId: string,
  asOn: string,
): Promise<ProjectOverviewResponse> {
  if (useMock) return mockOverview(projectId, asOn);
  return request<ProjectOverviewResponse>(endpoints.overview(projectId, asOn));
}

export function getUnitInventory(projectId: string, asOn: string): Promise<UnitInventoryRow[]> {
  if (useMock) return mockUnits(projectId, asOn);
  return request<UnitInventoryRow[]>(endpoints.unitInventory(projectId, asOn));
}

export function getParkingInventory(
  projectId: string,
  asOn: string,
): Promise<ParkingInventoryRow[]> {
  if (useMock) return mockParking(projectId, asOn);
  return request<ParkingInventoryRow[]>(endpoints.parkingInventory(projectId, asOn));
}

export function getAreaStatement(projectId: string, asOn: string): Promise<AreaStatementRow[]> {
  if (useMock) return mockArea(projectId, asOn);
  return request<AreaStatementRow[]>(endpoints.areaStatement(projectId, asOn));
}

export function getCollectionTrend(
  projectId: string,
  asOn: string,
): Promise<CollectionTrendPoint[]> {
  if (useMock) return mockTrend(projectId, asOn);
  return request<CollectionTrendPoint[]>(endpoints.collectionTrend(projectId, asOn));
}

export function getInstallmentWise(projectId: string, asOn: string): Promise<InstallmentRow[]> {
  if (useMock) return mockInstallments(projectId, asOn);
  return request<InstallmentRow[]>(endpoints.installments(projectId, asOn));
}

export function getOutstandingTopCustomers(
  projectId: string,
  asOn: string,
  limit: number,
): Promise<OutstandingCustomerRow[]> {
  if (useMock) return mockCustomers(projectId, asOn, limit);
  return request<OutstandingCustomerRow[]>(
    endpoints.outstandingCustomers(projectId, asOn, limit),
  );
}

export function getOutstandingUnitWise(
  projectId: string,
  asOn: string,
): Promise<OutstandingUnitRow[]> {
  if (useMock) return mockOutstandingUnits(projectId, asOn);
  return request<OutstandingUnitRow[]>(endpoints.outstandingUnits(projectId, asOn));
}

export function getOutstandingAgeing(projectId: string, asOn: string): Promise<AgeingBucket[]> {
  if (useMock) return mockAgeing(projectId, asOn);
  return request<AgeingBucket[]>(endpoints.outstandingAgeing(projectId, asOn));
}

export function getConstructionProgress(projectId: string): Promise<ConstructionProgress> {
  if (useMock) return mockConstruction(projectId);
  return request<ConstructionProgress>(endpoints.construction(projectId));
}

export function getProjectDetails(projectId: string): Promise<ProjectDetails> {
  if (useMock) return withMock(() => requireProject(projectId));
  return request<ProjectDetails>(endpoints.project(projectId));
}
