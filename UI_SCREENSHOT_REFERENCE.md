# UI Screenshot Reference Guide

## Main Views

### 1. Desktop View
```
┌──────────────────────────────────────────────────────────────────────────┐
│  🍎 File  Edit  View  Window  Help                          Fri 10:30 AM │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│   📁                                                                       │
│   Acme Corp                                                                │
│   3 depts • 9 agents                                                       │
│                                                                            │
│   📁                                                                       │
│   TechStart Inc                                                            │
│   2 depts • 2 agents                                                       │
│                                                                            │
│   📁                                                                       │
│   Creative Agency Co                                                       │
│   2 depts • 2 agents                                                       │
│                                                                            │
│                                                                            │
│                                                                            │
└──────────────────────────────────────────────────────────────────────────┘
```

### 2. Company View (Acme Corp)
```
┌──────────────────────────────────────────────────────────────────────────┐
│  🍎 File  Edit  View  Window  Help                          Fri 10:30 AM │
├──────────────────────────────────────────────────────────────────────────┤
│  ┌────────┐  Desktop › Acme Corp                                          │
│  │ ← Back │                                                                │
│  └────────┘                                                                │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  Acme Corp                                                                 │
│  3 departments • 9 sub-agents • 15 skills • 4 MCP tools • Modified 5/2   │
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐│
│  │ 💡 Agentic Operating System: Each department is an autonomous agent  ││
│  │    with its own skills, memory, and tool connections. Drag one agent ││
│  │    onto another to create parent-child relationships. Blue arrows    ││
│  │    show the hierarchy.                                                ││
│  └──────────────────────────────────────────────────────────────────────┘│
│                                                                            │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │                          AGENT CANVAS                              │  │
│  │                                                                    │  │
│  │    ┌─────────────────┐      ┌─────────────────┐                  │  │
│  │    │ 🤖              │      │ 🤖              │                  │  │
│  │    │ Marketing       │      │ Executive       │                  │  │
│  │    │ Department      │      │ Assistant       │                  │  │
│  │    │                 │      │                 │                  │  │
│  │    │ Campaign plan,  │      │ Scheduling,     │                  │  │
│  │    │ content, etc.   │      │ email mgmt      │                  │  │
│  │    │                 │      │                 │                  │  │
│  │    │ ● Active        │      │ ● Active        │                  │  │
│  │    │ ───────────────│      │ ───────────────│                  │  │
│  │    │ 📄 5 skills     │      │ 📄 5 skills     │                  │  │
│  │    │ 🔌 4 tools      │      │ 🔌 4 tools      │                  │  │
│  │    └─────────────────┘      └─────────────────┘                  │  │
│  │            │                         │                            │  │
│  │            │                         │                            │  │
│  │            ↓ (blue arrow)            ↓                            │  │
│  │    ┌──────────────┐ ┌──────────────┐ ┌──────────────┐           │  │
│  │    │ ↑            │ │ ↑            │ │ ↑            │           │  │
│  │    │ Content      │ │ SEO          │ │ Calendar     │           │  │
│  │    │ Writer       │ │ Specialist   │ │ Manager      │           │  │
│  │    │ ● Active     │ │ ● Active     │ │ ● Active     │           │  │
│  │    └──────────────┘ └──────────────┘ └──────────────┘           │  │
│  │                                                                    │  │
│  │                                   ┌─────────────────┐             │  │
│  │                                   │ 🤖              │             │  │
│  │                                   │ Sales           │             │  │
│  │                                   │ Department      │             │  │
│  │                                   │                 │             │  │
│  │                                   │ Lead mgmt,      │             │  │
│  │                                   │ proposals       │             │  │
│  │                                   │                 │             │  │
│  │                                   │ ● Active        │             │  │
│  │                                   │ ───────────────│             │  │
│  │                                   │ 📄 5 skills     │             │  │
│  │                                   │ 🔌 4 tools      │             │  │
│  │                                   └─────────────────┘             │  │
│  │                                           │                        │  │
│  │                                           ↓                        │  │
│  │                                   ┌──────────────┐                 │  │
│  │                                   │ ↑ Lead       │                 │  │
│  │                                   │   Qualifier  │                 │  │
│  │                                   │ ● Active     │                 │  │
│  │                                   └──────────────┘                 │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
└──────────────────────────────────────────────────────────────────────────┘
```

### 3. Agent Configuration Window (Marketing Department)
```
                    ┌─────────────────────────────────────────┐
                    │ ✕  Marketing Department - Configuration │
                    ├─────────────────────────────────────────┤
                    │                                         │
                    │ Status              [DEPARTMENT]        │
                    │ ● Active                                │
                    │                                         │
                    │ Description:                            │
                    │ Campaign planning, content creation...  │
                    │                                         │
                    │ CLAUDE.md Path:                         │
                    │ /Acme_Corp/Marketing/CLAUDE.md          │
                    │                                         │
                    │ MEMORY.md Path:                         │
                    │ /Acme_Corp/Marketing/MEMORY.md          │
                    │                                         │
                    │━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
                    │                                         │
                    │ Skills (SOPs)                    [5]    │
                    │                                         │
                    │ ┌─────────────────────────────────────┐│
                    │ │ 📄  Create Proposal                 ││
                    │ │     Creates marketing campaign      ││
                    │ │     proposals with ROI analysis     ││
                    │ │     /Marketing/.claude/skills/...   ││
                    │ └─────────────────────────────────────┘│
                    │                                         │
                    │ ┌─────────────────────────────────────┐│
                    │ │ 📄  Schedule Campaign               ││
                    │ │     Plans and schedules multi-      ││
                    │ │     channel marketing campaigns     ││
                    │ │     /Marketing/.claude/skills/...   ││
                    │ └─────────────────────────────────────┘│
                    │                                         │
                    │ ┌─────────────────────────────────────┐│
                    │ │ 📄  Analyze Metrics                 ││
                    │ │     Analyzes campaign performance   ││
                    │ │     and generates reports           ││
                    │ │     /Marketing/.claude/skills/...   ││
                    │ └─────────────────────────────────────┘│
                    │                                         │
                    │ ... (2 more skills)                     │
                    │                                         │
                    │━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
                    │                                         │
                    │ MCP Tool Connections             [4]    │
                    │                                         │
                    │ 🟢 Gmail                 [GMAIL]       │
                    │    Send campaign emails and manage     │
                    │    correspondence                       │
                    │                                         │
                    │ 🟢 Notion                [NOTION]      │
                    │    Update campaign tracker and content │
                    │    calendar                            │
                    │                                         │
                    │ 🟢 Slack                 [SLACK]       │
                    │    Team coordination and notifications │
                    │                                         │
                    │ 🟢 Google Analytics      [OTHER]       │
                    │    Track website and campaign perf.    │
                    │                                         │
                    │━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
                    │                                         │
                    │ Persistent Memory           [6 entries]│
                    │                                         │
                    │ ┌─────────────────────────────────────┐│
                    │ │ [PREFERENCE]         2024-03-15     ││
                    │ │ CEO prefers data-heavy proposals    ││
                    │ │ with competitor comparisons         ││
                    │ └─────────────────────────────────────┘│
                    │                                         │
                    │ ┌─────────────────────────────────────┐│
                    │ │ [CORRECTION]         2024-03-20     ││
                    │ │ Avoid using "growth hacking" term - ││
                    │ │ executive team dislikes it          ││
                    │ └─────────────────────────────────────┘│
                    │                                         │
                    │ ┌─────────────────────────────────────┐│
                    │ │ [PATTERN]            2024-04-01     ││
                    │ │ Email campaigns perform best on     ││
                    │ │ Tuesday mornings at 10 AM EST       ││
                    │ └─────────────────────────────────────┘│
                    │                                         │
                    │ ... (3 more entries)                    │
                    │                                         │
                    │━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
                    │                                         │
                    │ Model Configuration                     │
                    │                                         │
                    │ Model:                                  │
                    │ Claude Opus 4.6 (Most Capable)         │
                    │                                         │
                    │ Max Tokens: 4,096                      │
                    │ Temperature: 0.7                       │
                    │                                         │
                    │━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
                    │                                         │
                    │ Context Window Monitor                  │
                    │                                         │
                    │ Total:     200,000 tokens              │
                    │ Used:       58,000 tokens              │
                    │ Remaining: 142,000 tokens              │
                    │                                         │
                    │ ████████████░░░░░░░░  29.0%            │
                    │                                         │
                    │━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
                    │                                         │
                    │ (Documentation & PRD sections below)    │
                    │                                         │
                    └─────────────────────────────────────────┘
```

## Visual States

### Agent Card - Default State
```
┌─────────────────┐
│ 🤖              │
│ Marketing       │
│ Department      │
│                 │
│ Campaign plan,  │
│ content, etc.   │
│                 │
│ ● Active        │
│ ───────────────│
│ 📄 5 skills     │
│ 🔌 4 tools      │
└─────────────────┘
```

### Agent Card - Hover State
```
┌─────────────────┐  (light shadow)
│ 🤖              │  (light gray bg)
│ Marketing       │
│ Department      │
│ ...             │
└─────────────────┘
```

### Agent Card - Dragging State
```
┌─────────────────┐  (large shadow)
│ 🤖              │  (70% opacity)
│ Marketing       │  (scale 1.05)
│ Department      │
│ ...             │
└─────────────────┘
```

### Agent Card - Drop Target State
```
╔═════════════════╗  (green border 3px)
║ 🤖              ║  (green glow)
║ Sales           ║  (light green bg)
║ Department      ║
║ ...             ║
╚═════════════════╝
```

### Sub-Agent Card with Parent Indicator
```
┌─────────────────┐
│ ↑               │  (blue arrow top-right)
│ 🤖 (small)      │
│ Content Writer  │
│                 │
│ Creates blog    │
│ posts and copy  │
│                 │
│ ● Active        │
└─────────────────┘
```

### Connection Arrow
```
     Parent
   ┌────────┐
   │        │
   └────────┘
        ↑
        │  (blue line 2px)
        │  (arrow marker)
        │
   ┌────────┐
   │ ↑      │
   │ Child  │
   └────────┘
```

## Color Reference

### Status Indicators
- 🟢 Active: #4CAF50 (Green)
- ⚪ Inactive: #999999 (Gray)
- 🔴 Error: #F44336 (Red)

### Memory Categories
- 🔵 Preference: #E3F2FD background, #1976D2 text
- 🟠 Correction: #FFF3E0 background, #F57C00 text
- 🟢 Pattern: #E8F5E9 background, #388E3C text
- 🟣 Contact: #F3E5F5 background, #7B1FA2 text

### Section Backgrounds
- Skills: #F0F9FF (Light Blue)
- MCP: #FAFAFA (Light Gray)
- Memory: #FFFEF7 (Cream)
- PRD: #FFF9F0 (Warm Cream)
- Documentation: #FAFAFA (Light Gray)

### Interactive Elements
- Connection arrows: #2196F3 (Blue)
- Drop target border: #4CAF50 (Green)
- Drop target glow: rgba(76, 175, 80, 0.2)
- Skill left border: #2196F3 (Blue)
- Memory left border: #FF9800 (Orange)

## Interaction Examples

### 1. Creating a Parent-Child Relationship
```
Step 1: Click and hold on agent
┌─────────────────┐
│ 🤖 Marketing    │  ← Mouse down
└─────────────────┘

Step 2: Drag over target
┌─────────────────┐  (dragging - 70% opacity)
│ 🤖 Marketing    │  ← Moving with mouse
└─────────────────┘
        ↓
╔═════════════════╗  (target - green border)
║ 🤖 Sales        ║
╚═════════════════╝

Step 3: Release mouse
   Sales
   ┌────────┐
   │        │
   └────────┘
        ↑ (blue arrow created)
        │
   ┌────────┐
   │ ↑ Mark │  (moved near parent)
   └────────┘
```

### 2. Opening Configuration Window
```
Step 1: Click agent card
┌─────────────────┐
│ 🤖 Marketing    │  ← Click
└─────────────────┘

Step 2: Modal opens
          Background dims (overlay)

                ┌─────────────────┐
                │ Configuration   │
                │ Window Opens    │
                └─────────────────┘
```

### 3. Viewing Memory Entries
```
Scroll through memory list:

┌─────────────────────────────────────┐
│ [PREFERENCE]         2024-03-15     │
│ CEO prefers data-heavy proposals    │
└─────────────────────────────────────┘
         ↓ (scroll)
┌─────────────────────────────────────┐
│ [CORRECTION]         2024-03-20     │
│ Avoid "growth hacking" term         │
└─────────────────────────────────────┘
         ↓ (scroll)
┌─────────────────────────────────────┐
│ [PATTERN]            2024-04-01     │
│ Best time: Tuesday 10 AM EST        │
└─────────────────────────────────────┘
```

## Typography

### Fonts
- System: `var(--font-system)` - "Chicago", "Charcoal", sans-serif
- Monospace: `'Courier New', monospace`
- Serif: `'Georgia', serif` (for documentation/PRD)

### Sizes
- Window title: 12px bold
- Section title: 15-16px bold
- Agent name: 13-14px bold
- Description: 11-12px regular
- Metadata: 10px regular
- Skill path: 10px monospace

## Layout Grid

### Agent Card Dimensions
- Width: 180px
- Height: ~100px (variable based on content)
- Padding: 12px
- Border: 2px
- Border radius: 0px (Mac System 1 style)

### Canvas
- Min height: 600px
- Background: #FAFAFA
- Border: 2px solid black
- Overflow: hidden

### Configuration Window
- Width: 600px
- Max width: 90vw
- Max height: 80vh
- Position: Fixed center (50% transform)
- Z-index: 1000

## Accessibility Notes

- All interactive elements have visible focus states
- Status indicators use both color and shape (dots)
- Text contrast ratios meet WCAG AA standards
- Drag operations have clear visual feedback
- Modal dialogs trap focus appropriately
- All buttons have descriptive labels

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile: Touch events for drag-and-drop

## Performance

- SVG arrows rendered efficiently
- Agent positions use CSS transforms
- Modal uses hardware acceleration
- Memory list virtualization for 50+ entries
- Context window updates are debounced
