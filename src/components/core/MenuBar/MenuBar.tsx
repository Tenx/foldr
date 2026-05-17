import { useState } from 'react';
import { useNavigationStore } from '../../../store/navigationStore';
import { useDesktopStore } from '../../../store/desktopStore';
import type { Agent, DesktopIcon, ProjectData } from '../../../types/desktop';
import ProjectSettingsWindow from '../../views/ProjectSettingsWindow';
import styles from './MenuBar.module.css';
import MenuItem from './MenuItem';

interface MenuItemData {
  label: string;
  items: Array<{
    label?: string;
    action?: () => void;
    disabled?: boolean;
    separator?: boolean;
  }>;
}

const MenuBar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showProjectSettings, setShowProjectSettings] = useState<string | null>(null);
  const currentPath = useNavigationStore((state) => state.currentPath);
  const currentProjectId = useNavigationStore((state) => state.currentProjectId);
  const selectedAgentId = useNavigationStore((state) => state.selectedAgentId);
  const selectAgent = useNavigationStore((state) => state.selectAgent);
  const navigateBack = useNavigationStore((state) => state.navigateBack);
  const navigateToProject = useNavigationStore((state) => state.navigateToProject);
  const setAgentStatusFilter = useNavigationStore((state) => state.setAgentStatusFilter);
  const setAgentSortBy = useNavigationStore((state) => state.setAgentSortBy);
  const icons = useDesktopStore((state) => state.icons);
  const setIcons = useDesktopStore((state) => state.setIcons);
  const updateIcon = useDesktopStore((state) => state.updateIcon);

  const isInsideProject = currentPath.length > 0;
  const currentProject = icons.find((icon) => icon.id === currentProjectId);
  const selectedProjectIcon = icons.find((icon) => icon.isSelected && icon.type === 'folder' && icon.data);
  const selectedAgent = currentProject?.data?.agents.find((agent) => agent.id === selectedAgentId);

  const updateProjectAgents = (agents: Agent[]) => {
    if (!currentProjectId || !currentProject?.data) return;

    updateIcon(currentProjectId, {
      ...currentProject,
      data: {
        ...currentProject.data,
        agents,
        modifiedAt: new Date()
      }
    });
  };

  const createProject = () => {
    const now = new Date();
    const projectNumber = icons.filter((icon) => icon.type === 'folder').length + 1;
    const projectData: ProjectData = {
      name: `Project ${projectNumber}`,
      agents: [],
      tasks: [],
      createdAt: now,
      modifiedAt: now,
      config: {
        metadata: {
          description: 'New Foldr project',
          industry: 'General',
          teamSize: 1,
          established: now
        },
        sharedMCPConnections: [],
        environmentVariables: {},
        agentRegistry: {
          departments: [],
          hierarchy: {}
        }
      }
    };
    const newIcon: DesktopIcon = {
      id: `project-${now.getTime()}`,
      type: 'folder',
      label: projectData.name,
      position: {
        x: 20,
        y: 40 + projectNumber * 110
      },
      isSelected: true,
      data: projectData
    };

    setIcons([
      ...icons.map((icon) => ({ ...icon, isSelected: false })),
      newIcon
    ]);
  };

  const openSelectedProject = () => {
    if (!selectedProjectIcon?.data) return;
    navigateToProject(selectedProjectIcon.id, selectedProjectIcon.label);
  };

  const createAgent = () => {
    if (!currentProject?.data) return;

    const now = new Date();
    const newAgent: Agent = {
      id: `agent-${now.getTime()}`,
      name: `Agent ${currentProject.data.agents.length + 1}`,
      type: 'agent',
      status: 'inactive',
      description: 'New agent',
      position: {
        x: 80 + (currentProject.data.agents.length % 3) * 220,
        y: 100 + (Math.floor(currentProject.data.agents.length / 3) % 2) * 180
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

    updateProjectAgents([...currentProject.data.agents, newAgent]);
    selectAgent(newAgent.id);
  };

  const updateSelectedAgent = (updates: Partial<Agent>) => {
    if (!selectedAgentId || !currentProject?.data) return;

    updateProjectAgents(
      currentProject.data.agents.map((agent) =>
        agent.id === selectedAgentId ? { ...agent, ...updates } : agent
      )
    );
  };

  const duplicateSelectedAgent = () => {
    if (!selectedAgent || !currentProject?.data) return;

    const duplicate: Agent = {
      ...selectedAgent,
      id: `${selectedAgent.id}-copy-${Date.now()}`,
      name: `${selectedAgent.name} Copy`,
      parentAgentId: undefined,
      type: 'agent',
      position: selectedAgent.position
        ? { x: selectedAgent.position.x + 32, y: selectedAgent.position.y + 32 }
        : undefined
    };

    updateProjectAgents([...currentProject.data.agents, duplicate]);
    selectAgent(duplicate.id);
  };

  const deleteSelectedAgent = () => {
    if (!selectedAgentId || !currentProject?.data) return;

    updateProjectAgents(
      currentProject.data.agents
        .filter((agent) => agent.id !== selectedAgentId)
        .map((agent) =>
          agent.parentAgentId === selectedAgentId
            ? { ...agent, parentAgentId: undefined, type: 'agent' as const }
            : agent
        )
    );
    selectAgent(null);
  };

  const baseMenus: MenuItemData[] = [
    {
      label: '⌘',
      items: [
        { label: 'About Foldr...', disabled: true },
        { separator: true },
        { label: 'Help & Tutorial', disabled: true }
      ]
    },
    {
      label: 'Project',
      items: [
        { label: 'New Project...', action: createProject },
        { label: 'Open Project', action: openSelectedProject, disabled: !selectedProjectIcon },
        { separator: true },
        { label: 'Close Project', disabled: true },
        {
          label: 'Project Settings...',
          action: () => {
            if (selectedProjectIcon) setShowProjectSettings(selectedProjectIcon.id);
          },
          disabled: !selectedProjectIcon
        },
        { separator: true },
        { label: 'Quit', disabled: true }
      ]
    },
    {
      label: 'Agent',
      items: [
        { label: 'New Agent...', action: createAgent },
        { label: 'Duplicate Agent', action: duplicateSelectedAgent, disabled: !selectedAgent },
        { separator: true },
        { label: 'Start Agent', action: () => updateSelectedAgent({ status: 'active' }), disabled: !selectedAgent },
        { label: 'Stop Agent', action: () => updateSelectedAgent({ status: 'inactive' }), disabled: !selectedAgent },
        { label: 'Restart Agent', action: () => updateSelectedAgent({ status: 'active' }), disabled: !selectedAgent },
        { separator: true },
        { label: 'Delete Agent', action: deleteSelectedAgent, disabled: !selectedAgent }
      ]
    },
    {
      label: 'View',
      items: [
        { label: 'Show All Agents', action: () => setAgentStatusFilter('all'), disabled: !isInsideProject },
        { label: 'Show Active Only', action: () => setAgentStatusFilter('active'), disabled: !isInsideProject },
        { label: 'Show Inactive Only', action: () => setAgentStatusFilter('inactive'), disabled: !isInsideProject },
        { separator: true },
        { label: 'Sort by Name', action: () => setAgentSortBy('name'), disabled: !isInsideProject },
        { label: 'Sort by Status', action: () => setAgentSortBy('status'), disabled: !isInsideProject },
        { label: 'Sort by Created Date', action: () => setAgentSortBy('created'), disabled: !isInsideProject }
      ]
    },
    {
      label: 'Window',
      items: [
        { label: 'Minimize All', disabled: true },
        { label: 'Bring All to Front', disabled: true },
        { separator: true },
        { label: 'Tile Windows', disabled: true }
      ]
    }
  ];

  const menus = isInsideProject
    ? baseMenus.filter((menu) => menu.label !== 'Project')
    : baseMenus.filter((menu) => menu.label !== 'Agent');
  const commandMenu = menus.find((menu) => menu.label === '⌘');
  const remainingMenus = menus.filter((menu) => menu.label !== '⌘');

  const handleMenuClick = (label: string) => {
    setActiveMenu(activeMenu === label ? null : label);
  };

  const handleCloseMenu = () => {
    setActiveMenu(null);
  };

  return (
    <>
      {activeMenu && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={handleCloseMenu}
        />
      )}
      <div className={styles.menuBar} id="menuBar">
        {commandMenu && (
          <MenuItem
            menu={commandMenu}
            isActive={activeMenu === commandMenu.label}
            onMenuClick={handleMenuClick}
            onClose={handleCloseMenu}
          />
        )}
        <div className={styles.logo} aria-label="Foldr">
          Foldr
        </div>
        {isInsideProject && (
          <button className={styles.backButton} onClick={navigateBack}>
            ← Back
          </button>
        )}
        {remainingMenus.map((menu) => (
          <MenuItem
            key={menu.label}
            menu={menu}
            isActive={activeMenu === menu.label}
            onMenuClick={handleMenuClick}
            onClose={handleCloseMenu}
          />
        ))}
      </div>
      {showProjectSettings && (
        <ProjectSettingsWindow
          projectId={showProjectSettings}
          onClose={() => setShowProjectSettings(null)}
        />
      )}
    </>
  );
};

export default MenuBar;
