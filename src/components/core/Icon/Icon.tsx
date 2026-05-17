import { useRef, useState } from 'react';
import { DesktopIcon } from '../../../types/desktop';
import { useDesktopStore } from '../../../store/desktopStore';
import { useNavigationStore } from '../../../store/navigationStore';
import { useDoubleClick } from '../../../hooks/useDoubleClick';
import FolderIcon from './FolderIcon';
import ContextMenu from '../ContextMenu/ContextMenu';
import ProjectSettingsWindow from '../../views/ProjectSettingsWindow';
import styles from './Icon.module.css';

interface IconProps {
  icon: DesktopIcon;
}

const Icon = ({ icon }: IconProps) => {
  const [contextMenuPosition, setContextMenuPosition] = useState<{x: number, y: number} | null>(null);
  const [showProjectSettings, setShowProjectSettings] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const iconStartRef = useRef(icon.position);
  const didDragRef = useRef(false);

  const selectIcon = useDesktopStore((state) => state.selectIcon);
  const updateIconPosition = useDesktopStore((state) => state.updateIconPosition);
  const navigateToProject = useNavigationStore((state) => state.navigateToProject);

  const handleSingleClick = () => {
    selectIcon(icon.id);
  };

  const handleDoubleClick = () => {
    if (icon.type === 'folder' && icon.data) {
      // Navigate into the project (like opening a folder)
      navigateToProject(icon.id, icon.label);
    }
  };

  const handleClick = useDoubleClick(handleSingleClick, handleDoubleClick);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    selectIcon(icon.id); // Select the icon when right-clicking
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;

    e.preventDefault();
    e.stopPropagation();

    selectIcon(icon.id);
    setIsDragging(true);
    didDragRef.current = false;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    iconStartRef.current = icon.position;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - dragStartRef.current.x;
      const deltaY = moveEvent.clientY - dragStartRef.current.y;

      if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
        didDragRef.current = true;
      }

      updateIconPosition(
        icon.id,
        Math.max(0, iconStartRef.current.x + deltaX),
        Math.max(24, iconStartRef.current.y + deltaY)
      );
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const openProjectSettings = () => {
    setShowProjectSettings(true);
  };

  return (
    <>
      <div
        id={`icon-${icon.id}`}
        className={`${styles.icon} ${icon.isSelected ? styles.selected : ''} ${isDragging ? styles.dragging : ''}`}
        style={{
          left: icon.position.x,
          top: icon.position.y
        }}
        onMouseDown={handleMouseDown}
        onClick={(e) => {
          e.stopPropagation();
          if (didDragRef.current) {
            didDragRef.current = false;
            return;
          }
          handleClick();
        }}
        onContextMenu={handleContextMenu}
      >
        <div className={styles.iconImage}>
          {icon.type === 'folder' && <FolderIcon />}
        </div>
        <div className={styles.iconLabel}>{icon.label}</div>
      </div>

      {contextMenuPosition && icon.type === 'folder' && (
        <ContextMenu
          position={contextMenuPosition}
          onClose={() => setContextMenuPosition(null)}
          items={[
            {
              label: 'Open',
              icon: '📂',
              action: handleDoubleClick
            },
            {
              label: 'Project Settings',
              icon: '⚙️',
              action: openProjectSettings
            }
          ]}
        />
      )}

      {showProjectSettings && (
        <ProjectSettingsWindow
          projectId={icon.id}
          onClose={() => setShowProjectSettings(false)}
        />
      )}
    </>
  );
};

export default Icon;
