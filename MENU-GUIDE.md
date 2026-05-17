# Foldr Menu Reference

## Menu Structure Overview

### ⌘ (System Menu)
The Apple menu icon provides system-level information and help.

```
⌘
├─ About Foldr...
├─ ──────────────────────
└─ Help & Tutorial
```

---

### Project Menu
Manage your agent projects (the folders on your desktop).

```
Project
├─ New Project...          Create a new project folder
├─ Open Project            Open selected project
├─ ──────────────────────
├─ Close Project           Close active project window
├─ Project Settings...     Configure project (coming soon)
├─ ──────────────────────
└─ Quit                    Exit application (coming soon)
```

**What is a Project?**
A project is like a folder that contains a group of related agents working toward a common goal. Examples:
- "Marketing Campaign" - agents for content, social media, analytics
- "Customer Support" - agents for email, chat, ticket routing
- "Data Pipeline" - agents for extraction, transformation, loading

---

### Agent Menu
Control individual agents within your projects.

```
Agent
├─ New Agent...            Create a new agent in current project
├─ Duplicate Agent         Copy existing agent (coming soon)
├─ ──────────────────────
├─ Start Agent             Activate selected agent
├─ Stop Agent              Deactivate selected agent
├─ Restart Agent           Restart selected agent
├─ ──────────────────────
└─ Delete Agent            Remove agent (coming soon)
```

**Agent Lifecycle**:
1. **Create** - Define what the agent does
2. **Start** - Activate the agent to begin work
3. **Monitor** - Watch status (active/inactive/error)
4. **Stop** - Pause the agent when not needed
5. **Restart** - Reset if encountering issues

---

### View Menu
Filter and organize how you see your agents.

```
View
├─ Show All Agents         Display every agent (default)
├─ Show Active Only        Show only running agents
├─ Show Inactive Only      Show only stopped agents
├─ ──────────────────────
├─ Sort by Name            Alphabetical order
├─ Sort by Status          Group by active/inactive/error
└─ Sort by Created Date    Newest or oldest first
```

**When to use filters**:
- **Show Active Only** - See what's currently running
- **Show Inactive Only** - Find agents that need attention
- **Sort by Status** - Quickly spot any errors

---

### Window Menu
Manage your open windows and workspace.

```
Window
├─ Minimize All            Hide all windows (coming soon)
├─ Bring All to Front      Show all windows (coming soon)
├─ ──────────────────────
└─ Tile Windows            Auto-arrange windows (coming soon)
```

---

## Common Workflows

### Creating a New Project
1. Click **Project** → **New Project...**
2. Name your project (e.g., "Email Automation")
3. A new folder appears on your desktop
4. Double-click to open it

### Adding Agents to a Project
1. Open a project (double-click its folder)
2. Click **Agent** → **New Agent...**
3. Configure the agent's purpose
4. Click **Agent** → **Start Agent** to activate it

### Managing Active Agents
1. Click **View** → **Show Active Only**
2. See all running agents across projects
3. Click **Agent** → **Stop Agent** to pause one
4. Click **Agent** → **Restart Agent** if there's an issue

### Organizing Your Workspace
1. Open multiple project windows
2. Drag windows to arrange them
3. Click any window to bring it to front
4. Close windows when done (click close box)

---

## Menu Item Status

### Currently Functional
✅ Menu clicks work
✅ Dropdown navigation
✅ Menu highlighting
✅ Click-outside to close

### Coming Soon (Disabled)
⏳ About Foldr
⏳ Project Settings
⏳ Duplicate Agent
⏳ Delete Agent
⏳ Window management features
⏳ Quit (requires proper cleanup)

---

## Keyboard Shortcuts (Planned)

```
⌘N          New Project
⌘O          Open Project
⌘W          Close Window
⌘Q          Quit

⌘,          Project Settings
⌘I          Agent Info

⌘1          Show All Agents
⌘2          Show Active Only
⌘3          Show Inactive Only
```

---

## Tips & Best Practices

### Project Organization
- **Keep projects focused**: One main goal per project
- **Name clearly**: Use descriptive names like "Blog Content Generator"
- **Group related agents**: Put collaborating agents in the same project

### Agent Management
- **Start only what you need**: Don't run all agents at once
- **Monitor status**: Check for error states regularly
- **Restart when stuck**: If an agent isn't responding, restart it

### Workspace Tips
- **Tile windows side-by-side**: Easier to monitor multiple projects
- **Close unused windows**: Reduces clutter
- **Use View filters**: Quickly find specific agents

---

## Understanding the Metaphor

### Desktop = Your Workspace
Just like physical folders on a real desk, projects sit on your desktop waiting to be opened.

### Folders = Projects
Each folder is a container for a specific initiative or goal.

### Files = Agents
Inside each folder, individual agents are like documents - each with a specific purpose.

### Opening/Closing = Accessing
Double-click to "open" a project and see what's inside. Close windows when you're done.

---

This menu structure makes agent management feel as natural as managing files on your classic Mac!
