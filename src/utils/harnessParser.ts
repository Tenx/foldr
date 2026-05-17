import { ProjectData, ProjectConfig } from '../types/desktop';

/**
 * Generate HARNESS.md content from ProjectData
 */
export const generateHarnessContent = (project: ProjectData): string => {
  const config = project.config;
  const metadata = config?.metadata;
  const sharedMCP = config?.sharedMCPConnections || [];
  const envVars = config?.environmentVariables || {};
  const agents = project.agents;

  // Get department agents (not sub-agents)
  const departments = agents.filter(a => a.type === 'agent');

  // Build hierarchy
  const hierarchy: Record<string, string[]> = {};
  agents.forEach(agent => {
    if (agent.parentAgentId) {
      if (!hierarchy[agent.parentAgentId]) {
        hierarchy[agent.parentAgentId] = [];
      }
      hierarchy[agent.parentAgentId].push(agent.name);
    }
  });

  let content = `# ${project.name} - Project Configuration\n\n`;

  // Metadata section
  content += `## Project Metadata\n`;
  content += `- **Industry**: ${metadata?.industry || 'Not specified'}\n`;
  content += `- **Team Size**: ${metadata?.teamSize || 'Not specified'} employees\n`;
  content += `- **Established**: ${metadata?.established?.toISOString().split('T')[0] || 'Not specified'}\n`;
  content += `- **Description**: ${metadata?.description || 'Not specified'}\n\n`;

  // Shared MCP Connections
  content += `## Shared MCP Server Connections\n`;
  if (sharedMCP.length > 0) {
    sharedMCP.forEach(mcp => {
      content += `### ${mcp.name}\n`;
      content += `- **Type**: ${mcp.type}\n`;
      content += `- **Purpose**: ${mcp.description}\n`;
      content += `- **Status**: ${mcp.status}\n\n`;
    });
  } else {
    content += `No shared MCP connections configured.\n\n`;
  }

  // Environment Variables
  content += `## Global Environment Variables\n`;
  if (Object.keys(envVars).length > 0) {
    content += '```env\n';
    Object.entries(envVars).forEach(([key, value]) => {
      content += `${key}=${value}\n`;
    });
    content += '```\n\n';
  } else {
    content += 'No environment variables configured.\n\n';
  }

  // Agent Registry
  content += `## Agent Registry\n`;
  content += `### Departments (Main Agents)\n`;
  departments.forEach((dept, index) => {
    content += `${index + 1}. **${dept.name}** (\`${dept.id}\`)\n`;
    if (dept.claudeFile) {
      content += `   - CLAUDE.md: \`${dept.claudeFile}\`\n`;
    }
    if (dept.memoryFile) {
      content += `   - MEMORY.md: \`${dept.memoryFile}\`\n`;
    }
    if (hierarchy[dept.id]) {
      content += `   - Sub-agents: ${hierarchy[dept.id].join(', ')}\n`;
    }
    content += '\n';
  });

  // Organizational Hierarchy
  content += `## Organizational Hierarchy\n`;
  content += '```\n';
  content += `${project.name}\n`;
  departments.forEach((dept, deptIndex) => {
    const isLast = deptIndex === departments.length - 1;
    const prefix = isLast ? '└──' : '├──';
    content += `${prefix} ${dept.name}\n`;

    if (hierarchy[dept.id]) {
      hierarchy[dept.id].forEach((subAgent, subIndex) => {
        const subPrefix = isLast ? '    ' : '│   ';
        const subConnector = subIndex === hierarchy[dept.id].length - 1 ? '└──' : '├──';
        content += `${subPrefix}${subConnector} ${subAgent}\n`;
      });
    }
  });
  content += '```\n\n';

  // Footer
  content += `## Harness Integration\n`;
  content += `This file defines the project-level configuration for the Agentic Operating System. `;
  content += `All department agents inherit the shared MCP connections and can access global environment variables.\n`;

  return content;
};

/**
 * Parse HARNESS.md content into ProjectConfig
 * This is a basic parser - can be enhanced for more complex scenarios
 */
export const parseHarnessMarkdown = (content: string): Partial<ProjectConfig> => {
  const config: Partial<ProjectConfig> = {
    metadata: {
      description: '',
      industry: '',
      teamSize: 0,
      established: new Date()
    },
    sharedMCPConnections: [],
    environmentVariables: {},
    agentRegistry: {
      departments: [],
      hierarchy: {}
    }
  };

  // Parse metadata section
  const metadataMatch = content.match(/## Project Metadata\s+([\s\S]*?)(?=##|$)/);
  if (metadataMatch) {
    const metadataSection = metadataMatch[1];

    const industryMatch = metadataSection.match(/\*\*Industry\*\*:\s*(.+)/);
    if (industryMatch && config.metadata) {
      config.metadata.industry = industryMatch[1].trim();
    }

    const teamSizeMatch = metadataSection.match(/\*\*Team Size\*\*:\s*(\d+)/);
    if (teamSizeMatch && config.metadata) {
      config.metadata.teamSize = parseInt(teamSizeMatch[1], 10);
    }

    const establishedMatch = metadataSection.match(/\*\*Established\*\*:\s*(\d{4}-\d{2}-\d{2})/);
    if (establishedMatch && config.metadata) {
      config.metadata.established = new Date(establishedMatch[1]);
    }

    const descriptionMatch = metadataSection.match(/\*\*Description\*\*:\s*(.+)/);
    if (descriptionMatch && config.metadata) {
      config.metadata.description = descriptionMatch[1].trim();
    }
  }

  // Parse environment variables
  const envVarsMatch = content.match(/## Global Environment Variables\s+```env\s+([\s\S]*?)```/);
  if (envVarsMatch && config.environmentVariables) {
    const envLines = envVarsMatch[1].trim().split('\n');
    envLines.forEach(line => {
      const [key, value] = line.split('=');
      if (key && value && config.environmentVariables) {
        config.environmentVariables[key.trim()] = value.trim();
      }
    });
  }

  // Parse agent registry (department IDs)
  const agentRegistryMatch = content.match(/### Departments \(Main Agents\)\s+([\s\S]*?)(?=##|$)/);
  if (agentRegistryMatch && config.agentRegistry) {
    const registrySection = agentRegistryMatch[1];
    const deptMatches = registrySection.matchAll(/\d+\.\s+\*\*[^*]+\*\*\s+\(`([^`]+)`\)/g);
    for (const match of deptMatches) {
      config.agentRegistry.departments.push(match[1]);
    }
  }

  return config;
};
