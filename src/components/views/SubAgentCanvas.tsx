import { useState, useRef, useEffect } from 'react';
import { Agent, SubAgent } from '../../types/desktop';
import styles from './SubAgentCanvas.module.css';

interface SubAgentCanvasProps {
  selectedAgent: Agent | null;
  onUpdateSubAgentPosition: (subAgentId: string, x: number, y: number) => void;
}

const SubAgentCanvas = ({ selectedAgent, onUpdateSubAgentPosition }: SubAgentCanvasProps) => {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [selectedSubAgentId, setSelectedSubAgentId] = useState<string | null>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const nodeStartPos = useRef({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const subAgents = selectedAgent?.subAgents || [];

  const handleMouseDown = (e: React.MouseEvent, subAgent: SubAgent) => {
    if (!subAgent.position) return;

    e.preventDefault();
    setDraggingId(subAgent.id);
    setSelectedSubAgentId(subAgent.id);

    dragStartPos.current = { x: e.clientX, y: e.clientY };
    nodeStartPos.current = { x: subAgent.position.x, y: subAgent.position.y };
  };

  useEffect(() => {
    if (!draggingId) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragStartPos.current.x;
      const deltaY = e.clientY - dragStartPos.current.y;

      const newX = nodeStartPos.current.x + deltaX;
      const newY = nodeStartPos.current.y + deltaY;

      // Update position
      onUpdateSubAgentPosition(draggingId, newX, newY);
    };

    const handleMouseUp = () => {
      setDraggingId(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingId, onUpdateSubAgentPosition]);

  const renderConnections = () => {
    if (!subAgents || subAgents.length === 0) return null;

    return subAgents.map((subAgent) => {
      if (!subAgent.connections || !subAgent.position) return null;

      return subAgent.connections.map((targetId) => {
        const target = subAgents.find((sa) => sa.id === targetId);
        if (!target || !target.position) return null;

        // Calculate line from center of source to center of target
        const x1 = subAgent.position.x + 75; // 150px width / 2
        const y1 = subAgent.position.y + 30; // approximate center height
        const x2 = target.position.x + 75;
        const y2 = target.position.y + 30;

        return (
          <g key={`${subAgent.id}-${targetId}`}>
            <line
              className={styles.connectionLine}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
            />
          </g>
        );
      });
    });
  };

  if (!selectedAgent) {
    return (
      <div className={styles.subAgentSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Sub-Agents</h2>
        </div>
        <div className={styles.emptyCanvas}>
          Select an agent above to view its sub-agents
        </div>
      </div>
    );
  }

  if (!subAgents || subAgents.length === 0) {
    return (
      <div className={styles.subAgentSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Sub-Agents
            <span className={styles.agentBadge}>{selectedAgent.name}</span>
          </h2>
        </div>
        <div className={styles.emptyCanvas}>
          This agent has no sub-agents
        </div>
      </div>
    );
  }

  return (
    <div className={styles.subAgentSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          Sub-Agents
          <span className={styles.agentBadge}>{selectedAgent.name}</span>
        </h2>
      </div>

      <div className={styles.canvas} ref={canvasRef}>
        {/* SVG for connection lines */}
        <svg className={styles.canvasSvg}>
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="black" />
            </marker>
          </defs>
          {renderConnections()}
        </svg>

        {/* Sub-agent nodes */}
        {subAgents.map((subAgent) => {
          if (!subAgent.position) return null;

          return (
            <div
              key={subAgent.id}
              className={`${styles.subAgentNode} ${
                draggingId === subAgent.id ? styles.dragging : ''
              } ${selectedSubAgentId === subAgent.id ? styles.selected : ''}`}
              style={{
                left: subAgent.position.x,
                top: subAgent.position.y
              }}
              onMouseDown={(e) => handleMouseDown(e, subAgent)}
            >
              <div className={styles.nodeHeader}>
                <div className={`${styles.nodeStatus} ${styles[subAgent.status]}`} />
                <div className={styles.nodeName}>{subAgent.name}</div>
              </div>
              <div className={styles.nodeDescription}>{subAgent.description}</div>
            </div>
          );
        })}
      </div>

      <div className={styles.instructions}>
        <strong>💡 Tip:</strong> Drag sub-agents to rearrange them. Arrows show the flow of data between sub-agents.
      </div>
    </div>
  );
};

export default SubAgentCanvas;
