import { ProjectData, DesktopIcon } from '../types/desktop';

export const mockProjects: ProjectData[] = [
  {
    name: 'Acme Corp',
    createdAt: new Date('2024-01-01'),
    modifiedAt: new Date('2024-05-02'),
    agents: [
      // ========================================
      // MARKETING DEPARTMENT AGENT (Parent)
      // ========================================
      {
        id: 'dept-marketing',
        name: 'Marketing Department',
        type: 'agent',
        status: 'active',
        description: 'Campaign planning, content creation, and analytics',
        position: { x: 50, y: 80 },
        claudeFile: '/Acme_Corp/Marketing/CLAUDE.md',
        memoryFile: '/Acme_Corp/Marketing/MEMORY.md',
        skills: [
          {
            id: 'skill-create-proposal',
            name: 'Create Proposal',
            description: 'Creates marketing campaign proposals with ROI analysis',
            filePath: '/Marketing/.claude/skills/create_proposal.md'
          },
          {
            id: 'skill-schedule-campaign',
            name: 'Schedule Campaign',
            description: 'Plans and schedules multi-channel marketing campaigns',
            filePath: '/Marketing/.claude/skills/schedule_campaign.md'
          },
          {
            id: 'skill-analyze-metrics',
            name: 'Analyze Metrics',
            description: 'Analyzes campaign performance and generates reports',
            filePath: '/Marketing/.claude/skills/analyze_metrics.md'
          },
          {
            id: 'skill-draft-email',
            name: 'Draft Email',
            description: 'Creates marketing email copy following brand guidelines',
            filePath: '/Marketing/.claude/skills/draft_email.md'
          },
          {
            id: 'skill-research-competitors',
            name: 'Research Competitors',
            description: 'Conducts competitive analysis and market research',
            filePath: '/Marketing/.claude/skills/research_competitors.md'
          }
        ],
        mcpConnections: [
          {
            id: 'mcp-gmail',
            name: 'Gmail',
            type: 'gmail',
            status: 'connected',
            description: 'Send campaign emails and manage correspondence'
          },
          {
            id: 'mcp-notion',
            name: 'Notion',
            type: 'notion',
            status: 'connected',
            description: 'Update campaign tracker and content calendar'
          },
          {
            id: 'mcp-slack',
            name: 'Slack',
            type: 'slack',
            status: 'connected',
            description: 'Team coordination and notifications'
          },
          {
            id: 'mcp-analytics',
            name: 'Google Analytics',
            type: 'other',
            status: 'connected',
            description: 'Track website and campaign performance'
          }
        ],
        memory: [
          {
            date: new Date('2024-03-15'),
            category: 'preference',
            content: 'CEO prefers data-heavy proposals with competitor comparisons'
          },
          {
            date: new Date('2024-03-20'),
            category: 'correction',
            content: 'Avoid using "growth hacking" term - executive team dislikes it'
          },
          {
            date: new Date('2024-04-01'),
            category: 'pattern',
            content: 'Email campaigns perform best on Tuesday mornings at 10 AM EST'
          },
          {
            date: new Date('2024-04-10'),
            category: 'correction',
            content: 'Budget proposals must include 15% contingency buffer'
          },
          {
            date: new Date('2024-04-20'),
            category: 'pattern',
            content: 'Proposals with visual mockups get approved 40% faster'
          },
          {
            date: new Date('2024-04-25'),
            category: 'contact',
            content: 'Sarah (CMO) - approves budgets over $10k, prefers Slack for urgent matters'
          }
        ],
        config: {
          model: 'claude-opus-4-6',
          maxTokens: 4096,
          temperature: 0.7,
          contextWindow: {
            total: 200000,
            used: 58000,
            remaining: 142000
          },
          lastUpdated: new Date('2024-05-02')
        },
        documentation: `# Marketing Department Agent

## Role
You are the Marketing Department agent for Acme Corp. You manage campaigns, create content, and analyze performance metrics.

## Context Engineering
- **CLAUDE.md**: Located at /Marketing/CLAUDE.md
- **Memory**: Persistent memory at /Marketing/MEMORY.md
- **Skills**: Reusable SOPs in /Marketing/.claude/skills/

## Capabilities
- Campaign planning and execution
- Content creation (blog posts, emails, social media)
- Performance analytics and reporting
- SEO optimization
- Competitor analysis

## MCP Tool Connections
- **Gmail**: Send campaign emails via @modelcontextprotocol/server-gmail
- **Notion**: Update campaign tracker and content calendar
- **Slack**: Team coordination and notifications
- **Google Analytics**: Performance tracking

## Workflow Patterns
1. Check MEMORY.md for past learnings before starting
2. Use skills for standard operations (SOPs)
3. Coordinate with Executive_Assistant for scheduling
4. Update memory when learning corrections or preferences

## Brand Voice
- Professional yet approachable
- Data-driven and confident
- Clear bullet points over lengthy prose`,
        prd: `# Marketing Department PRD

## Mission
Drive customer acquisition and brand awareness through data-driven campaigns and compelling content.

## Goals
- Increase qualified leads by 40% in Q2 2024
- Launch 2 major campaigns per quarter
- Maintain 85%+ email open rate
- Grow social media engagement by 25%

## Key Responsibilities
1. **Campaign Management**
   - Plan multi-channel campaigns
   - Coordinate with design and sales teams
   - Track ROI and adjust strategy

2. **Content Creation**
   - Blog posts (2 per week)
   - Email newsletters (weekly)
   - Social media posts (daily)
   - Case studies and whitepapers

3. **Analytics & Reporting**
   - Weekly performance dashboards
   - Monthly executive reports
   - A/B testing and optimization

## Success Metrics
- Lead conversion rate > 15%
- Campaign ROI > 300%
- Content engagement > 5% CTR
- Customer acquisition cost < $500

## Skills (SOPs) Available
- create_proposal.md
- schedule_campaign.md
- analyze_metrics.md
- draft_email.md
- research_competitors.md`
      },

      // Marketing Sub-Agents (Children)
      {
        id: 'marketing-content',
        name: 'Content Writer',
        type: 'sub-agent',
        status: 'active',
        description: 'Creates blog posts, whitepapers, and marketing copy',
        parentAgentId: 'dept-marketing',
        position: { x: 50, y: 240 },
        config: {
          model: 'claude-sonnet-4-6',
          maxTokens: 3072,
          temperature: 0.8,
          contextWindow: {
            total: 200000,
            used: 32000,
            remaining: 168000
          },
          lastUpdated: new Date('2024-05-02')
        },
        documentation: `# Content Writer Sub-Agent

Specializes in creating engaging marketing content.

## Skills
- write_blog_post.md
- create_whitepaper.md
- draft_case_study.md

## Style Guidelines
- SEO-optimized headlines
- Hook readers in first paragraph
- Include data and statistics
- End with clear CTA`
      },
      {
        id: 'marketing-seo',
        name: 'SEO Specialist',
        type: 'sub-agent',
        status: 'active',
        description: 'Keyword research, on-page optimization, and ranking analysis',
        parentAgentId: 'dept-marketing',
        position: { x: 240, y: 240 },
        config: {
          model: 'claude-sonnet-4-6',
          maxTokens: 2048,
          temperature: 0.4,
          contextWindow: {
            total: 200000,
            used: 18000,
            remaining: 182000
          },
          lastUpdated: new Date('2024-05-01')
        },
        documentation: `# SEO Specialist Sub-Agent

Optimizes content for search engines.

## Skills
- keyword_research.md
- optimize_page.md
- analyze_rankings.md

## Tools
- Google Search Console
- SEMrush API
- Ahrefs integration`
      },
      {
        id: 'marketing-analytics',
        name: 'Analytics Manager',
        type: 'sub-agent',
        status: 'active',
        description: 'Tracks campaign performance and generates reports',
        parentAgentId: 'dept-marketing',
        position: { x: 430, y: 240 },
        config: {
          model: 'claude-opus-4-6',
          maxTokens: 4096,
          temperature: 0.3,
          contextWindow: {
            total: 200000,
            used: 45000,
            remaining: 155000
          },
          lastUpdated: new Date('2024-05-02')
        },
        documentation: `# Analytics Manager Sub-Agent

Measures and reports on marketing performance.

## Skills
- create_dashboard.md
- analyze_campaign.md
- generate_report.md

## Metrics Tracked
- Lead generation
- Conversion rates
- Email performance
- Social engagement
- ROI calculations`
      },

      // ========================================
      // EXECUTIVE ASSISTANT AGENT (Parent)
      // ========================================
      {
        id: 'dept-exec-assistant',
        name: 'Executive Assistant',
        type: 'agent',
        status: 'active',
        description: 'Scheduling, email management, and coordination',
        position: { x: 320, y: 80 },
        claudeFile: '/Acme_Corp/Executive_Assistant/CLAUDE.md',
        memoryFile: '/Acme_Corp/Executive_Assistant/MEMORY.md',
        skills: [
          {
            id: 'skill-schedule-meeting',
            name: 'Schedule Meeting',
            description: 'Finds optimal time slots and schedules meetings across time zones',
            filePath: '/Executive_Assistant/.claude/skills/schedule_meeting.md'
          },
          {
            id: 'skill-draft-email-ea',
            name: 'Draft Email',
            description: 'Composes professional emails following executive voice',
            filePath: '/Executive_Assistant/.claude/skills/draft_email.md'
          },
          {
            id: 'skill-triage-inbox',
            name: 'Triage Inbox',
            description: 'Prioritizes emails and flags urgent items',
            filePath: '/Executive_Assistant/.claude/skills/triage_inbox.md'
          },
          {
            id: 'skill-book-travel',
            name: 'Book Travel',
            description: 'Coordinates flights, hotels, and ground transportation',
            filePath: '/Executive_Assistant/.claude/skills/book_travel.md'
          },
          {
            id: 'skill-prepare-agenda',
            name: 'Prepare Agenda',
            description: 'Creates structured meeting agendas with background materials',
            filePath: '/Executive_Assistant/.claude/skills/prepare_agenda.md'
          }
        ],
        mcpConnections: [
          {
            id: 'mcp-gmail-ea',
            name: 'Gmail',
            type: 'gmail',
            status: 'connected',
            description: 'Email management and drafting'
          },
          {
            id: 'mcp-calendar',
            name: 'Google Calendar',
            type: 'calendar',
            status: 'connected',
            description: 'Schedule meetings and manage calendar'
          },
          {
            id: 'mcp-slack-ea',
            name: 'Slack',
            type: 'slack',
            status: 'connected',
            description: 'Real-time team communication'
          },
          {
            id: 'mcp-notion-ea',
            name: 'Notion',
            type: 'notion',
            status: 'connected',
            description: 'Task tracking and note management'
          }
        ],
        memory: [
          {
            date: new Date('2024-02-10'),
            category: 'preference',
            content: 'CEO prefers no meetings before 9 AM or after 5 PM'
          },
          {
            date: new Date('2024-03-05'),
            category: 'pattern',
            content: 'Always buffer 15 minutes between meetings for transition time'
          },
          {
            date: new Date('2024-03-18'),
            category: 'preference',
            content: 'Thursday afternoons blocked for deep work - no meetings'
          },
          {
            date: new Date('2024-04-02'),
            category: 'contact',
            content: 'John (Board Chair) - highest priority, respond within 1 hour'
          },
          {
            date: new Date('2024-04-15'),
            category: 'pattern',
            content: 'CEO prefers Slack for urgent matters, email for non-urgent'
          },
          {
            date: new Date('2024-04-22'),
            category: 'correction',
            content: 'Always CC executive assistant on calendar invites for tracking'
          }
        ],
        config: {
          model: 'claude-opus-4-6',
          maxTokens: 3072,
          temperature: 0.5,
          contextWindow: {
            total: 200000,
            used: 42000,
            remaining: 158000
          },
          lastUpdated: new Date('2024-05-02')
        },
        documentation: `# Executive Assistant Agent

## Role
You are the Executive Assistant agent for Acme Corp. You manage calendars, coordinate meetings, handle emails, and ensure smooth operations.

## Context Engineering
- **CLAUDE.md**: Located at /Executive_Assistant/CLAUDE.md
- **Memory**: Executive preferences at /Executive_Assistant/MEMORY.md
- **Skills**: Calendar and email SOPs in /.claude/skills/

## Capabilities
- Calendar management and meeting scheduling
- Email triage and response drafting
- Travel coordination
- Document preparation
- Cross-department coordination

## MCP Tool Connections
- **Gmail**: Email management and sending
- **Google Calendar**: Schedule meetings and events
- **Slack**: Real-time team communication
- **Notion**: Task tracking and notes

## Workflow Patterns
1. Check executive's calendar before scheduling
2. Prioritize emails using learned preferences
3. Coordinate with department agents for meetings
4. Update MEMORY.md with new preferences

## Communication Style
- Professional and concise
- Anticipates needs proactively
- Clear action items and deadlines`,
        prd: `# Executive Assistant PRD

## Mission
Maximize executive productivity through proactive scheduling, communication management, and seamless coordination.

## Goals
- Reduce executive email load by 60%
- Schedule meetings with 95% accuracy (no conflicts)
- Response time < 2 hours for urgent requests
- Zero missed deadlines or appointments

## Key Responsibilities
1. **Calendar Management**
   - Schedule meetings across time zones
   - Buffer time for focused work
   - Coordinate with multiple stakeholders

2. **Email Management**
   - Triage inbox (urgent/important/delegate)
   - Draft responses for approval
   - Follow up on pending items

3. **Coordination**
   - Book travel and accommodations
   - Prepare meeting agendas
   - Track action items from meetings

## Success Metrics
- Executive satisfaction score > 9/10
- Meeting preparation lead time > 24 hours
- Email response rate 100%
- Calendar optimization score > 85%

## Skills (SOPs) Available
- schedule_meeting.md
- draft_email.md
- triage_inbox.md
- book_travel.md
- prepare_agenda.md`
      },

      // Executive Assistant Sub-Agents
      {
        id: 'ea-calendar',
        name: 'Calendar Manager',
        type: 'sub-agent',
        status: 'active',
        description: 'Manages schedules, meetings, and time blocking',
        parentAgentId: 'dept-exec-assistant',
        position: { x: 270, y: 240 },
        config: {
          model: 'claude-sonnet-4-6',
          maxTokens: 2048,
          temperature: 0.3,
          contextWindow: {
            total: 200000,
            used: 22000,
            remaining: 178000
          },
          lastUpdated: new Date('2024-05-02')
        },
        documentation: `# Calendar Manager Sub-Agent

Optimizes executive calendar and schedules meetings.

## Skills
- schedule_meeting.md
- find_time_slot.md
- block_focus_time.md

## Rules
- No meetings before 9 AM or after 5 PM
- Buffer 15 min between meetings
- Protect Thu afternoons for deep work`
      },
      {
        id: 'ea-email',
        name: 'Email Handler',
        type: 'sub-agent',
        status: 'active',
        description: 'Triages emails and drafts responses',
        parentAgentId: 'dept-exec-assistant',
        position: { x: 460, y: 240 },
        config: {
          model: 'claude-opus-4-6',
          maxTokens: 3072,
          temperature: 0.6,
          contextWindow: {
            total: 200000,
            used: 35000,
            remaining: 165000
          },
          lastUpdated: new Date('2024-05-02')
        },
        documentation: `# Email Handler Sub-Agent

Manages inbox and drafts professional responses.

## Skills
- triage_email.md
- draft_response.md
- follow_up.md

## Priorities
- Urgent: Board members, investors
- High: Customer escalations
- Medium: Team requests
- Low: Newsletters, FYIs`
      },

      // ========================================
      // SALES DEPARTMENT AGENT (Parent)
      // ========================================
      {
        id: 'dept-sales',
        name: 'Sales Department',
        type: 'agent',
        status: 'active',
        description: 'Lead management, proposals, and deal closing',
        position: { x: 590, y: 80 },
        claudeFile: '/Acme_Corp/Sales/CLAUDE.md',
        memoryFile: '/Acme_Corp/Sales/MEMORY.md',
        skills: [
          {
            id: 'skill-qualify-lead',
            name: 'Qualify Lead',
            description: 'Evaluates leads using BANT framework and assigns priority scores',
            filePath: '/Sales/.claude/skills/qualify_lead.md'
          },
          {
            id: 'skill-create-proposal-sales',
            name: 'Create Proposal',
            description: 'Generates customized sales proposals with pricing and ROI',
            filePath: '/Sales/.claude/skills/create_proposal.md'
          },
          {
            id: 'skill-calculate-roi',
            name: 'Calculate ROI',
            description: 'Builds ROI models showing value proposition to prospects',
            filePath: '/Sales/.claude/skills/calculate_roi.md'
          },
          {
            id: 'skill-handle-objection',
            name: 'Handle Objection',
            description: 'Provides responses to common sales objections',
            filePath: '/Sales/.claude/skills/handle_objection.md'
          },
          {
            id: 'skill-negotiate-contract',
            name: 'Negotiate Contract',
            description: 'Guides contract negotiation with win-win strategies',
            filePath: '/Sales/.claude/skills/negotiate_contract.md'
          }
        ],
        mcpConnections: [
          {
            id: 'mcp-gmail-sales',
            name: 'Gmail',
            type: 'gmail',
            status: 'connected',
            description: 'Prospect outreach and follow-ups'
          },
          {
            id: 'mcp-salesforce',
            name: 'Salesforce',
            type: 'salesforce',
            status: 'connected',
            description: 'CRM data management and pipeline tracking'
          },
          {
            id: 'mcp-slack-sales',
            name: 'Slack',
            type: 'slack',
            status: 'connected',
            description: 'Sales team coordination'
          },
          {
            id: 'mcp-docusign',
            name: 'DocuSign',
            type: 'other',
            status: 'connected',
            description: 'Contract signing and document management'
          }
        ],
        memory: [
          {
            date: new Date('2024-03-08'),
            category: 'pattern',
            content: 'Enterprise deals (>$100K) require C-level approval - involve CEO early'
          },
          {
            date: new Date('2024-03-22'),
            category: 'preference',
            content: 'Always customize proposals by industry - avoid generic templates'
          },
          {
            date: new Date('2024-04-05'),
            category: 'pattern',
            content: 'Healthcare prospects require HIPAA compliance section in proposals'
          },
          {
            date: new Date('2024-04-12'),
            category: 'correction',
            content: 'Standard payment terms are Net-30, not Net-45 (updated policy)'
          },
          {
            date: new Date('2024-04-18'),
            category: 'contact',
            content: 'Lisa (Legal) - reviews all contracts before signing, 2-day turnaround'
          },
          {
            date: new Date('2024-04-28'),
            category: 'pattern',
            content: 'Mid-market deals close fastest with monthly vs annual pricing option'
          }
        ],
        config: {
          model: 'claude-opus-4-6',
          maxTokens: 4096,
          temperature: 0.6,
          contextWindow: {
            total: 200000,
            used: 52000,
            remaining: 148000
          },
          lastUpdated: new Date('2024-05-02')
        },
        documentation: `# Sales Department Agent

## Role
You are the Sales Department agent for Acme Corp. You manage leads, create proposals, and drive revenue growth.

## Context Engineering
- **CLAUDE.md**: Located at /Sales/CLAUDE.md
- **Memory**: Deal history at /Sales/MEMORY.md
- **Skills**: Sales playbooks in /.claude/skills/

## Capabilities
- Lead qualification and scoring
- Proposal creation and customization
- CRM management (Salesforce/HubSpot)
- Deal pipeline tracking
- Customer objection handling

## MCP Tool Connections
- **Gmail**: Outreach and follow-ups
- **Salesforce**: CRM data management
- **DocuSign**: Contract signing
- **Slack**: Sales team coordination

## Workflow Patterns
1. Qualify leads using BANT framework
2. Check MEMORY.md for similar past deals
3. Customize proposals based on industry
4. Coordinate with Marketing for collateral

## Sales Voice
- Consultative and value-focused
- Addresses pain points directly
- Data-driven ROI calculations`,
        prd: `# Sales Department PRD

## Mission
Drive revenue growth through strategic lead management, compelling proposals, and exceptional customer relationships.

## Goals
- Close $5M in new business Q2 2024
- Maintain 35% win rate on proposals
- Average deal size > $50K
- Sales cycle < 45 days

## Key Responsibilities
1. **Lead Management**
   - Qualify inbound leads (BANT)
   - Nurture prospects through pipeline
   - Score leads for prioritization

2. **Proposal Development**
   - Create customized proposals
   - Calculate ROI for prospects
   - Address objections proactively

3. **Deal Closing**
   - Negotiate contracts
   - Coordinate with legal and finance
   - Ensure smooth handoff to customer success

## Success Metrics
- Monthly recurring revenue (MRR) growth > 15%
- Proposal acceptance rate > 35%
- Lead response time < 1 hour
- Customer satisfaction score > 8.5/10

## Skills (SOPs) Available
- qualify_lead.md
- create_proposal.md
- calculate_roi.md
- handle_objection.md
- negotiate_contract.md`
      },

      // Sales Sub-Agents
      {
        id: 'sales-lead-qualifier',
        name: 'Lead Qualifier',
        type: 'sub-agent',
        status: 'active',
        description: 'Scores and qualifies inbound leads using BANT',
        parentAgentId: 'dept-sales',
        position: { x: 540, y: 240 },
        config: {
          model: 'claude-sonnet-4-6',
          maxTokens: 2048,
          temperature: 0.4,
          contextWindow: {
            total: 200000,
            used: 15000,
            remaining: 185000
          },
          lastUpdated: new Date('2024-05-01')
        },
        documentation: `# Lead Qualifier Sub-Agent

Evaluates and scores leads for sales prioritization.

## Skills
- qualify_lead.md
- score_lead.md
- route_lead.md

## BANT Framework
- Budget: >$25K
- Authority: C-level or VP
- Need: Identified pain point
- Timeline: <90 days`
      },
      {
        id: 'sales-proposal',
        name: 'Proposal Writer',
        type: 'sub-agent',
        status: 'active',
        description: 'Creates customized sales proposals and ROI calculations',
        parentAgentId: 'dept-sales',
        position: { x: 730, y: 240 },
        config: {
          model: 'claude-opus-4-6',
          maxTokens: 4096,
          temperature: 0.7,
          contextWindow: {
            total: 200000,
            used: 48000,
            remaining: 152000
          },
          lastUpdated: new Date('2024-05-02')
        },
        documentation: `# Proposal Writer Sub-Agent

Crafts winning proposals with compelling ROI.

## Skills
- create_proposal.md
- calculate_roi.md
- customize_pricing.md

## Proposal Structure
1. Executive Summary
2. Pain Points & Solutions
3. Implementation Plan
4. ROI Analysis
5. Pricing & Terms
6. Next Steps`
      }
    ],
    config: {
      harnessFile: '/Acme_Corp/HARNESS.md',
      metadata: {
        description: 'Full-service B2B software company specializing in enterprise solutions',
        industry: 'Technology',
        teamSize: 150,
        established: new Date('2020-01-15')
      },
      sharedMCPConnections: [
        {
          id: 'project-mcp-gmail',
          name: 'Gmail (Company-wide)',
          type: 'gmail',
          status: 'connected',
          description: 'Shared email access for all departments'
        },
        {
          id: 'project-mcp-slack',
          name: 'Slack (Company-wide)',
          type: 'slack',
          status: 'connected',
          description: 'Company-wide team communication and collaboration'
        },
        {
          id: 'project-mcp-notion',
          name: 'Notion (Company-wide)',
          type: 'notion',
          status: 'connected',
          description: 'Centralized documentation and knowledge base'
        },
        {
          id: 'project-mcp-salesforce',
          name: 'Salesforce (Company-wide)',
          type: 'salesforce',
          status: 'connected',
          description: 'Central CRM for customer data management'
        },
        {
          id: 'project-mcp-calendar',
          name: 'Google Calendar (Company-wide)',
          type: 'calendar',
          status: 'connected',
          description: 'Company calendar and scheduling system'
        },
        {
          id: 'project-mcp-github',
          name: 'GitHub (Company-wide)',
          type: 'github',
          status: 'connected',
          description: 'Source code repository and version control'
        }
      ],
      environmentVariables: {
        'COMPANY_API_ENDPOINT': 'https://api.acmecorp.com',
        'SLACK_WORKSPACE': 'acme-corp',
        'NOTION_WORKSPACE_ID': 'acme-corp-workspace',
        'SALESFORCE_INSTANCE': 'acme.salesforce.com'
      },
      agentRegistry: {
        departments: ['dept-marketing', 'dept-exec-assistant', 'dept-sales'],
        hierarchy: {
          'dept-marketing': ['marketing-content', 'marketing-seo', 'marketing-analytics'],
          'dept-exec-assistant': ['ea-calendar', 'ea-email'],
          'dept-sales': ['sales-lead-qualifier', 'sales-proposal']
        }
      }
    }
  },

  // ========================================
  // SECOND COMPANY EXAMPLE
  // ========================================
  {
    name: 'TechStart Inc',
    createdAt: new Date('2024-02-15'),
    modifiedAt: new Date('2024-05-01'),
    agents: [
      {
        id: 'techstart-product',
        name: 'Product Department',
        type: 'agent',
        status: 'active',
        description: 'Product roadmap, feature specs, and user research',
        position: { x: 50, y: 80 },
        config: {
          model: 'claude-opus-4-6',
          maxTokens: 4096,
          temperature: 0.6,
          contextWindow: {
            total: 200000,
            used: 62000,
            remaining: 138000
          },
          lastUpdated: new Date('2024-05-01')
        },
        documentation: `# Product Department Agent

Manages product strategy, roadmap, and feature development.

## Capabilities
- Product roadmap planning
- User story creation
- Feature prioritization
- User research synthesis
- Competitive analysis

## MCP Tools
- Jira: Ticket management
- Figma: Design review
- Notion: Documentation
- Slack: Team communication`,
        prd: `# Product Department PRD

## Mission
Build products users love through data-driven decisions and exceptional user experience.

## Goals
- Ship 3 major features per quarter
- User satisfaction score > 4.5/5
- Feature adoption rate > 60%
- Zero critical bugs in production

## Skills Available
- create_user_story.md
- prioritize_backlog.md
- analyze_metrics.md
- conduct_research.md`
      },
      {
        id: 'techstart-engineering',
        name: 'Engineering Department',
        type: 'agent',
        status: 'active',
        description: 'Code review, deployment, and technical architecture',
        position: { x: 320, y: 80 },
        config: {
          model: 'claude-opus-4-6',
          maxTokens: 4096,
          temperature: 0.4,
          contextWindow: {
            total: 200000,
            used: 72000,
            remaining: 128000
          },
          lastUpdated: new Date('2024-05-01')
        },
        documentation: `# Engineering Department Agent

Develops and maintains the technical infrastructure.

## Capabilities
- Code review and quality assurance
- CI/CD pipeline management
- Architecture decisions
- Performance optimization
- Security audits

## MCP Tools
- GitHub: Code repository
- Datadog: Monitoring
- PagerDuty: On-call management`,
        prd: `# Engineering Department PRD

## Mission
Deliver reliable, scalable, and maintainable software with best-in-class engineering practices.

## Goals
- 99.9% uptime
- Deploy 20+ times per week
- Code coverage > 80%
- P95 response time < 200ms

## Skills Available
- review_code.md
- deploy_service.md
- debug_issue.md
- optimize_performance.md`
      }
    ],
    config: {
      harnessFile: '/TechStart_Inc/HARNESS.md',
      metadata: {
        description: 'Fast-growing startup building innovative SaaS products',
        industry: 'Technology',
        teamSize: 45,
        established: new Date('2023-06-01')
      },
      sharedMCPConnections: [
        {
          id: 'techstart-github',
          name: 'GitHub',
          type: 'github',
          status: 'connected',
          description: 'Code repository and CI/CD workflows'
        },
        {
          id: 'techstart-jira',
          name: 'Jira',
          type: 'jira',
          status: 'connected',
          description: 'Project management and issue tracking'
        },
        {
          id: 'techstart-figma',
          name: 'Figma',
          type: 'figma',
          status: 'connected',
          description: 'Design collaboration and prototyping'
        },
        {
          id: 'techstart-slack',
          name: 'Slack',
          type: 'slack',
          status: 'connected',
          description: 'Team communication'
        },
        {
          id: 'techstart-notion',
          name: 'Notion',
          type: 'notion',
          status: 'connected',
          description: 'Documentation and wikis'
        }
      ],
      environmentVariables: {
        'API_ENDPOINT': 'https://api.techstart.io',
        'STAGING_URL': 'https://staging.techstart.io',
        'PRODUCTION_URL': 'https://techstart.io',
        'JIRA_PROJECT_KEY': 'TECH'
      },
      agentRegistry: {
        departments: ['techstart-product', 'techstart-engineering'],
        hierarchy: {}
      }
    }
  },

  // ========================================
  // AGENCY EXAMPLE
  // ========================================
  {
    name: 'Creative Agency Co',
    createdAt: new Date('2024-03-01'),
    modifiedAt: new Date('2024-04-30'),
    agents: [
      {
        id: 'agency-creative',
        name: 'Creative Department',
        type: 'agent',
        status: 'active',
        description: 'Brand strategy, design, and creative direction',
        position: { x: 50, y: 80 },
        config: {
          model: 'claude-opus-4-6',
          maxTokens: 4096,
          temperature: 0.9,
          contextWindow: {
            total: 200000,
            used: 38000,
            remaining: 162000
          },
          lastUpdated: new Date('2024-04-30')
        },
        documentation: `# Creative Department Agent

Develops brand identities and creative campaigns.

## Capabilities
- Brand strategy and positioning
- Visual identity design
- Campaign creative direction
- Copy and messaging
- Client presentations

## MCP Tools
- Figma: Design collaboration
- Notion: Creative briefs
- Dropbox: Asset management`,
        prd: `# Creative Department PRD

## Mission
Create memorable brand experiences that drive business results.

## Goals
- Win 5 new clients per quarter
- Client retention rate > 90%
- Campaign success rate > 80%
- Portfolio award nominations

## Skills Available
- create_brand_strategy.md
- design_identity.md
- pitch_campaign.md
- present_concepts.md`
      },
      {
        id: 'agency-accounts',
        name: 'Account Management',
        type: 'agent',
        status: 'active',
        description: 'Client relationships, project management, and delivery',
        position: { x: 320, y: 80 },
        config: {
          model: 'claude-sonnet-4-6',
          maxTokens: 3072,
          temperature: 0.6,
          contextWindow: {
            total: 200000,
            used: 28000,
            remaining: 172000
          },
          lastUpdated: new Date('2024-04-30')
        },
        documentation: `# Account Management Agent

Manages client relationships and project delivery.

## Capabilities
- Client communication
- Project timeline management
- Budget tracking
- Stakeholder coordination
- Deliverable quality assurance

## MCP Tools
- Gmail: Client communication
- Asana: Project management
- Harvest: Time tracking`,
        prd: `# Account Management PRD

## Mission
Ensure exceptional client experiences through proactive communication and flawless project execution.

## Goals
- Client satisfaction > 9/10
- Projects delivered on time > 95%
- Budget variance < 5%
- Upsell rate > 30%

## Skills Available
- onboard_client.md
- manage_timeline.md
- status_report.md
- resolve_issue.md`
      }
    ],
    config: {
      harnessFile: '/Creative_Agency_Co/HARNESS.md',
      metadata: {
        description: 'Award-winning creative agency delivering exceptional brand experiences',
        industry: 'Creative Services',
        teamSize: 28,
        established: new Date('2021-09-15')
      },
      sharedMCPConnections: [
        {
          id: 'agency-figma',
          name: 'Figma',
          type: 'figma',
          status: 'connected',
          description: 'Design collaboration and client presentations'
        },
        {
          id: 'agency-notion',
          name: 'Notion',
          type: 'notion',
          status: 'connected',
          description: 'Creative briefs and project documentation'
        },
        {
          id: 'agency-gmail',
          name: 'Gmail',
          type: 'gmail',
          status: 'connected',
          description: 'Client communication'
        },
        {
          id: 'agency-slack',
          name: 'Slack',
          type: 'slack',
          status: 'connected',
          description: 'Internal team coordination'
        }
      ],
      environmentVariables: {
        'AGENCY_WEBSITE': 'https://creativeagency.co',
        'CLIENT_PORTAL': 'https://portal.creativeagency.co',
        'FIGMA_TEAM_ID': 'creative-agency-team'
      },
      agentRegistry: {
        departments: ['agency-creative', 'agency-accounts'],
        hierarchy: {}
      }
    }
  }
];

export const mockDesktopIcons: DesktopIcon[] = [
  {
    id: 'company-1',
    type: 'folder',
    label: 'Acme Corp',
    position: { x: 20, y: 40 },
    isSelected: false,
    data: mockProjects[0]
  },
  {
    id: 'company-2',
    type: 'folder',
    label: 'TechStart Inc',
    position: { x: 20, y: 140 },
    isSelected: false,
    data: mockProjects[1]
  },
  {
    id: 'company-3',
    type: 'folder',
    label: 'Creative Agency Co',
    position: { x: 20, y: 240 },
    isSelected: false,
    data: mockProjects[2]
  }
];
