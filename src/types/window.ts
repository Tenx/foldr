import { Position, Size } from './desktop';

export interface WindowState {
  id: string;
  title: string;
  position: Position;
  size: Size;
  zIndex: number;
  isActive: boolean;
  content: WindowContent;
}

export interface WindowContent {
  type: 'folder' | 'document' | 'settings';
  data?: unknown;
}

export interface WindowBounds {
  minWidth: number;
  minHeight: number;
  maxWidth?: number;
  maxHeight?: number;
}
