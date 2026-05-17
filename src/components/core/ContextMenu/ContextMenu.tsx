import { useEffect, useRef } from 'react';
import styles from './ContextMenu.module.css';

export interface ContextMenuItem {
  label: string;
  icon?: string;
  shortcut?: string;
  action: () => void;
  separator?: boolean;
}

interface ContextMenuProps {
  position: { x: number; y: number };
  items: ContextMenuItem[];
  onClose: () => void;
}

const ContextMenu = ({ position, items, onClose }: ContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Adjust position to keep menu on screen
  useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let adjustedX = position.x;
      let adjustedY = position.y;

      // Adjust horizontal position if menu goes off right edge
      if (rect.right > viewportWidth) {
        adjustedX = viewportWidth - rect.width - 10;
      }

      // Adjust vertical position if menu goes off bottom edge
      if (rect.bottom > viewportHeight) {
        adjustedY = viewportHeight - rect.height - 10;
      }

      if (adjustedX !== position.x || adjustedY !== position.y) {
        menuRef.current.style.left = `${adjustedX}px`;
        menuRef.current.style.top = `${adjustedY}px`;
      }
    }
  }, [position]);

  const handleItemClick = (item: ContextMenuItem) => {
    item.action();
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className={styles.contextMenu}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    >
      {items.map((item, index) => (
        item.separator ? (
          <div key={index} className={styles.separator} />
        ) : (
          <div
            key={index}
            className={styles.menuItem}
            onClick={() => handleItemClick(item)}
          >
            {item.icon && <span className={styles.menuIcon}>{item.icon}</span>}
            <span className={styles.menuLabel}>{item.label}</span>
            {item.shortcut && <span className={styles.menuShortcut}>{item.shortcut}</span>}
          </div>
        )
      ))}
    </div>
  );
};

export default ContextMenu;
