# Quick Start Guide - Agentic Operating System

## 🚀 Getting Started in 60 Seconds

### 1. Launch the Application
```bash
npm run dev
```
Open browser to: **http://localhost:3000**

### 2. See the Desktop
You'll see three company folders:
- 📁 **Acme Corp** - Full-featured example with 3 departments
- 📁 **TechStart Inc** - Tech company with Product & Engineering
- 📁 **Creative Agency Co** - Agency with Creative & Account Management

### 3. Open Acme Corp
**Double-click** the "Acme Corp" folder icon

### 4. Explore the Department Agents
You'll see a canvas with three main department agents:

**Marketing Department** (left)
- Has 3 sub-agents: Content Writer, SEO Specialist, Analytics Manager
- Blue arrows connect children to parent
- Shows "📄 5 skills" and "🔌 4 tools"

**Executive Assistant** (center)
- Has 2 sub-agents: Calendar Manager, Email Handler
- Shows "📄 5 skills" and "🔌 4 tools"

**Sales Department** (right)
- Has 2 sub-agents: Lead Qualifier, Proposal Writer
- Shows "📄 5 skills" and "🔌 4 tools"

### 5. Click on Marketing Department
A configuration window opens showing:

**8 Sections to Explore:**
1. ✅ **Status** - Agent type, description, file paths
2. 📄 **Skills (SOPs)** - 5 reusable standard operating procedures
3. 🔌 **MCP Tool Connections** - Gmail, Notion, Slack, Analytics
4. 🧠 **Persistent Memory** - 6 learned preferences and patterns
5. ⚙️ **Model Configuration** - Claude Opus 4.6, tokens, temperature
6. 📊 **Context Window Monitor** - 29% used (58K / 200K tokens)
7. 📖 **Documentation** - Full agent documentation
8. 📋 **PRD** - Product requirements document

### 6. Try Drag-and-Drop
- **Drag** the "Chart Generator" agent
- **Drop** it onto "Marketing Department"
- Watch:
  - ✨ Blue arrow appears connecting them
  - 🎯 Chart Generator moves near Marketing
  - ↑ Blue arrow indicator appears on Chart Generator

---

## 💡 Key Concepts

### What is an Agentic Operating System?
A system where **departments are autonomous AI agents** that:
- Have their own **context** (CLAUDE.md)
- Maintain **persistent memory** (MEMORY.md)
- Use **skills** (SOPs as markdown files)
- Connect to **tools** via MCP (Gmail, Slack, Notion, etc.)
- Can have **sub-agents** for specialized tasks

### Department Structure
```
Company (Acme Corp)
├── Department Agent (Marketing)
│   ├── CLAUDE.md (role & instructions)
│   ├── MEMORY.md (learned preferences)
│   ├── Skills/ (SOPs)
│   │   ├── create_proposal.md
│   │   ├── schedule_campaign.md
│   │   └── ...
│   └── Sub-Agents
│       ├── Content Writer
│       ├── SEO Specialist
│       └── Analytics Manager
```

---

## 🎯 Common Tasks

### View Agent Details
**Goal:** See all information about an agent

1. Click any agent card
2. Scroll through the configuration window
3. See skills, tools, memory, config
4. Click X to close

### Create Parent-Child Relationship
**Goal:** Make one agent a sub-agent of another

1. Click and hold on agent card (e.g., "Chart Generator")
2. Drag to target agent (e.g., "Marketing Department")
3. Target agent gets green border when hovering
4. Release mouse
5. Blue arrow appears, child moves near parent

### Understand Agent Capabilities
**Goal:** Know what an agent can do

1. Click agent card
2. Look at **Skills (SOPs)** section
3. See all available operations (e.g., "Create Proposal")
4. Each skill shows:
   - Name
   - Description
   - File path

### Check Tool Integrations
**Goal:** See what external tools the agent uses

1. Click agent card
2. Look at **MCP Tool Connections** section
3. See status (🟢 connected, ⚪ disconnected, 🔴 error)
4. See tool description

### Review Learned Patterns
**Goal:** See what the agent has learned over time

1. Click agent card
2. Look at **Persistent Memory** section
3. Memory is categorized:
   - 🔵 **PREFERENCE** - User/executive preferences
   - 🟠 **CORRECTION** - Mistakes to avoid
   - 🟢 **PATTERN** - Successful workflows
   - 🟣 **CONTACT** - Key people & how to reach them

### Monitor Context Usage
**Goal:** Check if agent is running out of context

1. Click agent card
2. Look at **Context Window Monitor** section
3. See usage bar:
   - 🟢 Green (0-70%) - Plenty of room
   - 🟡 Orange (70-90%) - Getting full
   - 🔴 Red (90-100%) - Nearly full
4. Total capacity: 200,000 tokens

---

## 📊 Example Workflows

### Marketing Campaign Creation

**Scenario:** Marketing department needs to create a new campaign proposal

**Steps the agent would take:**
1. Check **MEMORY.md** for past learnings
   - "CEO prefers data-heavy proposals"
   - "Proposals with competitor analysis get approved faster"
2. Use **"Create Proposal" skill** (SOP)
3. Connect to **Notion** via MCP to check content calendar
4. Connect to **Google Analytics** to get current metrics
5. Generate proposal following learned patterns
6. Send via **Gmail** MCP connection
7. Update **MEMORY.md** with outcome

### Executive Meeting Scheduling

**Scenario:** Executive Assistant needs to schedule a board meeting

**Steps the agent would take:**
1. Check **MEMORY.md** for preferences
   - "CEO prefers no meetings before 9 AM"
   - "Thursday afternoons blocked for deep work"
2. Use **"Schedule Meeting" skill** (SOP)
3. Connect to **Google Calendar** via MCP to find available slots
4. Send invites via **Gmail** MCP
5. Notify team via **Slack** MCP
6. Update **MEMORY.md** if new preferences learned

### Sales Lead Qualification

**Scenario:** New lead comes in, needs qualification

**Steps the agent would take:**
1. **Lead Qualifier sub-agent** activates
2. Check **MEMORY.md** for patterns
   - "Enterprise deals require C-level approval"
3. Use **"Qualify Lead" skill** with BANT framework
4. Check **Salesforce** via MCP for company history
5. Score the lead (Budget, Authority, Need, Timeline)
6. Route to appropriate salesperson
7. Update **MEMORY.md** with lead characteristics

---

## 🔍 What to Look For

### In Agent Cards
- **Name** - Department or sub-agent name
- **Description** - What this agent does
- **Status dot** - 🟢 Active, ⚪ Inactive, 🔴 Error
- **↑ Arrow** - Indicates this agent has a parent
- **Skills count** - Number of SOPs available
- **Tools count** - Number of MCP integrations

### In Configuration Window
- **File paths** - Where CLAUDE.md and MEMORY.md are located
- **Skill descriptions** - What each SOP does
- **MCP status** - Are tools connected or not
- **Memory categories** - What type of learning it is
- **Context usage** - How much context window is used
- **Model settings** - Which Claude model, temperature, tokens

### In Canvas View
- **Blue arrows** - Show parent-child relationships
- **Agent positions** - Drag to reorganize
- **Green borders** - Valid drop targets during drag
- **Summary stats** - Departments, agents, skills, tools count

---

## 🎨 Visual Indicators

### Status Colors
- 🟢 **Green** - Active, connected, healthy
- 🟡 **Orange** - Warning, getting full
- 🔴 **Red** - Error, disconnected, critical
- ⚪ **Gray** - Inactive, neutral

### Connection Types
- **Blue line with arrow** - Parent-child relationship
- **Blue ↑ icon** - This agent has a parent

### Drag States
- **Normal** - White background, regular cursor
- **Hover** - Light gray background, shadow
- **Dragging** - Semi-transparent, large shadow, grabbing cursor
- **Drop target** - Green border, green glow, light green background

### Memory Categories
- 🔵 **PREFERENCE** - Light blue background
- 🟠 **CORRECTION** - Light orange background
- 🟢 **PATTERN** - Light green background
- 🟣 **CONTACT** - Light purple background

---

## ⚡ Keyboard & Mouse

### Mouse Interactions
- **Single click** - Open configuration window
- **Click + drag** - Move agent on canvas
- **Drag onto another agent** - Create relationship
- **Click X** - Close configuration window
- **Scroll** - Navigate through sections

### No Keyboard Shortcuts (Yet)
Currently mouse-only interface

---

## 🐛 Troubleshooting

### "Agent not moving when I drag"
- Make sure you're clicking on the card body, not a button
- Try refreshing the page

### "Configuration window not opening"
- Make sure you're single-clicking, not dragging
- Check console for errors (F12)

### "Can't create relationship"
- Can't drop agent on itself
- Can't create circular dependencies
- Agents with children can't become children (one level only)

### "Skills/Memory not showing"
- Some agents may not have skills or memory yet
- Check the mock data to see which agents are fully populated
- Currently, only Acme Corp departments have full data

---

## 📚 Further Reading

See the full documentation:
- **AGENTIC_OS_UI_DOCUMENTATION.md** - Complete system overview
- **UI_SCREENSHOT_REFERENCE.md** - Visual layout reference
- **README.md** - Project setup and technical details

---

## 🎯 Next Steps

1. ✅ Explore all three companies
2. ✅ Click every agent to see their configuration
3. ✅ Try dragging agents to create relationships
4. ✅ Compare different department structures
5. ✅ Note the memory entries - they tell stories
6. ✅ Look at skill descriptions - they're SOPs
7. ✅ Check MCP connections - real tool integrations

**Questions?**
- Check the documentation files
- Inspect the mock data in `/src/data/mockProjects.ts`
- Review the TypeScript interfaces in `/src/types/desktop.ts`

---

## 💡 Pro Tips

1. **Memory Tells the Story**
   - Read the memory entries to understand what the agent has learned
   - They reveal workflow patterns and preferences

2. **Skills are SOPs**
   - Each skill is a markdown file with step-by-step instructions
   - The agent follows these when executing tasks

3. **MCP = Real Tools**
   - MCP connections aren't just for show
   - In production, these would actually connect to Gmail, Slack, etc.

4. **Context Engineering**
   - CLAUDE.md path shows where the agent's role is defined
   - MEMORY.md path shows where learnings are stored
   - This is the "brain" of the agent

5. **Hierarchy Matters**
   - Parent agents delegate to sub-agents
   - Sub-agents specialize in specific tasks
   - Only one level of nesting (no grandchildren)

6. **Temperature Settings**
   - Creative tasks (0.7-0.9) - Content Writer
   - Analytical tasks (0.3-0.5) - Lead Qualifier
   - Balanced tasks (0.5-0.7) - Most agents

---

**Ready to explore? Open http://localhost:3000 and dive in!** 🚀
