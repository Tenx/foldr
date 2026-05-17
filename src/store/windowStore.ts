import { create } from 'zustand';
import { WindowState } from '../types/window';

interface WindowStore {
  windows: WindowState[];
  nextZIndex: number;

  openWindow: (window: Omit<WindowState, 'zIndex' | 'isActive'>) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  updateWindowSize: (id: string, width: number, height: number) => void;
}

export const useWindowStore = create<WindowStore>((set) => ({
  windows: [],
  nextZIndex: 100,

  openWindow: (window) => set((state) => {
    // Don't open duplicate windows
    if (state.windows.find(w => w.id === window.id)) {
      return {
        windows: state.windows.map(w =>
          w.id === window.id
            ? { ...w, isActive: true, zIndex: state.nextZIndex }
            : { ...w, isActive: false }
        ),
        nextZIndex: state.nextZIndex + 1
      };
    }

    return {
      windows: [
        ...state.windows.map(w => ({ ...w, isActive: false })),
        {
          ...window,
          zIndex: state.nextZIndex,
          isActive: true
        }
      ],
      nextZIndex: state.nextZIndex + 1
    };
  }),

  closeWindow: (id) => set((state) => ({
    windows: state.windows.filter(w => w.id !== id)
  })),

  focusWindow: (id) => set((state) => ({
    windows: state.windows.map(w =>
      w.id === id
        ? { ...w, isActive: true, zIndex: state.nextZIndex }
        : { ...w, isActive: false }
    ),
    nextZIndex: state.nextZIndex + 1
  })),

  updateWindowPosition: (id, x, y) => set((state) => ({
    windows: state.windows.map(w =>
      w.id === id ? { ...w, position: { x, y } } : w
    )
  })),

  updateWindowSize: (id, width, height) => set((state) => ({
    windows: state.windows.map(w =>
      w.id === id ? { ...w, size: { width, height } } : w
    )
  }))
}));
