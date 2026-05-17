import { useRef, useCallback } from 'react';

const DOUBLE_CLICK_DELAY = 300; // milliseconds

export const useDoubleClick = (
  onSingleClick?: () => void,
  onDoubleClick?: () => void
) => {
  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback(() => {
    clickCount.current += 1;

    if (clickCount.current === 1) {
      clickTimer.current = setTimeout(() => {
        if (onSingleClick) {
          onSingleClick();
        }
        clickCount.current = 0;
      }, DOUBLE_CLICK_DELAY);
    } else if (clickCount.current === 2) {
      if (clickTimer.current) {
        clearTimeout(clickTimer.current);
      }
      if (onDoubleClick) {
        onDoubleClick();
      }
      clickCount.current = 0;
    }
  }, [onSingleClick, onDoubleClick]);

  return handleClick;
};
