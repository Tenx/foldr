import { create } from 'zustand';

export type AgentStatusFilter = 'all' | 'active' | 'inactive';
export type AgentSortBy = 'position' | 'name' | 'status' | 'created';

interface NavigationStore {
  currentPath: string[];
  currentProjectId: string | null;
  selectedAgentId: string | null;
  agentStatusFilter: AgentStatusFilter;
  agentSortBy: AgentSortBy;

  navigateToProject: (projectId: string, projectName: string) => void;
  navigateBack: () => void;
  navigateToDesktop: () => void;
  selectAgent: (agentId: string | null) => void;
  setAgentStatusFilter: (filter: AgentStatusFilter) => void;
  setAgentSortBy: (sortBy: AgentSortBy) => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  currentPath: [],
  currentProjectId: null,
  selectedAgentId: null,
  agentStatusFilter: 'all',
  agentSortBy: 'position',

  navigateToProject: (projectId, projectName) => set((state) => ({
    currentPath: [...state.currentPath, projectName],
    currentProjectId: projectId,
    selectedAgentId: null,
    agentStatusFilter: 'all',
    agentSortBy: 'position'
  })),

  navigateBack: () => set((state) => {
    if (state.currentPath.length === 0) return state;

    const newPath = state.currentPath.slice(0, -1);
    return {
      currentPath: newPath,
      currentProjectId: null,
      selectedAgentId: null,
      agentStatusFilter: 'all',
      agentSortBy: 'position'
    };
  }),

  navigateToDesktop: () => set({
    currentPath: [],
    currentProjectId: null,
    selectedAgentId: null,
    agentStatusFilter: 'all',
    agentSortBy: 'position'
  }),

  selectAgent: (agentId) => set({ selectedAgentId: agentId }),
  setAgentStatusFilter: (filter) => set({ agentStatusFilter: filter }),
  setAgentSortBy: (sortBy) => set({ agentSortBy: sortBy })
}));
