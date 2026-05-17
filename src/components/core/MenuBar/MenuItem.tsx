import styles from './MenuBar.module.css';

interface MenuItemProps {
  menu: {
    label: string;
    items: Array<{
      label?: string;
      action?: () => void;
      disabled?: boolean;
      separator?: boolean;
    }>;
  };
  isActive: boolean;
  onMenuClick: (label: string) => void;
  onClose: () => void;
}

const MenuItem = ({ menu, isActive, onMenuClick, onClose }: MenuItemProps) => {
  const handleItemClick = (action?: () => void, disabled?: boolean) => {
    if (!disabled && action) {
      action();
      onClose();
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        className={`${styles.menuItem} ${isActive ? styles.active : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onMenuClick(menu.label);
        }}
      >
        {menu.label || ''}
      </button>

      {isActive && (
        <div className={styles.dropdown}>
          {menu.items.map((item, index) => {
            if (item.separator) {
              return <div key={`sep-${index}`} className={styles.separator} />;
            }

            return (
              <button
                key={item.label}
                className={`${styles.dropdownItem} ${item.disabled ? styles.disabled : ''}`}
                onClick={() => handleItemClick(item.action, item.disabled)}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
