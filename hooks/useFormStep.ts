'use client';

import { useState, useCallback } from 'react';

export const useFormStep = (totalSteps: number = 6) => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, totalSteps]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  }, [totalSteps]);

  return {
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    totalSteps,
    progress: Math.round((currentStep / totalSteps) * 100),
  };
};
