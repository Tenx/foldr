import { ProjectData } from '../../../types/desktop';
import styles from './ProjectInfoPanel.module.css';

interface ProjectInfoPanelProps {
  project: ProjectData;
  onOpenSettings: () => void;
}

const ProjectInfoPanel = ({ project, onOpenSettings }: ProjectInfoPanelProps) => {
  const config = project.config;
  const metadata = config?.metadata;

  // Calculate stats
  const agentCount = project.agents.filter(a => a.type === 'agent').length;
  const subAgentCount = project.agents.filter(a => a.type === 'sub-agent').length;
  const totalSkills = project.agents.reduce((sum, agent) => sum + (agent.skills?.length || 0), 0);
  const totalMCPTools = (config?.sharedMCPConnections?.length || 0);

  return (
    <div className={styles.infoPanel}>
      <div className={styles.header}>
        Project Info
      </div>

      <div className={styles.content}>
        <div className={styles.projectName}>
          {project.name}
        </div>

        {metadata && (
          <div className={styles.metadata}>
            <div className={styles.metadataItem}>
              <span className={styles.metadataLabel}>Industry:</span>
              <span className={styles.metadataValue}>{metadata.industry}</span>
            </div>
            <div className={styles.metadataItem}>
              <span className={styles.metadataLabel}>Team Size:</span>
              <span className={styles.metadataValue}>{metadata.teamSize}</span>
            </div>
            <div className={styles.metadataItem}>
              <span className={styles.metadataLabel}>Established:</span>
              <span className={styles.metadataValue}>
                {metadata.established.getFullYear()}
              </span>
            </div>
          </div>
        )}

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Agents</span>
            <span className={styles.statValue}>{agentCount}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Sub-Agents</span>
            <span className={styles.statValue}>{subAgentCount}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Total Skills</span>
            <span className={styles.statValue}>{totalSkills}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Shared MCP Tools</span>
            <span className={styles.statValue}>{totalMCPTools}</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.settingsButton} onClick={onOpenSettings}>
            <span className={styles.icon}>⚙️</span>
            <span>Project Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfoPanel;
