# Split-Panel Configuration Window with Real-time Context Monitor

## Overview

The Agent Configuration Window now features a **split-panel layout**:
- **Left Panel (66%)**: Configuration sections (Status, Skills, MCP, Memory, Model, Docs, PRD)
- **Right Panel (33%)**: Real-time Context Consumption Monitor

---

## Visual Layout

```
┌────────────────────────────────────────────────────────────────────────────┐
│  ✕  Marketing Department - Configuration                                   │
├──────────────────────────────────┬────────────────────────────────────────┤
│ LEFT PANEL                       │ RIGHT PANEL                             │
│ Configuration                    │ Real-time Context Monitor               │
│                                  │                                         │
│ ┌──────────────────────────────┐│┌──────────────────────────────────────┐│
│ │ Status                       ││││ Real-time Context Monitor    ● LIVE ││
│ │ ● Active          [DEPT]    ││││                                       ││
│ │                              ││││ ┌────────────────────────────────────┐││
│ │ Description:                 ││││ │ 29.0%            142,000           │││
│ │ Campaign planning...         ││││ │ Context Used     Tokens Remaining │││
│ │                              ││││ │                                    │││
│ │ CLAUDE.md Path:              ││││ │ ████████████░░░░░░░░              │││
│ │ /Acme_Corp/Marketing/...     ││││ │                                    │││
│ │                              ││││ │ 58,000 used     200,000 total     │││
│ │ MEMORY.md Path:              ││││ └────────────────────────────────────┘││
│ │ /Acme_Corp/Marketing/...     ││││                                       ││
│ └──────────────────────────────┘│││ Context Breakdown                     ││
│                                  ││├──────────────────────────────────────┤│
│ ┌──────────────────────────────┐│││ ● System Prompt      4,200 tokens   ││
│ │ Skills (SOPs)            [5] ││││   ████░░░░░░░░░░░░░░  2.1%          ││
│ │                              ││││                                       ││
│ │ 📄 Create Proposal           ││││ ● CLAUDE.md          1,800 tokens   ││
│ │    Creates marketing...      ││││   ██░░░░░░░░░░░░░░░░  0.9%          ││
│ │    /Marketing/.claude/...    ││││                                       ││
│ │                              ││││ ● MEMORY.md            680 tokens   ││
│ │ 📄 Schedule Campaign         ││││   █░░░░░░░░░░░░░░░░░  0.3%          ││
│ │    Plans and schedules...    ││││                                       ││
│ │    /Marketing/.claude/...    ││││ ● Skills (SOPs)        750 tokens   ││
│ │                              ││││   █░░░░░░░░░░░░░░░░░  0.4%          ││
│ │ ... (3 more)                 ││││                                       ││
│ └──────────────────────────────┘│││ ● MCP Tools            120 tokens   ││
│                                  ││││   ░░░░░░░░░░░░░░░░░░  0.1%          ││
│ ┌──────────────────────────────┐│││                                       ││
│ │ MCP Tool Connections     [4] ││││ ● Conversation      50,450 tokens   ││
│ │                              ││││   ██████████░░░░░░░░  25.2%          ││
│ │ ● Gmail          [GMAIL]     ││││                                       ││
│ │   Send campaign emails...    ││││ Visual Distribution                   ││
│ │                              ││││├──────────────────────────────────────┤│
│ │ ● Notion         [NOTION]    ││││ ████████████████████████████████████││
│ │   Update campaign tracker... ││││ │Sys│CLA│MEM│Ski│MC│ Conversation   │││
│ │                              ││││ └────────────────────────────────────┘││
│ │ ● Slack          [SLACK]     ││││ ● System   ● CLAUDE   ● MEMORY      ││
│ │   Team coordination...       ││││ ● Skills   ● MCP      ● Conversation││
│ │                              ││││                                       ││
│ │ ● Google Analytics [OTHER]   ││││ Status                                ││
│ │   Track performance...       ││││├──────────────────────────────────────┤│
│ └──────────────────────────────┘││││ ✓ Healthy - Plenty of context      ││
│                                  ││││   available                         ││
│ ┌──────────────────────────────┐│││                                       ││
│ │ Persistent Memory  [6 entr.] ││││ Recommendations                       ││
│ │                              ││││├──────────────────────────────────────┤│
│ │ [PREFERENCE]     2024-03-15  ││││ 💡 Context usage is healthy.        ││
│ │ CEO prefers data-heavy...    ││││    Continue normal operations.       ││
│ │                              ││││                                       ││
│ │ [CORRECTION]     2024-03-20  ││││ Recent Activity                       ││
│ │ Avoid "growth hacking"...    ││││├──────────────────────────────────────┤│
│ │                              ││││ 10:32:15 Loaded CLAUDE.md (+1,800)  ││
│ │ [PATTERN]        2024-04-01  ││││ 10:32:16 Loaded MEMORY.md (+680)    ││
│ │ Best time: Tuesday 10 AM...  ││││ 10:32:18 Loaded 5 skills (+750)     ││
│ │                              ││││ 10:32:20 MCP tools registered (+120)││
│ │ ... (3 more entries)         ││││ 10:35:42 User message (+325)        ││
│ └──────────────────────────────┘││││ 10:35:55 Response generated (+892)  ││
│                                  │││                                       ││
│ (Model Config, Docs, PRD below)  │││                                       ││
│                                  │││                                       ││
└──────────────────────────────────┴─┴───────────────────────────────────────┘
```

---

## Right Panel Components

### 1. **Panel Header**
```
┌────────────────────────────────────┐
│ Real-time Context Monitor  ● LIVE  │
└────────────────────────────────────┘
```
- Title: "Real-time Context Monitor"
- Live indicator: Pulsing green dot with "LIVE" text
- Separated by dark border

### 2. **Overall Usage Card**
```
┌────────────────────────────────────┐
│  29.0%            142,000           │
│  Context Used     Tokens Remaining │
│                                     │
│  ████████████░░░░░░░░              │
│  (Green progress bar)               │
│                                     │
│  58,000 used     200,000 total     │
└────────────────────────────────────┘
```
**Features:**
- Large percentage display (29.0%)
- Tokens remaining shown prominently
- Color-coded progress bar:
  - 🟢 Green (0-70%) - Healthy
  - 🟡 Orange (70-90%) - Warning
  - 🔴 Red (90-100%) - Critical
- Small text showing exact token counts

### 3. **Context Breakdown List**
```
┌────────────────────────────────────┐
│ Context Breakdown                   │
├────────────────────────────────────┤
│ ● System Prompt      4,200 tokens  │
│   ████░░░░░░░░░░░░░░  2.1%        │
│                                     │
│ ● CLAUDE.md          1,800 tokens  │
│   ██░░░░░░░░░░░░░░░░  0.9%        │
│                                     │
│ ● MEMORY.md            680 tokens  │
│   █░░░░░░░░░░░░░░░░░  0.3%        │
│                                     │
│ ● Skills (SOPs)        750 tokens  │
│   █░░░░░░░░░░░░░░░░░  0.4%        │
│                                     │
│ ● MCP Tools            120 tokens  │
│   ░░░░░░░░░░░░░░░░░░  0.1%        │
│                                     │
│ ● Conversation      50,450 tokens  │
│   ██████████░░░░░░░░  25.2%        │
└────────────────────────────────────┘
```
**Features:**
- Each component listed separately
- Color-coded dots matching visual distribution
- Token count displayed
- Mini progress bar showing percentage
- Percentage value on the right

**Color Coding:**
- 🟣 Purple: System Prompt
- 🔵 Blue: CLAUDE.md
- 🟠 Orange: MEMORY.md
- 🟢 Green: Skills (SOPs)
- 🔵 Cyan: MCP Tools
- 🔴 Pink: Conversation

### 4. **Visual Distribution (Stacked Bar)**
```
┌────────────────────────────────────┐
│ Visual Distribution                 │
├────────────────────────────────────┤
│ ████████████████████████████████████│
│ │Sys│CLA│MEM│Ski│MC│ Conversation   │
│                                     │
│ Legend:                             │
│ ● System   ● CLAUDE   ● MEMORY     │
│ ● Skills   ● MCP      ● Conversation│
└────────────────────────────────────┘
```
**Features:**
- Single horizontal bar divided into segments
- Each segment proportional to its token usage
- Color-coded to match breakdown list
- Hover tooltip shows details
- Legend below for reference

### 5. **Status Card**
```
┌────────────────────────────────────┐
│ Status                              │
├────────────────────────────────────┤
│ ✓ Healthy - Plenty of context      │
│   available                         │
└────────────────────────────────────┘
```
**States:**

**Normal (Green):**
```
✓ Healthy - Plenty of context available
```

**Warning (Orange):**
```
⚠ Warning - Context filling up
```

**Critical (Red):**
```
⚠ Critical - Context nearly full
```

### 6. **Recommendations**
```
┌────────────────────────────────────┐
│ Recommendations                     │
├────────────────────────────────────┤
│ 💡 Context usage is healthy.       │
│    Continue normal operations.     │
└────────────────────────────────────┘
```

**Normal Status:**
- Single recommendation to continue

**Warning Status:**
```
💡 Consider using /compact to compress
   conversation history

💡 Reduce number of active skills or
   tools if not needed
```

**Critical Status:**
```
⚠ Immediately run /compact to free up
   context

⚠ Consider splitting into multiple
   agents

⚠ Archive old conversation data
```

### 7. **Recent Activity Log**
```
┌────────────────────────────────────┐
│ Recent Activity                     │
├────────────────────────────────────┤
│ 10:32:15 Loaded CLAUDE.md (+1,800) │
│ 10:32:16 Loaded MEMORY.md (+680)   │
│ 10:32:18 Loaded 5 skills (+750)    │
│ 10:32:20 MCP tools registered      │
│          (+120)                     │
│ 10:35:42 User message (+325)       │
│ 10:35:55 Response generated (+892) │
└────────────────────────────────────┘
```
**Features:**
- Monospace font (Courier New)
- Timestamp on each line
- Action description
- Token delta in parentheses
- Scrollable for long history
- Gray background for each entry
- Left border accent

---

## Interactive Features

### Hover Effects

**Stacked Bar Segments:**
- Hover over any segment
- Tooltip appears: "System Prompt: 4,200 tokens (2.1%)"
- Segment opacity changes to 80%

**Breakdown Items:**
- Entire row is a visual unit
- Progress bar shows detailed breakdown

### Color System

**Context Breakdown Colors:**
```
System Prompt:  #9C27B0 (Purple)
CLAUDE.md:      #2196F3 (Blue)
MEMORY.md:      #FF9800 (Orange)
Skills:         #4CAF50 (Green)
MCP Tools:      #00BCD4 (Cyan)
Conversation:   #E91E63 (Pink)
```

**Status Colors:**
```
Normal:   #4CAF50 (Green) - 0-70%
Warning:  #FF9800 (Orange) - 70-90%
Critical: #F44336 (Red) - 90-100%
```

---

## Data Flow

### How Context is Calculated

```typescript
// Overall usage from agent.config
const total = config.contextWindow.total;      // 200,000
const used = config.contextWindow.used;        // 58,000
const remaining = config.contextWindow.remaining; // 142,000
const percentage = (used / total) * 100;       // 29.0%

// Breakdown calculation
const systemPrompt = 4,200;  // Fixed system instructions
const claudeFile = 1,800;    // From CLAUDE.md file size
const memoryFile = 680;      // From MEMORY.md file size
const skills = agent.skills.length * 150;  // 5 skills × 150 tokens
const mcpTools = 120;        // MCP tool definitions
const conversation = used - (systemPrompt + claudeFile +
                             memoryFile + skills + mcpTools);
```

### Real-time Updates

**In Production (Simulated):**
1. Agent loads CLAUDE.md → Activity log updates
2. Context monitor updates tokens used
3. Breakdown recalculates percentages
4. Progress bars animate to new values
5. Status card updates if threshold crossed
6. Recommendations adjust based on status

---

## Responsive Behavior

### Window Sizes

**Large (1400px width):**
- Left panel: ~933px
- Right panel: 400px
- All features visible

**Medium (< 1400px):**
- Window scales to 90vw
- Panels maintain ratio
- Content scrolls vertically

**Minimum:**
- Window: 1000px width
- Height: 85vh
- Both panels scrollable

---

## Usage Scenarios

### Scenario 1: Healthy Agent (29% used)
```
Left Panel:
- Configuration sections visible
- 5 skills loaded
- 4 MCP tools connected
- 6 memory entries

Right Panel:
- Green progress bar (29%)
- Breakdown shows distribution
- Status: ✓ Healthy
- Recommendation: Continue normal operations
- Activity log shows recent loads
```

### Scenario 2: Warning State (75% used)
```
Right Panel Changes:
- Orange progress bar (75%)
- Status: ⚠ Warning - Context filling up
- Recommendations:
  - Use /compact to compress history
  - Reduce active skills/tools
- Conversation segment dominates stacked bar
```

### Scenario 3: Critical State (92% used)
```
Right Panel Changes:
- Red progress bar (92%)
- Status: ⚠ Critical - Context nearly full
- Recommendations:
  - Immediately run /compact
  - Split into multiple agents
  - Archive old data
- Remaining tokens: 16,000 (shown in red)
```

---

## Technical Details

### Component Structure
```
AgentConfigWindow
├── Title Bar (close button, title)
└── Split Layout
    ├── Left Panel (configuration)
    │   ├── Status Section
    │   ├── Skills Section
    │   ├── MCP Section
    │   ├── Memory Section
    │   ├── Model Config
    │   ├── Documentation
    │   └── PRD
    └── Right Panel (context monitor)
        ├── Panel Header (with LIVE indicator)
        ├── Overall Usage Card
        ├── Context Breakdown List
        ├── Visual Distribution (stacked bar)
        ├── Status Card
        ├── Recommendations
        └── Activity Log
```

### CSS Classes
```css
.splitLayout         - Flex container for panels
.leftPanel           - Scrollable config panel
.rightPanel          - Fixed-width monitor panel (400px)
.contextMonitorPanel - Padding container
.overallUsage        - Main stats card
.breakdownSection    - Detailed breakdown
.stackedVisualization - Visual bar chart
.contextStatus       - Status message
.recommendations     - Action suggestions
.activityLog         - Recent events
```

---

## Benefits

### For Users
1. **Immediate Context Awareness** - See usage at a glance
2. **Breakdown Understanding** - Know what's consuming tokens
3. **Proactive Warnings** - Get alerts before running out
4. **Action Guidance** - Clear recommendations
5. **Activity Tracking** - See what agent is loading

### For Developers
1. **Debug Context Issues** - Identify memory leaks
2. **Optimize Skills** - See which skills are heavy
3. **Monitor Performance** - Track token usage patterns
4. **Plan Capacity** - Know when to split agents

### For Agentic OS
1. **Resource Management** - Monitor all agents
2. **Cost Tracking** - Token usage = cost
3. **Performance Tuning** - Optimize context engineering
4. **Scalability Planning** - Know when to add agents

---

## Future Enhancements

### Phase 1 (Current)
- ✅ Real-time display of current state
- ✅ Breakdown by component
- ✅ Visual stacked bar
- ✅ Status indicators
- ✅ Recommendations
- ✅ Activity log

### Phase 2
- 🔄 Live updates (WebSocket)
- 🔄 Historical trending chart
- 🔄 Export usage reports
- 🔄 Set custom thresholds
- 🔄 Alert notifications

### Phase 3
- 🔮 Predictive analytics (when will it fill?)
- 🔮 Cost calculation (tokens → $)
- 🔮 Comparison across agents
- 🔮 Optimization suggestions (AI-powered)

### Phase 4
- 🔮 Automatic compaction triggers
- 🔮 Smart skill loading (on-demand)
- 🔮 Dynamic memory management
- 🔮 Context window expansion (when available)

---

## Summary

The split-panel layout provides:

**Left Side:**
- Full configuration access
- Skills, tools, memory
- Documentation and PRD
- Traditional scrollable interface

**Right Side:**
- Real-time context monitoring
- Visual breakdown and charts
- Status alerts and recommendations
- Activity log with timestamps
- Always visible, no scrolling needed

**Result:**
A comprehensive view that combines **configuration control** with **real-time resource monitoring** in a single, efficient interface.

**Open the app at http://localhost:3000, click any department agent, and see the new split-panel layout!** 🚀
