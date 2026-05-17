import { useState, useEffect, useCallback, useRef } from 'react';

interface UseDraggableProps {
  onDrag?: (x: number, y: number) => void;
  onDragStart?: () => void;
  onDragEnd?: (x: number, y: number) => void;
  initialPosition?: { x: number; y: number };
}

export const useDraggable = ({
  onDrag,
  onDragStart,
  onDragEnd,
  initialPosition = { x: 0, y: 0 }
}: UseDraggableProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(initialPosition);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const elementStartPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    elementStartPos.current = position;

    if (onDragStart) {
      onDragStart();
    }
  }, [position, onDragStart]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragStartPos.current.x;
      const deltaY = e.clientY - dragStartPos.current.y;

      const newX = elementStartPos.current.x + deltaX;
      const newY = Math.max(20, elementStartPos.current.y + deltaY); // Keep below menu bar

      setPosition({ x: newX, y: newY });

      if (onDrag) {
        onDrag(newX, newY);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      setIsDragging(false);

      if (onDragEnd) {
        const deltaX = e.clientX - dragStartPos.current.x;
        const deltaY = e.clientY - dragStartPos.current.y;
        const finalX = elementStartPos.current.x + deltaX;
        const finalY = Math.max(20, elementStartPos.current.y + deltaY);
        onDragEnd(finalX, finalY);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onDrag, onDragEnd]);

  return {
    position,
    isDragging,
    handleMouseDown
  };
};
