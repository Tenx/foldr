import { useState, useEffect } from 'react';
import styles from './Tutorial.module.css';

interface TutorialStep {
  spotlightSelector?: string;
  spotlightRect?: { top: number; left: number; width: number; height: number };
  instructionPosition: { top?: number; bottom?: number; left?: number; right?: number };
  arrowDirection: 'up' | 'down' | 'left' | 'right';
  arrowPosition: { top?: number; bottom?: number; left?: number; right?: number };
  title: string;
  text: string;
  waitForAction?: boolean;
  actionText?: string;
}

interface InteractiveTutorialProps {
  onComplete: () => void;
  onSkip: () => void;
}

const InteractiveTutorial = ({ onComplete, onSkip }: InteractiveTutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [spotlightRect, setSpotlightRect] = useState<DOMRect | null>(null);

  const steps: TutorialStep[] = [
    {
      spotlightSelector: '#icon-folder-1',
      instructionPosition: { top: 80, left: 150 },
      arrowDirection: 'left',
      arrowPosition: { top: 100, left: 120 },
      title: 'These are your Projects',
      text: 'Each folder represents a project containing AI agents. Double-click any folder to explore what\'s inside!',
      waitForAction: true,
      actionText: 'Try it now →'
    },
    {
      spotlightSelector: '#menuBar',
      instructionPosition: { top: 60, left: 150 },
      arrowDirection: 'up',
      arrowPosition: { top: 30, left: 200 },
      title: 'Manage with Menus',
      text: 'Use the menu bar to create new projects, start/stop agents, and organize your workspace.',
      waitForAction: false
    },
    {
      instructionPosition: { top: 250, left: 150 },
      arrowDirection: 'left',
      arrowPosition: { top: 300, left: 120 },
      title: 'Inside Your Project',
      text: 'You\'ll see all agents in this project. Each agent has a specific role and status indicator.',
      waitForAction: false
    }
  ];

  useEffect(() => {
    const updateSpotlight = () => {
      if (steps[currentStep].spotlightSelector) {
        const element = document.querySelector(steps[currentStep].spotlightSelector!);
        if (element) {
          const rect = element.getBoundingClientRect();
          setSpotlightRect(rect);
        }
      }
    };

    updateSpotlight();
    // Update spotlight on window resize or after a delay for animations
    const timer = setTimeout(updateSpotlight, 100);
    window.addEventListener('resize', updateSpotlight);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateSpotlight);
    };
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    localStorage.setItem('tutorialCompleted', 'true');
    onComplete();
  };

  const handleSkipTutorial = () => {
    localStorage.setItem('tutorialCompleted', 'true');
    onSkip();
  };

  const step = steps[currentStep];
  const rect = step.spotlightRect || (spotlightRect ? {
    top: spotlightRect.top,
    left: spotlightRect.left,
    width: spotlightRect.width,
    height: spotlightRect.height
  } : null);

  return (
    <div className={styles.tutorialOverlay}>
      {/* Spotlight on target element */}
      {rect && (
        <div
          className={styles.spotlight}
          style={{
            top: rect.top - 8,
            left: rect.left - 8,
            width: rect.width + 16,
            height: rect.height + 16
          }}
        />
      )}

      {/* Arrow pointing to target */}
      <div
        className={`${styles.arrow} ${styles[step.arrowDirection]}`}
        style={{
          top: step.arrowPosition.top,
          bottom: step.arrowPosition.bottom,
          left: step.arrowPosition.left,
          right: step.arrowPosition.right
        }}
      />

      {/* Instruction box */}
      <div
        className={styles.instructionBox}
        style={{
          top: step.instructionPosition.top,
          bottom: step.instructionPosition.bottom,
          left: step.instructionPosition.left,
          right: step.instructionPosition.right
        }}
      >
        <div className={styles.instructionHeader}>
          <div className={styles.stepNumber}>{currentStep + 1}</div>
          <div className={styles.instructionTitle}>{step.title}</div>
        </div>

        <div className={styles.instructionText}>{step.text}</div>

        <div className={styles.instructionButtons}>
          {currentStep > 0 && (
            <button
              className={styles.tutorialButton}
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Back
            </button>
          )}
          <button
            className={`${styles.tutorialButton} ${styles.primary}`}
            onClick={handleNext}
          >
            {step.waitForAction ? step.actionText : currentStep === steps.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>

      {/* Skip tutorial link */}
      <div
        className={styles.skipTutorial}
        onClick={handleSkipTutorial}
        style={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)' }}
      >
        Skip Tutorial
      </div>
    </div>
  );
};

export default InteractiveTutorial;
