# Agent Configuration & Management System

## Overview

The system now properly separates agents and sub-agents, with a configuration window for viewing and managing settings.

---

## New Architecture

### What Changed

**Before**: Sub-agents were nested under agents in a canvas

**After**:
- **Agents** and **sub-agents** are displayed separately in the project view
- **Click any agent/sub-agent** → Opens configuration window
- **Configuration window shows**:
  - Status and description
  - Model selection
  - Context window monitoring
  - Documentation

---

## Project View Layout

```
┌─────────────────────────────────────┐
│ ← Back    Desktop › Data Analysis   │
├─────────────────────────────────────┤
│ Data Analysis                       │
│ 3 agents • 3 sub-agents             │
│ ───────────────────────────────────│
│                                     │
│ ### Agents                          │
│ ┌────────┐  ┌────────┐  ┌────────┐│
│ │ CSV    │  │ Chart  │  │Statistical│
│ │ Parser │  │Generator│  │ Model   │
│ │        │  │        │  │         │
│ │● Active│  │● Active│  │○ Inactive│
│ │3 sub-  │  │        │  │         │
│ │agents  │  │        │  │         │
│ └────────┘  └────────┘  └────────┘│
│                                     │
│ ### Sub-Agents                      │
│ ┌────────┐  ┌────────┐  ┌────────┐│
│ │ File   │  │ Data   │  │ Report │
│ │Validator│  │Cleaner │  │Generator│
│ │  [SUB] │  │  [SUB] │  │  [SUB] │
│ │● Active│  │● Active│  │● Active│
│ │Parent: │  │Parent: │  │Parent: │
│ │CSV     │  │CSV     │  │CSV     │
│ │Parser  │  │Parser  │  │Parser  │
│ └────────┘  └────────┘  └────────┘│
└─────────────────────────────────────┘
```

---

## Configuration Window

### Triggered By
- Click any agent card
- Click any sub-agent card

### Window Sections

#### 1. Status Section
- **Badge**: "Agent" (green) or "Sub-Agent" (blue)
- **Status indicator**: Green/Gray/Red dot
- **Description**: Full agent description
- **Parent info**: (Sub-agents only) Shows parent agent name

#### 2. Model Configuration
- **Model dropdown**:
  - Claude Opus 4.6 (Most Capable)
  - Claude Sonnet 4.6 (Balanced)
  - Claude Haiku 4.5 (Fast)
- **Max Tokens**: Maximum output length
- **Temperature**: Creativity/randomness level (0-1)
- **Last Updated**: Configuration timestamp

#### 3. Context Window Monitor
- **Visual progress bar** showing context usage
- **Color-coded**:
  - Green: < 70% used
  - Orange: 70-90% used
  - Red: > 90% used (warning!)
- **Statistics**:
  - Total capacity (200,000 tokens)
  - Used tokens
  - Remaining tokens
  - Percentage used

#### 4. Documentation
- **Markdown-style rendering**:
  - Headings (# H1, ## H2)
  - Paragraphs
  - Lists
  - Code blocks
- **Scrollable** if content is long
- **Styled** with serif font for readability
- **Falls back** to "No documentation available" if empty

---

## Example Configuration Window

```
┌──────────────────────────────────────┐
│ ✕  CSV Parser - Configuration        │
├──────────────────────────────────────┤
│                                      │
│ Status         [Agent]               │
│ ─────────────────────────────────── │
│ ● Active                             │
│                                      │
│ Description                          │
│ Analyzes CSV files and generates     │
│ reports                              │
│                                      │
│ Model Configuration                  │
│ ─────────────────────────────────── │
│ Model                                │
│ ▼ Claude Opus 4.6 (Most Capable)    │
│                                      │
│ Max Tokens: 4,096                    │
│ Temperature: 0.7                     │
│ Last Updated: May 2, 2024 12:00 PM  │
│                                      │
│ Context Window Monitor               │
│ ─────────────────────────────────── │
│ Total Capacity: 200,000 tokens       │
│ Used: 45,000 tokens                  │
│ Remaining: 155,000 tokens            │
│                                      │
│ ██████░░░░░░░░░░░░░░░░ 22.5%        │
│                                      │
│ Documentation                        │
│ ─────────────────────────────────── │
│ # CSV Parser Agent                   │
│                                      │
│ ## Overview                          │
│ This agent processes CSV files...    │
│                                      │
│ ## Capabilities                      │
│ - Parse CSV files up to 100MB       │
│ - Validate data integrity            │
│ ...                                  │
└──────────────────────────────────────┘
```

---

## Data Structure

### Agent with Configuration

```typescript
{
  id: 'agent-1',
  name: 'CSV Parser',
  type: 'agent',
  status: 'active',
  description: 'Analyzes CSV files and generates reports',
  config: {
    model: 'claude-opus-4-6',
    maxTokens: 4096,
    temperature: 0.7,
    contextWindow: {
      total: 200000,
      used: 45000,
      remaining: 155000
    },
    lastUpdated: new Date('2024-05-02')
  },
  documentation: `
    # CSV Parser Agent

    ## Overview
    This agent processes CSV files...

    ## Capabilities
    - Parse CSV files up to 100MB
    - Validate data integrity
    ...
  `
}
```

### Sub-Agent with Parent Reference

```typescript
{
  id: 'sub-1-1',
  name: 'File Validator',
  type: 'sub-agent',
  status: 'active',
  description: 'Validates CSV file format and structure',
  parentAgentId: 'agent-1', // Reference to CSV Parser
  config: {
    model: 'claude-sonnet-4-6',
    maxTokens: 2048,
    temperature: 0.3,
    contextWindow: {
      total: 200000,
      used: 12000,
      remaining: 188000
    },
    lastUpdated: new Date('2024-05-02')
  },
  documentation: `...`
}
```

---

## Visual Distinctions

### Agent Cards
- Standard border
- Regular icon size
- Shows sub-agent count at bottom
- Click to open config

### Sub-Agent Cards
- **Blue left border** (4px)
- Smaller icon
- **"SUB" badge** next to name
- **Parent info** at bottom showing parent agent
- Click to open config

---

## Context Monitoring Details

### Warning Levels

**Green (Normal)**: 0-70% used
- Plenty of context remaining
- Agent operating normally

**Orange (Warning)**: 70-90% used
- Context getting low
- Consider clearing history or splitting tasks

**Red (Danger)**: 90-100% used
- Very little context left
- Agent may fail soon
- Immediate action needed

### Example Context States

**CSV Parser (22.5% used)**:
```
Total: 200,000 tokens
Used: 45,000 tokens
Remaining: 155,000 tokens
Status: GREEN ✓
```

**Content Extractor (97.5% used)**:
```
Total: 200,000 tokens
Used: 195,000 tokens
Remaining: 5,000 tokens
Status: RED ⚠️
```

---

## Model Selection

### Claude Opus 4.6
- **Best for**: Complex reasoning, long documents
- **Max Tokens**: 4096
- **Use case**: Main agents, complex analysis

### Claude Sonnet 4.6
- **Best for**: Balanced performance and speed
- **Max Tokens**: 3072
- **Use case**: Most sub-agents, general tasks

### Claude Haiku 4.5
- **Best for**: Fast, simple tasks
- **Max Tokens**: 2048
- **Use case**: Simple validation, quick checks

---

## Documentation Format

### Supported Markdown

```markdown
# Heading 1
## Heading 2
Regular paragraphs
- Bulleted lists
- With multiple items
1. Numbered lists
2. Also supported
```

### Rendering
- Headings: Bold, system font
- Paragraphs: Serif font, readable line height
- Lists: Proper indentation
- Code: Monospace with background

---

## User Interactions

### In Project View

**Click Agent Card**:
1. Configuration window opens
2. Shows agent details
3. Display context monitor
4. Show documentation

**Click Sub-Agent Card**:
1. Configuration window opens
2. Shows "Sub-Agent" badge
3. Displays parent agent info
4. Same config and monitoring

**Close Window**:
- Click X button in top-left
- Returns to project view
- Can open another agent

---

## Parent-Child Relationships

### Visual Hierarchy

**CSV Parser (Agent)**
- File Validator (Sub-Agent)
- Data Cleaner (Sub-Agent)
- Report Generator (Sub-Agent)

**Chart Generator (Agent)**
- No sub-agents

### In UI

**Agent card** shows:
- "3 sub-agents" count

**Sub-agent card** shows:
- "SUB" badge
- "Parent: CSV Parser" info

---

## Implementation Files

### New Files
- `AgentConfigWindow.tsx` - Configuration window component
- `AgentConfigWindow.module.css` - Window styles

### Modified Files
- `types/desktop.ts` - Updated Agent interface with config
- `data/mockProjects.ts` - Added configs and documentation
- `ProjectView.tsx` - Separate agent/sub-agent sections

### Removed Files
- `SubAgentCanvas.tsx` - No longer needed
- `SubAgentCanvas.module.css` - No longer needed

---

## Benefits

### 1. Clearer Hierarchy
- Agents and sub-agents are distinct
- Easy to see relationships
- No nesting confusion

### 2. Better Status Monitoring
- Context window visualization
- Color-coded warnings
- Real-time percentage

### 3. Model Management
- See which model each agent uses
- Understand capability differences
- Plan token usage

### 4. Documentation Access
- Built-in help for each agent
- Quick reference
- No external docs needed

### 5. Professional UX
- Cloud-like configuration panels
- Familiar design patterns
- Clear information hierarchy

---

## Real-World Use Cases

### Monitoring Context Usage

**Problem**: Agent starts failing
**Solution**:
1. Click agent card
2. Check context monitor
3. See 95% usage (red)
4. Clear history or restart agent

### Understanding Agent Hierarchy

**Problem**: Don't know which sub-agents belong where
**Solution**:
1. Look at sub-agent section
2. Each shows parent name
3. See complete structure at a glance

### Choosing Right Model

**Problem**: Agent too slow
**Solution**:
1. Check current model (Opus)
2. Consider downgrading to Sonnet
3. Compare capabilities
4. Make informed decision

### Reading Documentation

**Problem**: How does this agent work?
**Solution**:
1. Click agent card
2. Scroll to Documentation section
3. Read capabilities, usage, config
4. Understand without trial and error

---

## Future Enhancements

### Phase 1 (Current) ✓
- Separate agents and sub-agents
- Configuration window
- Context monitoring
- Documentation display

### Phase 2 (Next)
- Edit model selection
- Adjust temperature/max tokens
- Clear context manually
- Real-time updates

### Phase 3 (Future)
- Agent performance metrics
- Cost tracking per agent
- Usage analytics
- Export configurations

---

## Summary

The system now provides:
- ✅ **Clear separation** of agents and sub-agents
- ✅ **Configuration window** for each agent
- ✅ **Context monitoring** with visual progress bar
- ✅ **Model information** (Opus/Sonnet/Haiku)
- ✅ **Documentation** built into each agent
- ✅ **Parent-child relationships** clearly shown
- ✅ **Professional UX** similar to cloud platforms

---

**Version**: 5.0
**Status**: Configuration system complete
**Server**: http://localhost:3000/

**Try it**:
1. Double-click "Data Analysis" folder
2. Click "CSV Parser" agent card
3. See configuration window with context monitor!
4. Click a sub-agent to see parent info
5. Check the documentation section 📚
