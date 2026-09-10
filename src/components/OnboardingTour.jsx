import React, { useState } from 'react';
import { Joyride, STATUS } from 'react-joyride';

export function OnboardingTour({ run, onFinish }) {
  const [steps] = useState([
    {
      target: '.tour-sidebar',
      content: 'This is your main navigation. Access your dashboard, document vault, tracking, and settings from here.',
      placement: 'right',
      disableBeacon: true,
    },
    {
      target: '.tour-search',
      content: 'Press Ctrl+K (or Cmd+K) anytime to instantly search for approvals or jump to pages.',
      placement: 'bottom',
    },
    {
      target: '.tour-quick-actions',
      content: 'Start a new application or find eligible schemes using these quick actions.',
      placement: 'bottom',
    },
    {
      target: '.chat-fab',
      content: 'Need help? Click here to chat with Udyam Mitra, our 24/7 AI assistant.',
      placement: 'left',
    }
  ]);

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
    
    if (finishedStatuses.includes(status)) {
      onFinish();
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous={true}
      showSkipButton={true}
      showProgress={true}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          arrowColor: 'var(--surface-color)',
          backgroundColor: 'var(--surface-color)',
          primaryColor: 'var(--primary-600)',
          textColor: 'var(--text-primary)',
          overlayColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 10000,
        },
        tooltip: {
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid var(--border-color)',
          fontFamily: 'inherit',
        },
        buttonNext: {
          borderRadius: 'var(--radius-md)',
          fontWeight: 600,
        },
        buttonBack: {
          color: 'var(--text-secondary)',
        },
        buttonSkip: {
          color: 'var(--text-muted)',
        }
      }}
    />
  );
}
