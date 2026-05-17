import { useState, useEffect } from 'react';
import { useDesktopStore } from '../../../store/desktopStore';
import { useNavigationStore } from '../../../store/navigationStore';
import MenuBar from '../MenuBar/MenuBar';
import Icon from '../Icon/Icon';
import ProjectView from '../../views/ProjectView';
import ProjectInfoPanel from '../ProjectInfoPanel/ProjectInfoPanel';
import ProjectSettingsWindow from '../../views/ProjectSettingsWindow';
import WelcomeDialog from '../Dialog/WelcomeDialog';
import InteractiveTutorial from '../Dialog/InteractiveTutorial';
import styles from './Desktop.module.css';

const Desktop = () => {
  const icons = useDesktopStore((state) => state.icons);
  const deselectAll = useDesktopStore((state) => state.deselectAll);
  const currentProjectId = useNavigationStore((state) => state.currentProjectId);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showProjectSettings, setShowProjectSettings] = useState<string | null>(null);

  useEffect(() => {
    // Check if user has seen the welcome dialog
    const hideWelcome = localStorage.getItem('hideWelcomeDialog');
    const tutorialCompleted = localStorage.getItem('tutorialCompleted');

    if (!hideWelcome && !tutorialCompleted) {
      // Show welcome dialog after a short delay
      setTimeout(() => setShowWelcome(true), 500);
    }
  }, []);

  const handleDesktopClick = () => {
    deselectAll();
  };

  const handleStartTutorial = () => {
    setShowTutorial(true);
  };

  const handleCompleteTutorial = () => {
    setShowTutorial(false);
  };

  // Find selected icon for info panel
  const selectedIcon = icons.find(icon => icon.isSelected);

  // If inside a project, show ProjectView instead of desktop
  if (currentProjectId) {
    return (
      <>
        <MenuBar />
        <ProjectView />
      </>
    );
  }

  // Otherwise show desktop with icons
  return (
    <div className={styles.desktop} onClick={handleDesktopClick}>
      <MenuBar />

      <div className={styles.desktopContent}>
        {icons.map((icon) => (
          <Icon key={icon.id} icon={icon} />
        ))}
      </div>

      {selectedIcon?.type === 'folder' && selectedIcon.data && (
        <ProjectInfoPanel
          project={selectedIcon.data}
          onOpenSettings={() => setShowProjectSettings(selectedIcon.id)}
        />
      )}

      {showProjectSettings && (
        <ProjectSettingsWindow
          projectId={showProjectSettings}
          onClose={() => setShowProjectSettings(null)}
        />
      )}

      {showWelcome && (
        <WelcomeDialog
          onClose={() => setShowWelcome(false)}
          onStartTutorial={handleStartTutorial}
        />
      )}

      {showTutorial && (
        <InteractiveTutorial
          onComplete={handleCompleteTutorial}
          onSkip={handleCompleteTutorial}
        />
      )}
    </div>
  );
};

export default Desktop;
