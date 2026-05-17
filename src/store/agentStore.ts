import { create } from 'zustand';

interface AgentStore {
  agentPositions: Map<string, { x: number; y: number }>;

  // Update agent position
  updateAgentPosition: (agentId: string, x: number, y: number) => void;

  // Create parent-child relationship
  setParent: (childId: string, parentId: string) => void;

  // Remove relationship
  clearParent: (childId: string) => void;

  // Move child near parent
  positionNearParent: (childId: string, parentId: string) => void;
}

export const useAgentStore = create<AgentStore>((set, get) => ({
  agentPositions: new Map(),

  updateAgentPosition: (agentId: string, x: number, y: number) => {
    set((state) => {
      const newPositions = new Map(state.agentPositions);
      newPositions.set(agentId, { x, y });
      return { agentPositions: newPositions };
    });
  },

  setParent: () => {
    // This will be handled by updating the agent in the desktop store
    // Just a placeholder for now
  },

  clearParent: () => {
    // This will be handled by updating the agent in the desktop store
    // Just a placeholder for now
  },

  positionNearParent: (childId: string, parentId: string) => {
    const parentPos = get().agentPositions.get(parentId);
    if (!parentPos) return;

    // Calculate position below and slightly right of parent
    const newX = parentPos.x + 50; // Offset right
    const newY = parentPos.y + 120; // Offset down (card height + gap)

    set((state) => {
      const newPositions = new Map(state.agentPositions);
      newPositions.set(childId, { x: newX, y: newY });
      return { agentPositions: newPositions };
    });
  }
}));
