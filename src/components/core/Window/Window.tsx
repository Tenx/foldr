import { WindowState } from '../../../types/window';
import { useWindowStore } from '../../../store/windowStore';
import { useDraggable } from '../../../hooks/useDraggable';
import { ProjectData } from '../../../types/desktop';
import styles from './Window.module.css';

interface WindowProps {
  window: WindowState;
}

const Window = ({ window }: WindowProps) => {
  const closeWindow = useWindowStore((state) => state.closeWindow);
  const focusWindow = useWindowStore((state) => state.focusWindow);
  const updateWindowPosition = useWindowStore((state) => state.updateWindowPosition);

  const { position, handleMouseDown, isDragging } = useDraggable({
    initialPosition: window.position,
    onDragEnd: (x, y) => {
      updateWindowPosition(window.id, x, y);
    },
    onDragStart: () => {
      if (!window.isActive) {
        focusWindow(window.id);
      }
    }
  });

  const handleWindowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.isActive) {
      focusWindow(window.id);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeWindow(window.id);
  };

  const renderContent = () => {
    if (window.content.type === 'folder') {
      const data = window.content.data as ProjectData;

      if (!data || !data.agents || data.agents.length === 0) {
        return <div className={styles.emptyState}>No agents in this project</div>;
      }

      return (
        <div className={styles.agentList}>
          {data.agents.map((agent) => (
            <div key={agent.id} className={styles.agentItem}>
              <div className={`${styles.agentStatus} ${styles[agent.status]}`} />
              <div className={styles.agentName}>{agent.name}</div>
            </div>
          ))}
        </div>
      );
    }

    return <div>Window content</div>;
  };

  return (
    <div
      className={`${styles.window} ${window.isActive ? styles.active : ''}`}
      style={{
        left: isDragging ? position.x : window.position.x,
        top: isDragging ? position.y : window.position.y,
        width: window.size.width,
        height: window.size.height,
        zIndex: window.zIndex
      }}
      onClick={handleWindowClick}
    >
      <div className={styles.titleBar} onMouseDown={handleMouseDown}>
        <div className={styles.closeBox} onClick={handleClose} />
        <div className={styles.title}>{window.title}</div>
      </div>
      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
};

export default Window;
