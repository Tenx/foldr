# Foldr

A nostalgic recreation of the classic Macintosh System 1 (1984) desktop interface for managing AI agents. Foldr treats agent management as folder management, using the familiar desktop metaphor.

## Features

- **Authentic Mac System 1 aesthetic**: 1-bit monochrome graphics, pixelated fonts, hard rectangular edges
- **Classic desktop metaphor**: Folders, icons, draggable windows
- **Agent management**: Each folder represents a project containing agents
- **Pure UI/UX implementation**: Built with React, TypeScript, and Zustand

## Tech Stack

- React 19 + TypeScript
- Vite for fast development
- Zustand for state management
- CSS Modules for scoped styling
- Custom Mac System 1 design system

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

- `/src/components/core/` - Reusable Mac UI components (Desktop, Window, MenuBar, Icon)
- `/src/store/` - Zustand stores for state management
- `/src/styles/` - Mac System 1 design system and global styles
- `/src/hooks/` - Custom React hooks for dragging and interactions
- `/src/data/` - Mock data for development

## Design Philosophy

This project prioritizes:
1. **Authentic retro aesthetic** - Pixel-perfect recreation of Mac System 1
2. **Familiar interactions** - Desktop metaphors that users already understand
3. **Simple, focused UX** - No unnecessary complexity
4. **Fun and engaging** - A distinctive way to interact with AI agents

## License

MIT License — see [LICENSE](LICENSE) for details.
