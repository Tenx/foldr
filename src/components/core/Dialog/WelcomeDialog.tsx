import { useState } from 'react';
import styles from './Dialog.module.css';

interface WelcomeDialogProps {
  onClose: () => void;
  onStartTutorial: () => void;
}

const WelcomeDialog = ({ onClose, onStartTutorial }: WelcomeDialogProps) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleGetStarted = () => {
    if (dontShowAgain) {
      localStorage.setItem('hideWelcomeDialog', 'true');
    }
    onClose();
    // Launch interactive tutorial
    setTimeout(() => onStartTutorial(), 300);
  };

  const handleSkip = () => {
    if (dontShowAgain) {
      localStorage.setItem('hideWelcomeDialog', 'true');
    }
    localStorage.setItem('tutorialCompleted', 'true');
    onClose();
  };

  return (
    <div className={styles.dialogOverlay} onClick={handleSkip}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.titleBar}>
          <div className={styles.title}>Welcome to Foldr</div>
        </div>

        <div className={styles.content}>
          <h2>Getting Started with Foldr</h2>

          <p>
            Foldr helps you organize and control your AI agents using a familiar
            desktop metaphor. Here's how it works:
          </p>

          <ul className={styles.instructionList}>
            <li className={styles.instructionItem}>
              <div className={styles.instructionNumber}>1</div>
              <div className={styles.instructionText}>
                <strong>Projects are your main containers</strong>
                Each project (folder) represents a major task or goal. For example:
                "Data Analysis", "Web Scraper", or "Email Bot".
              </div>
            </li>

            <li className={styles.instructionItem}>
              <div className={styles.instructionNumber}>2</div>
              <div className={styles.instructionText}>
                <strong>Agents live inside projects</strong>
                Within each project, you can create different sub-agents that work
                together. Each agent has a specific job to fulfill your project goals.
              </div>
            </li>

            <li className={styles.instructionItem}>
              <div className={styles.instructionNumber}>3</div>
              <div className={styles.instructionText}>
                <strong>Organize like your desktop</strong>
                Double-click folders to open them, drag windows to organize, and
                click agents to see their status. It's just like managing files!
              </div>
            </li>
          </ul>

          <p style={{ marginTop: '16px', fontWeight: 'bold' }}>
            Click "Get Started" for an interactive tutorial!
          </p>
        </div>

        <div className={styles.buttonBar}>
          <button className={styles.button} onClick={handleSkip}>
            Skip Tutorial
          </button>
          <button className={`${styles.button} ${styles.primary}`} onClick={handleGetStarted}>
            Get Started
          </button>
        </div>

        <div className={styles.dontShowAgain}>
          <input
            type="checkbox"
            id="dontShowAgain"
            checked={dontShowAgain}
            onChange={(e) => setDontShowAgain(e.target.checked)}
          />
          <label htmlFor="dontShowAgain">Don't show this again</label>
        </div>
      </div>
    </div>
  );
};

export default WelcomeDialog;
