import { create } from 'zustand';
import type { ProjectFilter } from '@/lib/constants';

interface UiState {
  asOnDate: string;
  setAsOnDate: (d: string) => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  projectFilter: ProjectFilter;
  setProjectFilter: (f: ProjectFilter) => void;
  projectSearch: string;
  setProjectSearch: (s: string) => void;
  lastProjectId: string | null;
  setLastProjectId: (id: string) => void;
}

export const useUiStore = create<UiState>((set) => ({
  asOnDate: '2025-03-31',
  setAsOnDate: (asOnDate) => set({ asOnDate }),
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  projectFilter: 'All',
  setProjectFilter: (projectFilter) => set({ projectFilter }),
  projectSearch: '',
  setProjectSearch: (projectSearch) => set({ projectSearch }),
  lastProjectId: null,
  setLastProjectId: (lastProjectId) => set({ lastProjectId }),
}));
