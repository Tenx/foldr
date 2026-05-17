import { create } from 'zustand';
import { DesktopIcon, ProjectConfig } from '../types/desktop';
import { mockDesktopIcons } from '../data/mockProjects';
import { generateHarnessContent, parseHarnessMarkdown } from '../utils/harnessParser';

const STORAGE_KEY = 'foldr.desktopState.v1';

interface DesktopStore {
  icons: DesktopIcon[];
  projectSettingsContent: Record<string, string>; // projectId -> markdown content
  setIcons: (icons: DesktopIcon[]) => void;
  selectIcon: (id: string) => void;
  deselectAll: () => void;
  updateIconPosition: (id: string, x: number, y: number) => void;
  updateIcon: (id: string, icon: DesktopIcon) => void;
  loadHarnessContent: (projectId: string) => Promise<void>;
  saveHarnessContent: (projectId: string, content: string) => void;
  updateProjectConfig: (projectId: string, config: Partial<ProjectConfig>) => void;
}

const reviveDates = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map(reviveDates);
  }

  if (value && typeof value === 'object') {
    const revived: Record<string, unknown> = {};

    Object.entries(value).forEach(([key, item]) => {
      if (
        typeof item === 'string' &&
        (key === 'createdAt' ||
          key === 'modifiedAt' ||
          key === 'lastUpdated' ||
          key === 'established' ||
          key === 'date' ||
          key === 'updatedAt')
      ) {
        revived[key] = new Date(item);
      } else {
        revived[key] = reviveDates(item);
      }
    });

    return revived;
  }

  return value;
};

const loadPersistedIcons = (): DesktopIcon[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return mockDesktopIcons;

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return mockDesktopIcons;

    return reviveDates(parsed) as DesktopIcon[];
  } catch {
    return mockDesktopIcons;
  }
};

const persistIcons = (icons: DesktopIcon[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(icons));
};

const withPersistedIcons = (icons: DesktopIcon[]) => {
  persistIcons(icons);
  return { icons };
};

export const useDesktopStore = create<DesktopStore>((set, get) => ({
  icons: loadPersistedIcons(),
  projectSettingsContent: {},

  setIcons: (icons) => set(withPersistedIcons(icons)),

  selectIcon: (id) => set((state) => ({
    icons: state.icons.map(icon => ({
      ...icon,
      isSelected: icon.id === id
    }))
  })),

  deselectAll: () => set((state) => ({
    icons: state.icons.map(icon => ({
      ...icon,
      isSelected: false
    }))
  })),

  updateIconPosition: (id, x, y) => set((state) => {
    const icons = state.icons.map(icon =>
      icon.id === id ? { ...icon, position: { x, y } } : icon
    );

    return withPersistedIcons(icons);
  }),

  updateIcon: (id, updatedIcon) => set((state) => {
    const icons = state.icons.map(icon =>
      icon.id === id ? updatedIcon : icon
    );

    return withPersistedIcons(icons);
  }),

  loadHarnessContent: async (projectId) => {
    const icon = get().icons.find(i => i.id === projectId);
    if (!icon?.data) return;

    // Generate content from project data
    const content = generateHarnessContent(icon.data);

    set(state => ({
      projectSettingsContent: {
        ...state.projectSettingsContent,
        [projectId]: content
      }
    }));
  },

  saveHarnessContent: (projectId, content) => {
    // Parse content and update project config
    const parsedConfig = parseHarnessMarkdown(content);

    set(state => {
      const icons = state.icons.map(icon =>
        icon.id === projectId && icon.data
          ? {
              ...icon,
              data: {
                ...icon.data,
                config: { ...icon.data.config, ...parsedConfig }
              }
            }
          : icon
      );

      persistIcons(icons);

      return {
        icons,
        projectSettingsContent: {
          ...state.projectSettingsContent,
          [projectId]: content
        }
      };
    });
  },

  updateProjectConfig: (projectId, config) => {
    set(state => {
      const icons = state.icons.map(icon =>
        icon.id === projectId && icon.data
          ? {
              ...icon,
              data: {
                ...icon.data,
                config: { ...icon.data.config, ...config }
              }
            }
          : icon
      );

      return withPersistedIcons(icons);
    });
  }
}));
