import React from 'react';
import './Stepper.css';
import { Check } from 'lucide-react';

export function Stepper({ steps, currentStep }) {
  return (
    <div className="stepper-container">
      {steps.map((step, index) => {
        const isCompleted = index + 1 < currentStep;
        const isActive = index + 1 === currentStep;
        
        return (
          <React.Fragment key={index}>
            <div className={`stepper-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
              <div className="stepper-circle">
                {isCompleted ? <Check size={16} strokeWidth={3} /> : index + 1}
              </div>
              <span className="stepper-label">{step}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`stepper-line ${isCompleted ? 'completed' : ''}`}></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
