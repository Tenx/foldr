import { useState, useCallback } from 'react';
import { Agent } from '../types/desktop';

interface UseAgentConnectProps {
  agents: Agent[];
  onConnect: (childId: string, parentId: string) => void;
}

export const useAgentConnect = ({ agents, onConnect }: UseAgentConnectProps) => {
  const [dragSource, setDragSource] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);

  // Check if an agent is a descendant of another (to prevent circular dependencies)
  const isDescendant = useCallback((potentialDescendant: string, ancestor: string): boolean => {
    const descendant = agents.find(a => a.id === potentialDescendant);
    if (!descendant || !descendant.parentAgentId) return false;

    if (descendant.parentAgentId === ancestor) return true;

    return isDescendant(descendant.parentAgentId, ancestor);
  }, [agents]);

  // Check if agent already has children (enforcing one level of nesting)
  const hasChildren = useCallback((agentId: string): boolean => {
    return agents.some(a => a.parentAgentId === agentId);
  }, [agents]);

  const handleDragStart = useCallback((agentId: string) => {
    setDragSource(agentId);
  }, []);

  const handleDragOver = useCallback((agentId: string) => {
    // Check if valid drop target
    if (agentId !== dragSource && !isDescendant(agentId, dragSource!)) {
      setDropTarget(agentId);
    } else {
      setDropTarget(null);
    }
  }, [dragSource, isDescendant]);

  const handleDragLeave = useCallback(() => {
    setDropTarget(null);
  }, []);

  const handleDrop = useCallback((targetId: string) => {
    if (!dragSource || targetId === dragSource) {
      setDragSource(null);
      setDropTarget(null);
      return;
    }

    // Prevent circular dependencies
    if (isDescendant(targetId, dragSource)) {
      console.warn('Cannot create circular dependency');
      setDragSource(null);
      setDropTarget(null);
      return;
    }

    // Check if source already has children (would violate one-level constraint)
    if (hasChildren(dragSource)) {
      console.warn('Agent with children cannot become a child (one level only)');
      setDragSource(null);
      setDropTarget(null);
      return;
    }

    // Create the connection
    onConnect(dragSource, targetId);

    setDragSource(null);
    setDropTarget(null);
  }, [dragSource, isDescendant, hasChildren, onConnect]);

  const handleDragEnd = useCallback(() => {
    setDragSource(null);
    setDropTarget(null);
  }, []);

  return {
    dragSource,
    dropTarget,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd
  };
};
