# {Company Name} - Project Configuration

## Project Metadata
- **Industry**: Technology / Healthcare / Finance / etc.
- **Team Size**: X employees
- **Established**: YYYY-MM-DD
- **Description**: Brief company description

## Shared MCP Server Connections
### Gmail Integration
- **Server**: @modelcontextprotocol/server-gmail
- **Purpose**: Company-wide email access
- **Status**: Connected
- **Config Path**: ~/.config/mcp/gmail.json

### Slack Integration
- **Server**: @modelcontextprotocol/server-slack
- **Purpose**: Team communication
- **Status**: Connected
- **Workspace**: company-workspace

### Notion Integration
- **Server**: @modelcontextprotocol/server-notion
- **Purpose**: Documentation and project management
- **Status**: Connected

## Global Environment Variables
```env
COMPANY_API_ENDPOINT=https://api.company.com
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
DATABASE_URL=postgresql://...
```

## Agent Registry
### Departments (Main Agents)
1. **Marketing Department** (`dept-marketing`)
   - CLAUDE.md: `/Company/Marketing/CLAUDE.md`
   - MEMORY.md: `/Company/Marketing/MEMORY.md`
   - Sub-agents: Content Writer, SEO Specialist, Analytics Manager

2. **Executive Assistant** (`dept-exec-assistant`)
   - CLAUDE.md: `/Company/Executive_Assistant/CLAUDE.md`
   - MEMORY.md: `/Company/Executive_Assistant/MEMORY.md`
   - Sub-agents: Calendar Manager, Email Handler

3. **Sales Department** (`dept-sales`)
   - CLAUDE.md: `/Company/Sales/CLAUDE.md`
   - MEMORY.md: `/Company/Sales/MEMORY.md`
   - Sub-agents: Lead Qualifier, Proposal Writer

## Organizational Hierarchy
```
Company Name
├── Marketing Department
│   ├── Content Writer
│   ├── SEO Specialist
│   └── Analytics Manager
├── Executive Assistant
│   ├── Calendar Manager
│   └── Email Handler
└── Sales Department
    ├── Lead Qualifier
    └── Proposal Writer
```

## Harness Integration
This file defines the project-level configuration for the Agentic Operating System. All department agents inherit the shared MCP connections and can access global environment variables.
