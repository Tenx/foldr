import { useState, useRef, useEffect } from 'react';
import { useNavigationStore } from '../../store/navigationStore';
import { useDesktopStore } from '../../store/desktopStore';
import type { Agent, ProjectData, Task } from '../../types/desktop';
import { useAgentConnect } from '../../hooks/useAgentConnect';
import AgentConfigWindow from './AgentConfigWindow';
import ProjectSettingsWindow from './ProjectSettingsWindow';
import styles from './ProjectView.module.css';

const ProjectView = () => {
  const currentProjectId = useNavigationStore((state) => state.currentProjectId);
  const currentPath = useNavigationStore((state) => state.currentPath);
  const selectedAgentId = useNavigationStore((state) => state.selectedAgentId);
  const selectAgent = useNavigationStore((state) => state.selectAgent);
  const agentStatusFilter = useNavigationStore((state) => state.agentStatusFilter);
  const agentSortBy = useNavigationStore((state) => state.agentSortBy);
  const navigateBack = useNavigationStore((state) => state.navigateBack);
  const icons = useDesktopStore((state) => state.icons);
  const updateIcon = useDesktopStore((state) => state.updateIcon);
  const [selectedConfigAgent, setSelectedConfigAgent] = useState<Agent | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [draggingAgent, setDraggingAgent] = useState<string | null>(null);
  const [draggingTask, setDraggingTask] = useState<string | null>(null);
  const [taskDropTarget, setTaskDropTarget] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const project = icons.find((icon) => icon.id === currentProjectId);
  const projectData = project?.data;
  const allAgents = projectData?.agents ?? [];
  const allTasks = projectData?.tasks ?? [];
  const openTasks = allTasks.filter((task) => !task.assignedAgentId);
  const agentCardWidth = 180;
  const agentCardHeight = 132;

  const updateProjectData = (updates: Partial<ProjectData>) => {
    if (!currentProjectId || !project || !projectData) return;

    updateIcon(currentProjectId, {
      ...project,
      data: {
        ...projectData,
        ...updates,
        modifiedAt: new Date()
      }
    });
  };

  const rectanglesOverlap = (
    a: { x: number; y: number; width: number; height: number },
    b: { x: number; y: number; width: number; height: number }
  ) => (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );

  const findTaskSpawnPosition = () => {
    const noteWidth = 190;
    const noteHeight = 148;
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    const canvasWidth = canvasRect?.width ?? 760;
    const canvasHeight = canvasRect?.height ?? 600;

    const occupiedRects = [
      ...allAgents
        .filter((agent) => agent.position)
        .map((agent) => ({
          x: agent.position!.x - 12,
          y: agent.position!.y - 12,
          width: agentCardWidth + 24,
          height: agentCardHeight + 24
        })),
      ...openTasks.map((task) => ({
        x: task.position.x - 12,
        y: task.position.y - 12,
        width: noteWidth + 24,
        height: noteHeight + 24
      }))
    ];

    for (let y = 20; y <= canvasHeight - noteHeight - 20; y += noteHeight + 22) {
      for (let x = 20; x <= canvasWidth - noteWidth - 20; x += noteWidth + 22) {
        const candidate = { x, y, width: noteWidth, height: noteHeight };
        if (!occupiedRects.some((rect) => rectanglesOverlap(candidate, rect))) {
          return { x, y };
        }
      }
    }

    return {
      x: Math.max(20, canvasWidth - noteWidth - 24),
      y: Math.max(20, canvasHeight - noteHeight - 24)
    };
  };

  const handleConnect = (childId: string, parentId: string) => {
    if (!currentProjectId) return;

    // Update the agent to have a parent
    const updatedAgents = allAgents.map((agent) => {
      if (agent.id === childId) {
        // Position child near parent
        const parent = allAgents.find((a) => a.id === parentId);
        if (parent && parent.position) {
          return {
            ...agent,
            type: 'sub-agent' as const,
            parentAgentId: parentId,
            position: {
              x: parent.position.x + 50,
              y: parent.position.y + 150
            }
          };
        }
        return { ...agent, type: 'sub-agent' as const, parentAgentId: parentId };
      }
      return agent;
    });

    updateProjectData({ agents: updatedAgents });
  };

  const handleDetachAgent = (agentId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const updatedAgents = allAgents.map((agent) =>
      agent.id === agentId
        ? {
            ...agent,
            type: 'agent' as const,
            parentAgentId: undefined
          }
        : agent
    );

    updateProjectData({ agents: updatedAgents });
  };

  const {
    dropTarget,
    handleDragStart: onDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd: onDragEnd
  } = useAgentConnect({
    agents: allAgents,
    onConnect: handleConnect
  });

  const handleAgentDoubleClick = (agent: Agent) => {
    // Only open config if not dragging
    if (!draggingAgent) {
      setSelectedConfigAgent(agent);
    }
  };

  const handleAgentMouseDown = (agent: Agent, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.detail >= 2) {
      setDraggingAgent(null);
      selectAgent(agent.id);
      setSelectedConfigAgent(agent);
      return;
    }

    if (!agent.position) return;

    selectAgent(agent.id);
    setDraggingAgent(agent.id);
    onDragStart(agent.id);

    // Calculate offset from mouse to agent position
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (canvasRect) {
      setDragOffset({
        x: e.clientX - canvasRect.left - agent.position.x,
        y: e.clientY - canvasRect.top - agent.position.y
      });
    }
  };

  useEffect(() => {
    if (!draggingAgent) return;

    const handleMouseMove = (e: MouseEvent) => {
      const canvasRect = canvasRef.current?.getBoundingClientRect();
      if (!canvasRect) return;

      const newX = e.clientX - canvasRect.left - dragOffset.x;
      const newY = e.clientY - canvasRect.top - dragOffset.y;

      // Update agent position
      const updatedAgents = allAgents.map((agent) => {
        if (agent.id === draggingAgent) {
          return {
            ...agent,
            position: { x: Math.max(0, newX), y: Math.max(0, newY) }
          };
        }
        return agent;
      });

      updateProjectData({ agents: updatedAgents });

      // Check if hovering over another agent
      const mouseX = e.clientX - canvasRect.left;
      const mouseY = e.clientY - canvasRect.top;

      for (const agent of allAgents) {
        if (agent.id === draggingAgent || !agent.position) continue;

        if (
          mouseX >= agent.position.x &&
          mouseX <= agent.position.x + agentCardWidth &&
          mouseY >= agent.position.y &&
          mouseY <= agent.position.y + agentCardHeight
        ) {
          handleDragOver(agent.id);
          return;
        }
      }

      handleDragLeave();
    };

    const handleMouseUp = () => {
      if (dropTarget) {
        handleDrop(dropTarget);
      }
      setDraggingAgent(null);
      onDragEnd();
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingAgent, dragOffset, allAgents, dropTarget, projectData]);

  const handleCreateTask = () => {
    const taskNumber = allTasks.length + 1;
    const now = new Date();
    const newTask: Task = {
      id: `task-${now.getTime()}`,
      title: `Task ${taskNumber}`,
      content: '',
      status: 'draft',
      position: findTaskSpawnPosition(),
      createdAt: now,
      updatedAt: now
    };

    updateProjectData({ tasks: [...allTasks, newTask] });
  };

  const handleCreateAgent = () => {
    const now = new Date();
    const newAgent: Agent = {
      id: `agent-${now.getTime()}`,
      name: `Agent ${allAgents.length + 1}`,
      type: 'agent',
      status: 'inactive',
      description: 'New agent',
      position: {
        x: 80 + (allAgents.length % 3) * 220,
        y: 100 + (Math.floor(allAgents.length / 3) % 2) * 180
      },
      config: {
        model: 'claude-sonnet-4-6',
        maxTokens: 4096,
        temperature: 0.7,
        contextWindow: {
          total: 200000,
          used: 0,
          remaining: 200000
        },
        lastUpdated: now
      }
    };

    selectAgent(newAgent.id);
    updateProjectData({ agents: [...allAgents, newAgent] });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        target?.isContentEditable;

      if (isTyping || event.metaKey || event.ctrlKey || event.altKey) return;

      if (event.key.toLowerCase() === 't') {
        event.preventDefault();
        handleCreateTask();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [allTasks, openTasks, projectData]);

  const handleTaskContentChange = (taskId: string, content: string) => {
    const firstLine = content.trim().split('\n')[0] || 'Untitled task';
    const updatedTasks = allTasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            title: firstLine.slice(0, 48),
            content,
            updatedAt: new Date()
          }
        : task
    );

    updateProjectData({ tasks: updatedTasks });
  };

  const handleDeleteTask = (taskId: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();

    updateProjectData({
      tasks: allTasks.filter((task) => task.id !== taskId)
    });
  };

  const handleTaskMouseDown = (task: Task, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setDraggingTask(task.id);
    setTaskDropTarget(null);

    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (canvasRect) {
      setDragOffset({
        x: e.clientX - canvasRect.left - task.position.x,
        y: e.clientY - canvasRect.top - task.position.y
      });
    }
  };

  useEffect(() => {
    if (!draggingTask) return;

    const handleMouseMove = (e: MouseEvent) => {
      const canvasRect = canvasRef.current?.getBoundingClientRect();
      if (!canvasRect) return;

      const newX = e.clientX - canvasRect.left - dragOffset.x;
      const newY = e.clientY - canvasRect.top - dragOffset.y;

      const updatedTasks = allTasks.map((task) =>
        task.id === draggingTask
          ? {
              ...task,
              position: {
                x: Math.max(0, Math.min(newX, canvasRect.width - 190)),
                y: Math.max(0, Math.min(newY, canvasRect.height - 150))
              },
              updatedAt: new Date()
            }
          : task
      );

      updateProjectData({ tasks: updatedTasks });

      const mouseX = e.clientX - canvasRect.left;
      const mouseY = e.clientY - canvasRect.top;
      const targetAgent = allAgents.find((agent) => {
        if (!agent.position) return false;

        return (
          mouseX >= agent.position.x &&
          mouseX <= agent.position.x + agentCardWidth &&
          mouseY >= agent.position.y &&
          mouseY <= agent.position.y + agentCardHeight
        );
      });

      setTaskDropTarget(targetAgent?.id ?? null);
    };

    const handleMouseUp = () => {
      if (taskDropTarget) {
        const updatedTasks = allTasks.map((task) =>
          task.id === draggingTask
            ? {
                ...task,
                status: 'queued' as const,
                assignedAgentId: taskDropTarget,
                updatedAt: new Date()
              }
            : task
        );

        updateProjectData({ tasks: updatedTasks });
      }

      setDraggingTask(null);
      setTaskDropTarget(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingTask, dragOffset, allTasks, allAgents, taskDropTarget, projectData]);

  const getAgentTasks = (agentId: string) => {
    return allTasks.filter((task) => task.assignedAgentId === agentId);
  };

  const handleUpdateAgent = (updatedAgent: Agent) => {
    const updatedAgents = allAgents.map((agent) =>
      agent.id === updatedAgent.id ? updatedAgent : agent
    );

    setSelectedConfigAgent(updatedAgent);
    updateProjectData({ agents: updatedAgents });
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const getConnections = () => {
    const visibleAgentIds = new Set(getVisibleAgents().map((agent) => agent.id));

    return allAgents.flatMap((agent) => {
      if (!agent.parentAgentId || !agent.position) return null;
      if (!visibleAgentIds.has(agent.id) || !visibleAgentIds.has(agent.parentAgentId)) return null;

      const parent = allAgents.find((a) => a.id === agent.parentAgentId);
      if (!parent || !parent.position) return null;

      // Calculate line from center of child to center of parent
      const childX = agent.position.x + 90; // Half of card width (180px)
      const childY = agent.position.y + 50; // Half of card height (100px)
      const parentX = parent.position.x + 90;
      const parentY = parent.position.y + 50;
      const midX = (childX + parentX) / 2;
      const midY = (childY + parentY) / 2;

      return [{ agent, childX, childY, parentX, parentY, midX, midY }];
    }).filter((connection) => connection !== null);
  };

  const renderConnections = () => {
    return getConnections().map((connection) => (
      <line
        key={`connection-${connection.agent.id}`}
        className={styles.connectionLine}
        x1={connection.childX}
        y1={connection.childY}
        x2={connection.parentX}
        y2={connection.parentY}
        markerEnd="url(#arrowhead)"
      />
    ));
  };

  const renderConnectionDetachButtons = () => {
    return getConnections().map((connection) => (
      <button
        key={`detach-${connection.agent.id}`}
        className={styles.connectionDetachButton}
        type="button"
        title="Detach connection"
        aria-label={`Detach ${connection.agent.name} from parent`}
        style={{
          left: connection.midX - 11,
          top: connection.midY - 11
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onClick={(e) => handleDetachAgent(connection.agent.id, e)}
      >
        <span />
      </button>
    ));
  };

  const getAgentCount = () => {
    return allAgents.filter((a) => a.type === 'agent').length;
  };

  const getVisibleAgents = () => {
    const filteredAgents = allAgents.filter((agent) => {
      if (agentStatusFilter === 'active') return agent.status === 'active';
      if (agentStatusFilter === 'inactive') return agent.status === 'inactive';
      return true;
    });

    return [...filteredAgents].sort((a, b) => {
      if (agentSortBy === 'name') return a.name.localeCompare(b.name);
      if (agentSortBy === 'status') return a.status.localeCompare(b.status);
      if (agentSortBy === 'created') return a.id.localeCompare(b.id);

      const ax = a.position?.x ?? 0;
      const ay = a.position?.y ?? 0;
      const bx = b.position?.x ?? 0;
      const by = b.position?.y ?? 0;
      return ay === by ? ax - bx : ay - by;
    });
  };

  const getSubAgentCount = () => {
    return allAgents.filter((a) => a.type === 'sub-agent').length;
  };

  const getTotalSkills = () => {
    return allAgents.reduce((total, agent) => total + (agent.skills?.length || 0), 0);
  };

  const getTotalMCPConnections = () => {
    const uniqueConnections = new Set<string>();
    allAgents.forEach(agent => {
      agent.mcpConnections?.forEach(mcp => uniqueConnections.add(mcp.type));
    });
    return uniqueConnections.size;
  };

  if (!project || !projectData) {
    return <div>Project not found</div>;
  }

  return (
    <div className={styles.projectView}>
      <div className={styles.toolbar}>
        <button className={styles.backButton} onClick={navigateBack}>
          <span>←</span>
          <span>Back</span>
        </button>
        <button className={styles.settingsButton} onClick={() => setShowSettings(true)}>
          <span>⚙️</span>
          <span>Project Settings</span>
        </button>
        <button className={styles.newTaskButton} onClick={handleCreateTask}>
          <span>+</span>
          <span>New Task (T)</span>
        </button>
        <div className={styles.breadcrumb}>
          <span>Desktop</span>
          {currentPath.map((pathItem, index) => (
            <span key={index}>
              <span className={styles.separator}>›</span>
              <span>{pathItem}</span>
            </span>
          ))}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.projectHeader}>
          <h1 className={styles.projectTitle}>{projectData.name}</h1>
          <div className={styles.projectMeta}>
            {getAgentCount()} agent{getAgentCount() !== 1 ? 's' : ''} •
            {getSubAgentCount()} sub-agent{getSubAgentCount() !== 1 ? 's' : ''} •
            {openTasks.length} open task{openTasks.length !== 1 ? 's' : ''} •
            {getTotalSkills()} skill{getTotalSkills() !== 1 ? 's' : ''} •
            {getTotalMCPConnections()} MCP tool{getTotalMCPConnections() !== 1 ? 's' : ''} •
            Modified {formatDate(projectData.modifiedAt)}
          </div>
        </div>

        {allAgents.length === 0 ? (
          <div className={styles.emptyState}>
            <p>This project has no agents yet.</p>
            <button onClick={handleCreateAgent}>
              + New Agent
            </button>
          </div>
        ) : (
          <div className={styles.canvasContainer}>
            <div className={styles.instructions}>
              <strong>Agentic Operating System:</strong> Click New Task to write a note, then drag the note tab onto an agent to queue it for execution. Drag one agent onto another to create parent-child relationships. Click the minus button on a connection line to detach it.
            </div>

            <div className={styles.canvas} ref={canvasRef}>
              {/* SVG overlay for connection lines */}
              <svg className={styles.connectionCanvas}>
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3, 0 6" fill="#2196F3" />
                  </marker>
                </defs>
                {renderConnections()}
              </svg>
              {renderConnectionDetachButtons()}

              {/* Agent cards */}
              {getVisibleAgents().map((agent) => {
                if (!agent.position) return null;

                const isDragging = draggingAgent === agent.id;
                const isSelected = selectedAgentId === agent.id;
                const isDropTarget = dropTarget === agent.id;
                const isTaskDropTarget = taskDropTarget === agent.id;
                const hasParent = !!agent.parentAgentId;
                const assignedTasks = getAgentTasks(agent.id);

                return (
                  <div
                    key={agent.id}
                    className={`${styles.agentCard} ${isSelected ? styles.selectedAgent : ''} ${isDragging ? styles.dragging : ''} ${isDropTarget ? styles.dropTarget : ''} ${isTaskDropTarget ? styles.taskDropTarget : ''} ${hasParent ? styles.hasParent : ''}`}
                    style={{
                      left: agent.position.x,
                      top: agent.position.y
                    }}
                    onMouseDown={(e) => handleAgentMouseDown(agent, e)}
                    onDoubleClick={() => handleAgentDoubleClick(agent)}
                  >
                    <div className={styles.agentIcon}>
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <rect x="8" y="8" width="16" height="16" fill="none" stroke="black" strokeWidth="2" />
                        <circle cx="16" cy="14" r="3" fill="black" />
                        <path d="M 12 20 Q 16 18 20 20" stroke="black" strokeWidth="2" fill="none" />
                      </svg>
                    </div>

                    <div className={styles.agentName}>{agent.name}</div>
                    <div className={styles.agentDescription}>{agent.description}</div>

                    <div className={styles.agentStatus}>
                      <div className={`${styles.statusDot} ${styles[agent.status]}`} />
                      <span>{agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}</span>
                    </div>

                    {assignedTasks.length > 0 && (
                      <div className={styles.taskQueue}>
                        <div className={styles.taskQueueLabel}>TASK QUEUE</div>
                        <div className={styles.taskQueueItems}>
                          {assignedTasks.map((task) => (
                            <div key={task.id} className={styles.queuedTask}>
                              <span className={styles.queuedTaskTitle}>{task.title}</span>
                              <button
                                className={styles.deleteQueuedTaskButton}
                                type="button"
                                title="Delete task"
                                aria-label={`Delete ${task.title}`}
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                                onClick={(e) => handleDeleteTask(task.id, e)}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {agent.type === 'agent' && (
                      <div className={styles.agentMetrics}>
                        {agent.skills && agent.skills.length > 0 && (
                          <div className={styles.metricItem}>
                            <span className={styles.metricIcon}>📄</span>
                            <span className={styles.metricText}>{agent.skills.length} skills</span>
                          </div>
                        )}
                        {agent.mcpConnections && agent.mcpConnections.length > 0 && (
                          <div className={styles.metricItem}>
                            <span className={styles.metricIcon}>🔌</span>
                            <span className={styles.metricText}>{agent.mcpConnections.length} tools</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Floating task notes */}
              {openTasks.map((task) => {
                const isDraggingTask = draggingTask === task.id;

                return (
                  <div
                    key={task.id}
                    className={`${styles.taskNote} ${isDraggingTask ? styles.taskDragging : ''}`}
                    style={{
                      left: task.position.x,
                      top: task.position.y
                    }}
                  >
                    <div className={styles.taskTab} onMouseDown={(e) => handleTaskMouseDown(task, e)}>
                      <span className={styles.taskPin} />
                      <span>{task.title}</span>
                      <button
                        className={styles.deleteTaskButton}
                        type="button"
                        title="Delete task"
                        aria-label={`Delete ${task.title}`}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onClick={(e) => handleDeleteTask(task.id, e)}
                      >
                        ×
                      </button>
                    </div>
                    <textarea
                      className={styles.taskTextarea}
                      value={task.content}
                      onChange={(e) => handleTaskContentChange(task.id, e.target.value)}
                      placeholder="Write the task, then drag this tab onto an agent."
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {selectedConfigAgent && (
        <AgentConfigWindow
          agent={selectedConfigAgent}
          onUpdateAgent={handleUpdateAgent}
          onClose={() => setSelectedConfigAgent(null)}
        />
      )}

      {showSettings && currentProjectId && (
        <ProjectSettingsWindow
          projectId={currentProjectId}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
};

export default ProjectView;
