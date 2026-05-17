export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface DesktopIcon {
  id: string;
  type: 'folder' | 'file' | 'trash';
  label: string;
  position: Position;
  isSelected: boolean;
  data?: ProjectData;
}

export interface ProjectConfig {
  harnessFile?: string;  // Path to HARNESS.md
  metadata?: {
    description: string;
    industry: string;
    teamSize: number;
    established: Date;
  };
  sharedMCPConnections?: MCPConnection[];
  environmentVariables?: Record<string, string>;
  agentRegistry?: {
    departments: string[];  // Agent IDs
    hierarchy: Record<string, string[]>;  // parentId -> childIds[]
  };
}

export interface ProjectData {
  name: string;
  agents: Agent[];
  tasks?: Task[];
  createdAt: Date;
  modifiedAt: Date;
  config?: ProjectConfig;
}

export interface Task {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'queued' | 'running' | 'done';
  position: Position;
  assignedAgentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  filePath: string; // Path to the skill markdown file (SOP)
}

export interface MCPConnection {
  id: string;
  name: string;
  type: 'gmail' | 'slack' | 'notion' | 'calendar' | 'salesforce' | 'jira' | 'github' | 'figma' | 'other';
  status: 'connected' | 'disconnected' | 'error';
  description: string;
}

export interface MemoryEntry {
  date: Date;
  category: 'preference' | 'correction' | 'pattern' | 'contact';
  content: string;
}

export interface Agent {
  id: string;
  name: string;
  type: 'agent' | 'sub-agent';
  status: 'active' | 'inactive' | 'error';
  description: string;
  parentAgentId?: string; // Only for sub-agents
  position?: Position; // Position in project view
  config?: AgentConfig;
  documentation?: string;
  prd?: string; // Product Requirements Document
  skills?: Skill[]; // Available skills (SOPs)
  mcpConnections?: MCPConnection[]; // Tool integrations
  memory?: MemoryEntry[]; // Persistent memory entries
  subAgents?: SubAgent[]; // Legacy nested canvas support
  claudeFile?: string; // Path to CLAUDE.md
  memoryFile?: string; // Path to MEMORY.md
}

export interface SubAgent extends Agent {
  position: Position;
  connections?: string[];
}

export interface AgentConfig {
  model: string;
  maxTokens: number;
  temperature: number;
  contextWindow: {
    total: number;
    used: number;
    remaining: number;
  };
  lastUpdated: Date;
}

export interface FileContent {
  path: string;
  content: string;
  lastModified: Date;
}
