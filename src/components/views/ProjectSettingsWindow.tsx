import { useState, useEffect } from 'react';
import { useDraggable } from '../../hooks/useDraggable';
import { useDesktopStore } from '../../store/desktopStore';
import { renderMarkdown } from '../../utils/markdown';
import styles from './ProjectSettingsWindow.module.css';

interface ProjectSettingsWindowProps {
  projectId: string;
  onClose: () => void;
}

const ProjectSettingsWindow = ({ projectId, onClose }: ProjectSettingsWindowProps) => {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('preview');
  const [content, setContent] = useState<string>('');

  const loadHarnessContent = useDesktopStore(state => state.loadHarnessContent);
  const saveHarnessContent = useDesktopStore(state => state.saveHarnessContent);
  const projectSettingsContent = useDesktopStore(state => state.projectSettingsContent);
  const icons = useDesktopStore(state => state.icons);

  const project = icons.find(icon => icon.id === projectId)?.data;

  const { position, isDragging, handleMouseDown } = useDraggable({
    initialPosition: { x: 200, y: 80 }
  });

  // Load content on mount
  useEffect(() => {
    loadHarnessContent(projectId);
  }, [projectId, loadHarnessContent]);

  // Update local content when store content changes
  useEffect(() => {
    if (projectSettingsContent[projectId]) {
      setContent(projectSettingsContent[projectId]);
    }
  }, [projectSettingsContent, projectId]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const nextContent = e.target.value;
    setContent(nextContent);
    saveHarnessContent(projectId, nextContent);
  };

  const renderedPreview = renderMarkdown(content);

  return (
    <div
      className={styles.settingsWindow}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'none'
      }}
    >
      <div
        className={`${styles.titleBar} ${isDragging ? '' : ''}`}
        onMouseDown={handleMouseDown}
      >
        <div className={styles.closeButton} onClick={onClose} />
        <div className={styles.title}>
          HARNESS.md - {project?.name || 'Project Settings'}
        </div>
        <div className={styles.saveStatus}>Auto-saved</div>
      </div>

      <div className={styles.tabSwitcher}>
        <button
          className={`${styles.tab} ${activeTab === 'preview' ? styles.active : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'edit' ? styles.active : ''}`}
          onClick={() => setActiveTab('edit')}
        >
          Edit
        </button>
      </div>

      <div className={styles.contentArea}>
        {activeTab === 'edit' ? (
          <div className={styles.splitView}>
            <div className={styles.editorPane}>
              <textarea
                className={styles.editor}
                value={content}
                onChange={handleContentChange}
                placeholder="# Company Name - Project Configuration

## Project Metadata
..."
                spellCheck={false}
              />
            </div>
            <div className={styles.previewPane}>
              <div
                className={styles.preview}
                dangerouslySetInnerHTML={{ __html: renderedPreview }}
              />
            </div>
          </div>
        ) : (
          <div className={styles.singlePane}>
            <div
              className={styles.preview}
              dangerouslySetInnerHTML={{ __html: renderedPreview }}
            />
          </div>
        )}
      </div>

      <div className={styles.actionBar}>
        <span className={styles.autosaveNote}>
          Changes save automatically on this device.
        </span>
      </div>
    </div>
  );
};

export default ProjectSettingsWindow;
