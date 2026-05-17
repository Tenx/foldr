# Foldr - Quick Start Guide

## 🖥️ What You're Looking At

This is a faithful recreation of the original Macintosh System 1 (1984) desktop interface, reimagined as an agent management system. Each folder represents a project containing AI agents.

## 🎮 How to Use

### Getting Started

1. **View the Desktop**
   - Open http://localhost:3000/ in your browser
   - You'll see a white desktop with a menu bar at the top
   - Three folder icons appear on the left side

### Working with Icons

**Single Click**
- Click once on a folder icon to select it
- Selected icons have inverted colors (black background, white text)

**Double Click**
- Double-click a folder icon to open its window
- The window shows the agents inside that project

**Deselect**
- Click anywhere on the empty desktop to deselect all icons

### Working with Windows

**Opening Windows**
- Double-click any folder icon to open its window
- Each window displays the agents in that project

**Moving Windows**
- Click and hold the window's title bar (the striped area at the top)
- Drag the window to move it around the screen
- Release to drop it in place

**Bringing Windows to Front**
- Click anywhere on a window to bring it to the front
- The active window has diagonal stripes in its title bar
- Inactive windows have horizontal lines

**Closing Windows**
- Click the small close box in the top-left corner of the window
- The close box has an X inside it

### Using the Menu Bar

**Opening Menus**
- Click any menu name (File, Edit, View, Special) at the top
- A dropdown menu appears below

**Menu Items**
- File: New Folder, Open, Close, Quit
- Edit: Undo, Cut, Copy, Paste (mostly disabled for now)
- View: By Name, By Date, By Size
- Special: Clean Up, Empty Trash

**Closing Menus**
- Click outside the menu to close it
- Click another menu to switch to it

## 📁 Sample Projects

The app comes with 3 example projects:

### 1. Data Analysis
Contains 3 agents:
- **CSV Parser** (active) - Analyzes CSV files
- **Chart Generator** (active) - Creates visualizations
- **Statistical Model** (inactive) - Statistical analysis

### 2. Web Scraper
Contains 2 agents:
- **URL Crawler** (active) - Crawls websites
- **Content Extractor** (error) - Extracts text content

### 3. Email Bot
Contains 3 agents:
- **Inbox Monitor** (active) - Monitors emails
- **Auto Responder** (active) - Sends replies
- **Spam Filter** (active) - Filters spam

## 🎨 Understanding the Interface

### Agent Status Indicators

Windows show a status indicator next to each agent:

- **Filled square** = Active agent
- **Empty square** = Inactive agent
- **Striped square** = Error state

### Window States

- **Diagonal stripes** = Active (focused) window
- **Horizontal lines** = Inactive (background) window

### Visual Style

Everything uses pure black and white (1-bit graphics) to match the original 1984 Macintosh System 1 aesthetic:
- No colors or gradients
- Hard rectangular edges
- Pixelated, bitmap-style graphics
- Simple, clean design

## ⌨️ Tips & Tricks

1. **Multiple Windows**: Open multiple folders at once by double-clicking different icons
2. **Layering**: Click any window to bring it to the front of the stack
3. **Organization**: Windows can overlap - arrange them however you like
4. **Menu Exploration**: Try clicking through the menus to see all available options

## 🐛 Known Limitations

This is a UI/UX prototype with mock data:
- Menu items don't perform real actions yet
- Can't create new folders yet
- Can't edit agents
- No persistent storage (refresh loses state)
- Icons can't be dragged (coming in future version)

## 🎯 Design Goals

This interface demonstrates:
- **Familiar metaphor**: Desktop/folder organization
- **Nostalgic aesthetic**: 1984 Mac System 1 look
- **Simple interactions**: Click, double-click, drag
- **Clear visual feedback**: Selection, focus, status

## 🎉 Have Fun!

Enjoy the nostalgic trip back to 1984 while managing your modern AI agents! The juxtaposition of retro interface and cutting-edge technology is intentionally playful.

---

**Need help?** Check the IMPLEMENTATION.md file for technical details.
