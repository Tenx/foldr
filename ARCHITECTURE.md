# Component Architecture Guide

## Component Hierarchy

```
App
└── Desktop
    ├── MenuBar
    │   └── MenuItem (multiple)
    │       └── Dropdown items
    ├── Icon (multiple)
    │   └── FolderIcon (SVG)
    └── Window (multiple)
        ├── TitleBar
        │   ├── CloseBox
        │   └── Title
        └── Content
            └── AgentList
                └── AgentItem (multiple)
```

## Core Components

### Desktop
**Location**: `src/components/core/Desktop/`
**Purpose**: Main container for the entire UI

**Features**:
- Full viewport canvas
- White background
- Manages desktop click (deselect all)
- Renders MenuBar, Icons, and Windows

**State Dependencies**:
- Reads: `desktopStore.icons`, `windowStore.windows`
- Updates: `desktopStore.deselectAll()`

---

### MenuBar
**Location**: `src/components/core/MenuBar/`
**Purpose**: Top menu bar with dropdown menus

**Features**:
- Fixed at top of screen
- File, Edit, View, Special menus
- Dropdown system
- Active menu highlighting

**Components**:
- `MenuBar.tsx`: Main container
- `MenuItem.tsx`: Individual menu with dropdown

**State**: Local state for active menu

---

### Icon
**Location**: `src/components/core/Icon/`
**Purpose**: Desktop icons representing folders

**Features**:
- Positioned absolutely
- SVG folder icon
- Text label
- Selection state (inverted colors)
- Single-click to select
- Double-click to open window

**Components**:
- `Icon.tsx`: Main icon component
- `FolderIcon.tsx`: SVG folder graphic

**State Dependencies**:
- Reads: `icon` prop
- Updates: `desktopStore.selectIcon()`, `windowStore.openWindow()`

**Hooks Used**:
- `useDoubleClick` for single/double-click detection

---

### Window
**Location**: `src/components/core/Window/`
**Purpose**: Draggable window container

**Features**:
- Positioned absolutely
- Border and shadow
- Title bar with pattern (active/inactive)
- Close box (top-left)
- Draggable by title bar
- Click to focus (z-index)
- Content area with agent list

**State Dependencies**:
- Reads: `window` prop
- Updates: `windowStore.focusWindow()`, `windowStore.closeWindow()`, `windowStore.updateWindowPosition()`

**Hooks Used**:
- `useDraggable` for window movement

**Render Logic**:
- Folder content: Shows agent list with status
- Empty state: "No agents in this project"

---

## State Management

### desktopStore
**Location**: `src/store/desktopStore.ts`
**Purpose**: Manages desktop icons and selections

**State**:
```typescript
{
  icons: DesktopIcon[];
}
```

**Actions**:
- `setIcons(icons)` - Replace all icons
- `selectIcon(id)` - Select one icon, deselect others
- `deselectAll()` - Clear all selections
- `updateIconPosition(id, x, y)` - Move icon

---

### windowStore
**Location**: `src/store/windowStore.ts`
**Purpose**: Manages open windows

**State**:
```typescript
{
  windows: WindowState[];
  nextZIndex: number;
}
```

**Actions**:
- `openWindow(window)` - Open or focus window
- `closeWindow(id)` - Remove window
- `focusWindow(id)` - Bring to front, mark active
- `updateWindowPosition(id, x, y)` - Move window
- `updateWindowSize(id, width, height)` - Resize window

**Z-Index Logic**:
- Windows start at z-index 100
- Each focus increments `nextZIndex`
- Active window gets highest z-index

---

## Custom Hooks

### useDraggable
**Location**: `src/hooks/useDraggable.ts`
**Purpose**: Enables drag-and-drop for elements

**Usage**:
```typescript
const { position, isDragging, handleMouseDown } = useDraggable({
  initialPosition: { x: 100, y: 100 },
  onDragStart: () => console.log('Started dragging'),
  onDrag: (x, y) => console.log('Dragging to', x, y),
  onDragEnd: (x, y) => console.log('Dropped at', x, y)
});
```

**Features**:
- Mouse event handling
- Delta calculation from start position
- Constrains windows below menu bar (y >= 20)
- Cleanup on unmount

---

### useDoubleClick
**Location**: `src/hooks/useDoubleClick.ts`
**Purpose**: Detects single vs double clicks

**Usage**:
```typescript
const handleClick = useDoubleClick(
  () => console.log('Single click'),
  () => console.log('Double click')
);
```

**Logic**:
- 300ms delay between clicks
- First click starts timer
- Second click within 300ms triggers double-click
- Otherwise triggers single-click

---

## Type Definitions

### desktop.ts
```typescript
interface Position { x: number; y: number; }
interface Size { width: number; height: number; }

interface DesktopIcon {
  id: string;
  type: 'folder' | 'file' | 'trash';
  label: string;
  position: Position;
  isSelected: boolean;
  data?: ProjectData;
}

interface ProjectData {
  name: string;
  agents: Agent[];
  createdAt: Date;
  modifiedAt: Date;
}

interface Agent {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'error';
  description: string;
}
```

### window.ts
```typescript
interface WindowState {
  id: string;
  title: string;
  position: Position;
  size: Size;
  zIndex: number;
  isActive: boolean;
  content: WindowContent;
}

interface WindowContent {
  type: 'folder' | 'document' | 'settings';
  data?: any;
}
```

---

## Data Flow

### Opening a Window
1. User double-clicks icon → `Icon.tsx`
2. `useDoubleClick` detects double-click
3. `handleDoubleClick()` calls `windowStore.openWindow()`
4. Store checks if window exists
5. If new: adds to windows array with new z-index
6. If exists: focuses existing window
7. Desktop re-renders with new window
8. `Window.tsx` receives window state as prop

### Dragging a Window
1. User clicks title bar → `Window.tsx`
2. `handleMouseDown` from `useDraggable`
3. Hook registers global mousemove/mouseup listeners
4. On move: updates local position state
5. Window moves via inline styles
6. On release: calls `onDragEnd`
7. `updateWindowPosition()` stores final position
8. Hook cleanup removes listeners

### Selecting an Icon
1. User single-clicks icon → `Icon.tsx`
2. `useDoubleClick` starts timer
3. After 300ms (no second click): triggers single-click
4. `handleSingleClick()` calls `desktopStore.selectIcon(id)`
5. Store updates icons array (one selected, others not)
6. Desktop re-renders
7. Selected icon gets inverted styles

---

## Styling Architecture

### CSS Modules
- Scoped to component
- Prevents naming conflicts
- Imported as `styles` object

### Design System
- Global variables in `mac-system.css`
- Consistent spacing, colors, fonts
- Pattern definitions for title bars

### Style Application
```typescript
// Static class
className={styles.window}

// Conditional class
className={`${styles.window} ${isActive ? styles.active : ''}`}

// Inline styles for dynamic values
style={{ left: x, top: y, zIndex: z }}
```

---

## Performance Optimizations

1. **Zustand**: Minimal re-renders, only affected components update
2. **CSS Transforms**: GPU-accelerated during drag (planned)
3. **Event Delegation**: Desktop click handler, not per-icon
4. **Memoization**: Icon and Window components could use `React.memo` (future)
5. **Scoped Updates**: Position updates don't affect other windows

---

## Extension Points

### Adding New Icon Types
1. Create new icon component in `Icon/` folder
2. Add type to `DesktopIcon` type
3. Update `Icon.tsx` render logic
4. Add to mock data

### Adding New Window Content Types
1. Add type to `WindowContent` interface
2. Create content component
3. Update `Window.tsx` render logic
4. Pass data through `window.content.data`

### Adding New Menus
1. Add menu object to `MenuBar.tsx` menus array
2. Implement action handlers
3. Connect to stores if needed

---

## Best Practices

1. **State Location**: UI state in Zustand, component state in React
2. **Event Handlers**: Stop propagation to prevent bubbling
3. **Type Safety**: All props and state are typed
4. **Naming**: Descriptive names, clear purpose
5. **Separation**: Logic in hooks, presentation in components

---

## Testing Strategy (Future)

1. **Unit Tests**: Hooks and store actions
2. **Component Tests**: Render and interaction
3. **Integration Tests**: Full user flows
4. **Visual Tests**: Screenshot comparison for pixel-perfect rendering

---

This architecture provides a solid foundation for building a complete agent management system with the authentic Mac System 1 aesthetic!
