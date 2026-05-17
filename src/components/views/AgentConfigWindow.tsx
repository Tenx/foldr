import type { Agent } from '../../types/desktop';
import styles from './AgentConfigWindow.module.css';

interface AgentConfigWindowProps {
  agent: Agent;
  onClose: () => void;
  onUpdateAgent: (agent: Agent) => void;
}

const MODEL_OPTIONS = [
  { value: 'claude-opus-4-6', label: 'Claude Opus 4.6 (Most Capable)' },
  { value: 'claude-sonnet-4-6', label: 'Claude Sonnet 4.6 (Balanced)' },
  { value: 'claude-haiku-4-5', label: 'Claude Haiku 4.5 (Fast)' },
  { value: 'gpt-5.5', label: 'GPT-5.5 (Frontier)' },
  { value: 'gpt-5.4', label: 'GPT-5.4 (Balanced)' },
  { value: 'gpt-5.4-mini', label: 'GPT-5.4 Mini (Fast)' }
];

const AgentConfigWindow = ({ agent, onClose, onUpdateAgent }: AgentConfigWindowProps) => {
  const config = agent.config;

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const getContextPercentage = () => {
    if (!config) return 0;
    return (config.contextWindow.used / config.contextWindow.total) * 100;
  };

  const getContextStatus = () => {
    const percentage = getContextPercentage();
    if (percentage > 90) return 'danger';
    if (percentage > 70) return 'warning';
    return 'normal';
  };

  const getMCPStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return '#4CAF50';
      case 'disconnected': return '#999';
      case 'error': return '#F44336';
      default: return '#999';
    }
  };

  // Simulate context consumption breakdown
  const getContextBreakdown = () => {
    if (!config) return [];

    const systemPrompt = 4200;
    const claudeFile = 1800;
    const memoryFile = 680;
    const skills = (agent.skills?.length || 0) * 150;
    const mcpTools = 120;
    const conversationHistory = config.contextWindow.used - systemPrompt - claudeFile - memoryFile - skills - mcpTools;

    return [
      { label: 'System Prompt', tokens: systemPrompt, color: '#9C27B0' },
      { label: 'CLAUDE.md', tokens: claudeFile, color: '#2196F3' },
      { label: 'MEMORY.md', tokens: memoryFile, color: '#FF9800' },
      { label: 'Skills (SOPs)', tokens: skills, color: '#4CAF50' },
      { label: 'MCP Tools', tokens: mcpTools, color: '#00BCD4' },
      { label: 'Conversation', tokens: Math.max(0, conversationHistory), color: '#E91E63' },
    ].filter(item => item.tokens > 0);
  };

  const contextBreakdown = getContextBreakdown();

  const renderDocumentation = () => {
    if (!agent.documentation) {
      return (
        <div className={styles.noDocumentation}>
          No documentation available for this agent.
        </div>
      );
    }

    // Simple markdown-like rendering
    const lines = agent.documentation.split('\n');
    const html = lines.map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index}>{line.substring(2)}</h1>;
      } else if (line.startsWith('## ')) {
        return <h2 key={index}>{line.substring(3)}</h2>;
      } else if (line.startsWith('- ')) {
        return <li key={index}>{line.substring(2)}</li>;
      } else if (line.trim() === '') {
        return <br key={index} />;
      } else {
        return <p key={index}>{line}</p>;
      }
    });

    return <div className={styles.documentation}>{html}</div>;
  };

  const handleModelChange = (model: string) => {
    if (!config) return;

    handleConfigChange({ model });
  };

  const handleAgentChange = (updates: Partial<Agent>) => {
    onUpdateAgent({
      ...agent,
      ...updates
    });
  };

  const handleConfigChange = (updates: Partial<NonNullable<Agent['config']>>) => {
    if (!config) return;

    onUpdateAgent({
      ...agent,
      config: {
        ...config,
        ...updates
      }
    });
  };

  return (
    <div className={styles.configWindow}>
      <div className={styles.titleBar}>
        <div className={styles.closeButton} onClick={onClose} />
        <div className={styles.title}>{agent.name} - Configuration</div>
        <div className={styles.saveStatus}>Auto-saved</div>
      </div>

      <div className={styles.splitLayout}>
        {/* LEFT PANEL - Configuration */}
        <div className={styles.leftPanel}>
          <div className={styles.content}>
            {/* Agent Details */}
            <div className={styles.section}>
              <div className={styles.sectionTitle}>
                Agent Details
                <span className={`${styles.badge} ${agent.type === 'agent' ? styles.agent : styles.subagent}`}>
                  {agent.type === 'agent' ? 'Agent' : 'Sub-Agent'}
                </span>
              </div>
              <div className={styles.autosaveNote}>
                Changes save automatically on this device.
              </div>

              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="agent-name">Name</label>
                <input
                  id="agent-name"
                  className={styles.input}
                  value={agent.name}
                  onChange={(event) => handleAgentChange({ name: event.target.value })}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="agent-description">Description</label>
                <textarea
                  id="agent-description"
                  className={styles.textarea}
                  value={agent.description}
                  onChange={(event) => handleAgentChange({ description: event.target.value })}
                  rows={3}
                />
              </div>

              <div className={styles.fieldGrid}>
                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="agent-type">Type</label>
                  <select
                    id="agent-type"
                    className={styles.select}
                    value={agent.type}
                    onChange={(event) => handleAgentChange({ type: event.target.value as Agent['type'] })}
                  >
                    <option value="agent">Agent</option>
                    <option value="sub-agent">Sub-Agent</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="agent-status">Status</label>
                  <select
                    id="agent-status"
                    className={styles.select}
                    value={agent.status}
                    onChange={(event) => handleAgentChange({ status: event.target.value as Agent['status'] })}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="error">Error</option>
                  </select>
                </div>
              </div>

              {agent.claudeFile && (
                <div className={styles.field}>
                  <span className={styles.fieldLabel}>CLAUDE.md Path</span>
                  <div className={styles.fieldValue}>{agent.claudeFile}</div>
                </div>
              )}

              {agent.memoryFile && (
                <div className={styles.field}>
                  <span className={styles.fieldLabel}>MEMORY.md Path</span>
                  <div className={styles.fieldValue}>{agent.memoryFile}</div>
                </div>
              )}

              {agent.parentAgentId && (
                <div className={styles.parentInfo}>
                  <strong>Parent Agent:</strong>
                  <span>{agent.parentAgentId}</span>
                </div>
              )}
            </div>

            {/* Skills Section */}
            {agent.skills && agent.skills.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionTitle}>
                  Skills (SOPs)
                  <span className={styles.countBadge}>{agent.skills.length}</span>
                </div>
                <div className={styles.skillsList}>
                  {agent.skills.map((skill) => (
                    <div key={skill.id} className={styles.skillItem}>
                      <div className={styles.skillIcon}>📄</div>
                      <div className={styles.skillInfo}>
                        <div className={styles.skillName}>{skill.name}</div>
                        <div className={styles.skillDescription}>{skill.description}</div>
                        <div className={styles.skillPath}>{skill.filePath}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MCP Connections Section */}
            {agent.mcpConnections && agent.mcpConnections.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionTitle}>
                  MCP Tool Connections
                  <span className={styles.countBadge}>{agent.mcpConnections.length}</span>
                </div>
                <div className={styles.mcpList}>
                  {agent.mcpConnections.map((mcp) => (
                    <div key={mcp.id} className={styles.mcpItem}>
                      <div
                        className={styles.mcpStatusDot}
                        style={{ backgroundColor: getMCPStatusColor(mcp.status) }}
                      />
                      <div className={styles.mcpInfo}>
                        <div className={styles.mcpName}>
                          {mcp.name}
                          <span className={styles.mcpType}>{mcp.type}</span>
                        </div>
                        <div className={styles.mcpDescription}>{mcp.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Memory Section */}
            {agent.memory && agent.memory.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionTitle}>
                  Persistent Memory
                  <span className={styles.countBadge}>{agent.memory.length} entries</span>
                </div>
                <div className={styles.memoryList}>
                  {agent.memory.map((entry, index) => (
                    <div key={index} className={styles.memoryItem}>
                      <div className={styles.memoryHeader}>
                        <span className={`${styles.memoryCategory} ${styles[entry.category]}`}>
                          {entry.category}
                        </span>
                        <span className={styles.memoryDate}>
                          {entry.date.toLocaleDateString()}
                        </span>
                      </div>
                      <div className={styles.memoryContent}>{entry.content}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Model Configuration */}
            {config && (
              <div className={styles.section}>
                <div className={styles.sectionTitle}>Model Configuration</div>

                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Model</label>
                  <select
                    className={styles.select}
                    value={config.model}
                    onChange={(event) => handleModelChange(event.target.value)}
                  >
                    {MODEL_OPTIONS.map((model) => (
                      <option key={model.value} value={model.value}>
                        {model.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Max Tokens</label>
                  <input
                    className={styles.input}
                    type="number"
                    min="1"
                    step="256"
                    value={config.maxTokens}
                    onChange={(event) => handleConfigChange({
                      maxTokens: Math.max(1, Number(event.target.value) || 1)
                    })}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Temperature</label>
                  <input
                    className={styles.input}
                    type="number"
                    min="0"
                    max="2"
                    step="0.1"
                    value={config.temperature}
                    onChange={(event) => handleConfigChange({
                      temperature: Math.min(2, Math.max(0, Number(event.target.value) || 0))
                    })}
                  />
                </div>

              </div>
            )}

            {/* Documentation */}
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Documentation</div>
              {renderDocumentation()}
            </div>

          </div>
        </div>

        {/* RIGHT PANEL - Real-time Context Monitor */}
        <div className={styles.rightPanel}>
          <div className={styles.contextMonitorPanel}>
            <div className={styles.panelHeader}>
              <h3 className={styles.panelTitle}>Real-time Context Monitor</h3>
              <span className={styles.liveIndicator}>● LIVE</span>
            </div>

            {config && (
              <>
                {/* Overall Usage */}
                <div className={styles.overallUsage}>
                  <div className={styles.usageStats}>
                    <div className={styles.statLarge}>
                      <div className={styles.statValue}>{getContextPercentage().toFixed(1)}%</div>
                      <div className={styles.statLabel}>Context Used</div>
                    </div>
                    <div className={styles.statSmall}>
                      <div className={styles.statValue}>{formatNumber(config.contextWindow.remaining)}</div>
                      <div className={styles.statLabel}>Tokens Remaining</div>
                    </div>
                  </div>

                  <div className={styles.usageBar}>
                    <div
                      className={`${styles.usageFill} ${styles[getContextStatus()]}`}
                      style={{ width: `${getContextPercentage()}%` }}
                    />
                  </div>

                  <div className={styles.usageDetails}>
                    <span>{formatNumber(config.contextWindow.used)} used</span>
                    <span>{formatNumber(config.contextWindow.total)} total</span>
                  </div>
                </div>

                {/* Context Breakdown */}
                <div className={styles.breakdownSection}>
                  <h4 className={styles.breakdownTitle}>Context Breakdown</h4>

                  <div className={styles.breakdownList}>
                    {contextBreakdown.map((item, index) => {
                      const percentage = (item.tokens / config.contextWindow.total) * 100;
                      return (
                        <div key={index} className={styles.breakdownItem}>
                          <div className={styles.breakdownHeader}>
                            <span className={styles.breakdownLabel}>
                              <span
                                className={styles.breakdownDot}
                                style={{ backgroundColor: item.color }}
                              />
                              {item.label}
                            </span>
                            <span className={styles.breakdownTokens}>
                              {formatNumber(item.tokens)}
                            </span>
                          </div>
                          <div className={styles.breakdownBar}>
                            <div
                              className={styles.breakdownFill}
                              style={{
                                width: `${percentage}%`,
                                backgroundColor: item.color
                              }}
                            />
                          </div>
                          <div className={styles.breakdownPercent}>
                            {percentage.toFixed(1)}%
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Real-time Activity Log */}
                <div className={styles.activityLog}>
                  <h4 className={styles.breakdownTitle}>Recent Activity</h4>
                  <div className={styles.logEntries}>
                    <div className={styles.logEntry}>
                      <span className={styles.logTime}>10:32:15</span>
                      <span className={styles.logMessage}>Loaded CLAUDE.md (+1,800 tokens)</span>
                    </div>
                    <div className={styles.logEntry}>
                      <span className={styles.logTime}>10:32:16</span>
                      <span className={styles.logMessage}>Loaded MEMORY.md (+680 tokens)</span>
                    </div>
                    <div className={styles.logEntry}>
                      <span className={styles.logTime}>10:32:18</span>
                      <span className={styles.logMessage}>Loaded 5 skills (+750 tokens)</span>
                    </div>
                    <div className={styles.logEntry}>
                      <span className={styles.logTime}>10:32:20</span>
                      <span className={styles.logMessage}>MCP tools registered (+120 tokens)</span>
                    </div>
                    <div className={styles.logEntry}>
                      <span className={styles.logTime}>10:35:42</span>
                      <span className={styles.logMessage}>User message received (+325 tokens)</span>
                    </div>
                    <div className={styles.logEntry}>
                      <span className={styles.logTime}>10:35:55</span>
                      <span className={styles.logMessage}>Agent response generated (+892 tokens)</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentConfigWindow;
