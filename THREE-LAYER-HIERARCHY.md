# 3-Layer Hierarchy System - Complete Implementation

## Architecture Overview

The system now implements a complete 3-layer hierarchy:

```
Layer 1: Desktop
    ↓
Layer 2: Project Folder (Agent Grid)
    ↓
Layer 3: Sub-Agents (Canvas with Connections)
```

All three layers are accessible on the same page with smooth transitions!

---

## Layer 1: Desktop

**What it is**: The top-level view showing all projects as folder icons

**Location**: Main desktop background

**Features**:
- Gray textured background
- Project folders displayed as icons
- Single-click to select
- Double-click to enter project

**Navigation**:
- Double-click any folder → Go to Layer 2

---

## Layer 2: Project Folder (Agent Grid)

**What it is**: Inside view of a project showing all its agents

**Location**: Full-page view replacing desktop

**Features**:
- **Toolbar**:
  - ← Back button (returns to Desktop)
  - Breadcrumb (Desktop › Project Name)
- **Project Header**:
  - Project title
  - Metadata (agent count, dates)
- **Agent Grid**:
  - Cards displaying all agents
  - Status indicators (green/gray/red dots)
  - Sub-agent count badge
  - Click to select
  - Double-click to view sub-agents

**Navigation**:
- Click ← Back → Return to Layer 1
- Double-click agent → Scroll to Layer 3

---

## Layer 3: Sub-Agents (Interactive Canvas)

**What it is**: Visual canvas showing sub-agents with connections

**Location**: Same page, below agent grid (Layer 2)

**Features**:
- **Section Header**:
  - Title: "Sub-Agents"
  - Badge showing parent agent name
- **Interactive Canvas**:
  - Draggable sub-agent nodes
  - Connection lines with arrows
  - Status indicators
  - Real-time position updates
- **Instructions**:
  - Helpful tip about dragging and connections

**Interactions**:
- **Drag nodes** to rearrange
- **Arrows show data flow** between sub-agents
- **Status dots** show active/inactive/error states

---

## How It Works

### User Flow

#### 1. Start at Desktop (Layer 1)
```
┌─────────────────────────────┐
│  Desktop                    │
│                             │
│  📁 Data Analysis           │
│  📁 Web Scraper            │
│  📁 Email Bot              │
│                             │
└─────────────────────────────┘
```

#### 2. Double-click "Data Analysis" → Enter Project (Layer 2)
```
┌─────────────────────────────────────┐
│ ← Back    Desktop › Data Analysis   │
├─────────────────────────────────────┤
│ Data Analysis                       │
│ 3 agents • Modified Mar 20          │
│ ───────────────────────────────────│
│                                     │
│ ┌────────┐  ┌────────┐  ┌────────┐│
│ │ CSV    │  │ Chart  │  │Statistical│
│ │ Parser │  │Generator│  │ Model   │
│ │● Active│  │● Active│  │○ Inactive│
│ │3 sub-  │  │2 sub-  │  │0 sub-   │
│ │agents  │  │agents  │  │agents   │
│ └────────┘  └────────┘  └────────┘│
└─────────────────────────────────────┘
```

#### 3. Click "CSV Parser" → Select Agent (Layer 2 + 3)
```
┌─────────────────────────────────────┐
│ Layer 2: Agent Grid (above)         │
│ [CSV Parser card is selected]       │
└─────────────────────────────────────┘
          ↓ (scroll down)
┌─────────────────────────────────────┐
│ Sub-Agents  [CSV Parser]            │
├─────────────────────────────────────┤
│ ┌─────────┐    ┌──────────┐       │
│ │  File   │───→│   Data   │───→   │
│ │Validator│    │ Cleaner  │       │
│ │● Active │    │● Active  │       │
│ └─────────┘    └──────────┘       │
│                                     │
│      ┌──────────┐                 │
│  ───→│  Report  │                 │
│      │Generator │                 │
│      │● Active  │                 │
│      └──────────┘                 │
│                                     │
│ 💡 Tip: Drag sub-agents to         │
│    rearrange them                  │
└─────────────────────────────────────┘
```

#### 4. Double-click Agent → Auto-scroll to Sub-Agents
- Selects the agent
- Smoothly scrolls down to sub-agent canvas
- Shows all sub-agents for that agent

---

## Data Structure

### Project with Agents and Sub-Agents

```typescript
{
  name: 'Data Analysis',
  agents: [
    {
      id: 'agent-1',
      name: 'CSV Parser',
      status: 'active',
      subAgents: [
        {
          id: 'sub-1-1',
          name: 'File Validator',
          status: 'active',
          position: { x: 50, y: 50 },
          connections: ['sub-1-2'] // Points to Data Cleaner
        },
        {
          id: 'sub-1-2',
          name: 'Data Cleaner',
          status: 'active',
          position: { x: 250, y: 50 },
          connections: ['sub-1-3'] // Points to Report Generator
        },
        {
          id: 'sub-1-3',
          name: 'Report Generator',
          status: 'active',
          position: { x: 450, y: 50 }
          // No connections (end of pipeline)
        }
      ]
    }
  ]
}
```

---

## Components

### SubAgentCanvas Component
**Location**: `src/components/views/SubAgentCanvas.tsx`

**Purpose**: Interactive canvas for Layer 3 sub-agents

**Features**:
- Renders sub-agent nodes
- Draws connection lines with SVG
- Handles drag interactions
- Shows selected state
- Auto-scrolls when agent is double-clicked

**Props**:
```typescript
interface SubAgentCanvasProps {
  selectedAgent: Agent | null;
  onUpdateSubAgentPosition: (id: string, x: number, y: number) => void;
}
```

---

## Sub-Agent Node Design

### Visual Structure
```
┌───────────────┐
│ ● File        │  ← Status dot + Name
│   Validator   │
│               │
│ Validates CSV │  ← Description
│ file format   │
└───────────────┘
```

### Status Colors
- **Green (●)**: Active
- **Gray (○)**: Inactive
- **Red (●)**: Error

### Connection Lines
- Black arrows showing data flow
- Start from center of source node
- Point to center of target node
- SVG with arrowhead markers

---

## Drag & Drop Functionality

### How Dragging Works

1. **Mouse Down**: Capture starting position
2. **Mouse Move**: Calculate delta, update node position
3. **Mouse Up**: Stop dragging, finalize position

### Code Flow
```typescript
handleMouseDown(e, subAgent) {
  setDraggingId(subAgent.id);
  dragStartPos = { x: e.clientX, y: e.clientY };
  nodeStartPos = subAgent.position;
}

handleMouseMove(e) {
  deltaX = e.clientX - dragStartPos.x;
  deltaY = e.clientY - dragStartPos.y;
  newPosition = nodeStartPos + delta;
  updatePosition(newPosition);
}
```

### Visual Feedback
- **While dragging**: Opacity 0.8, cursor: grabbing
- **Selected**: Black border with shadow
- **Hover**: Box shadow

---

## Connection Rendering

### SVG Lines with Arrows

```typescript
// Calculate line from center of source to center of target
x1 = sourcePosition.x + nodeWidth/2;
y1 = sourcePosition.y + nodeHeight/2;
x2 = targetPosition.x + nodeWidth/2;
y2 = targetPosition.y + nodeHeight/2;

<line x1={x1} y1={y1} x2={x2} y2={y2}
      marker-end="url(#arrowhead)" />
```

### Arrowhead Definition
```xml
<marker id="arrowhead">
  <polygon points="0 0, 10 3, 0 6" fill="black" />
</marker>
```

---

## Agent Card Updates

### Sub-Agent Count Badge

Added to each agent card showing how many sub-agents it has:

```
┌────────────────┐
│ CSV Parser     │
│ Analyzes CSV   │
│ ● Active       │
│ ───────────────│
│ 3 sub-agents   │ ← New badge
└────────────────┘
```

**Features**:
- Only shown if agent has sub-agents
- Proper singular/plural (1 sub-agent vs 2 sub-agents)
- Styled with border-top separator
- Color adapts to selected state

---

## Empty States

### No Agent Selected
```
┌─────────────────────────────┐
│ Sub-Agents                   │
├─────────────────────────────┤
│                             │
│  Select an agent above to   │
│  view its sub-agents        │
│                             │
└─────────────────────────────┘
```

### Agent Has No Sub-Agents
```
┌─────────────────────────────┐
│ Sub-Agents  [CSV Parser]     │
├─────────────────────────────┤
│                             │
│  This agent has no          │
│  sub-agents                 │
│                             │
└─────────────────────────────┘
```

---

## Mock Data Examples

### CSV Parser Sub-Agents (Data Pipeline)
```
File Validator → Data Cleaner → Report Generator
```

### URL Crawler Sub-Agents (Web Scraping)
```
URL Queue → Page Fetcher
```

### Inbox Monitor Sub-Agents (Email Processing)
```
Email Fetcher → Priority Sorter
```

---

## Interaction Patterns

### Single-Click Agent Card
1. Agent card gets selected (black background)
2. Sub-agent canvas updates
3. Shows sub-agents for that agent
4. Can immediately drag sub-agents

### Double-Click Agent Card
1. Agent card gets selected
2. Page smoothly scrolls down
3. Sub-agent canvas comes into view
4. User can interact with sub-agents

### Drag Sub-Agent Node
1. Mouse down on node
2. Node becomes semi-transparent
3. Cursor changes to "grabbing"
4. Node follows mouse
5. Connection lines update in real-time
6. Mouse up finalizes position

---

## Styling Highlights

### Canvas Background
- White background
- Black border
- Minimum height: 400px
- Relative positioning for absolute sub-agents

### Sub-Agent Nodes
- 150px width
- White background
- 2px black border
- Positioned absolutely
- Z-index layering

### Connection Lines
- SVG overlay (pointer-events: none)
- 2px stroke width
- Black color
- Arrow markers

---

## Performance Optimizations

### Efficient Re-rendering
- Only selected agent's sub-agents rendered
- SVG lines recalculated only when positions change
- Event listeners cleaned up on unmount

### Smooth Dragging
- Direct position updates (no debouncing needed)
- CSS transforms for GPU acceleration
- Minimal React state updates during drag

---

## Future Enhancements

### Phase 1 (Current) ✅
- Display sub-agents in canvas
- Drag to rearrange
- Show connections with arrows
- Status indicators

### Phase 2 (Future)
- Create new sub-agents
- Delete sub-agents
- Edit sub-agent details
- Change connections by dragging

### Phase 3 (Future)
- Real-time status updates
- Performance metrics
- Log viewing
- Start/stop individual sub-agents

---

## File Structure

```
/src
├── types/desktop.ts           # Added SubAgent interface
├── data/mockProjects.ts       # Added sub-agent data
├── components/
│   └── views/
│       ├── ProjectView.tsx            # Layer 2 + manages Layer 3
│       ├── ProjectView.module.css
│       ├── SubAgentCanvas.tsx         # Layer 3 component
│       └── SubAgentCanvas.module.css
```

---

## Testing Checklist

### Layer Navigation
- [x] Desktop shows project folders
- [x] Double-click folder enters project
- [x] Back button returns to desktop
- [x] Breadcrumb shows correct path

### Agent Grid (Layer 2)
- [x] Agents display in grid
- [x] Single-click selects agent
- [x] Sub-agent count badge shows
- [x] Status indicators correct

### Sub-Agent Canvas (Layer 3)
- [x] Sub-agents render on canvas
- [x] Connection lines draw correctly
- [x] Arrows point in right direction
- [x] Drag functionality works
- [x] Position updates in real-time
- [x] Selected state shows border
- [x] Status dots display

### Interactions
- [x] Select different agents switches sub-agent view
- [x] Double-click agent scrolls to canvas
- [x] Drag updates position smoothly
- [x] Multiple sub-agents can be moved
- [x] Connections follow nodes during drag

---

## Summary

### What Was Implemented

1. ✅ **3-layer hierarchy** on same page
2. ✅ **Layer 1**: Desktop with project folders
3. ✅ **Layer 2**: Agent grid inside project
4. ✅ **Layer 3**: Sub-agent canvas below agent grid
5. ✅ **Drag interactivity** for sub-agents
6. ✅ **Connection visualization** with arrows
7. ✅ **Smooth navigation** between layers
8. ✅ **Auto-scroll** to sub-agents on double-click

### Key Features

- **Single page design** - All layers accessible without page changes
- **Visual flow** - Arrows show data pipeline
- **Interactive** - Drag nodes to rearrange
- **Clear hierarchy** - Desktop → Project → Agents → Sub-Agents
- **Real-time updates** - Connections update as you drag

---

**Version**: 4.0
**Status**: Complete 3-layer hierarchy implemented
**Server**: http://localhost:3000/

**Try it**:
1. Double-click "Data Analysis" folder
2. Click "CSV Parser" agent card
3. See 3 sub-agents with connections
4. Drag them around! 🎉
