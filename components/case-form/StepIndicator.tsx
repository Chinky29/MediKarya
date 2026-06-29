import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  progress: number;
}

const steps = [
  { number: 1, label: 'Patient Details' },
  { number: 2, label: 'History' },
  { number: 3, label: 'Medical History' },
  { number: 4, label: 'Examination' },
  { number: 5, label: 'Investigations' },
  { number: 6, label: 'Diagnosis & Plan' },
];

export function StepIndicator({ currentStep, totalSteps, progress }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        {steps.map((step) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;
          return (
            <div key={step.number} className="flex flex-col items-center flex-1">
              <div
                className={cn(
                  'flex items-center justify-center h-10 w-10 rounded-full border-2 text-sm font-semibold transition-colors',
                  isCompleted
                    ? 'bg-primary border-primary text-white'
                    : isCurrent
                    ? 'border-primary text-primary bg-white'
                    : 'border-gray-300 text-gray-400 bg-white'
                )}
              >
                {isCompleted ? <Check className="h-5 w-5" /> : step.number}
              </div>
              <span
                className={cn(
                  'text-xs mt-2 text-center hidden sm:block',
                  isCurrent ? 'text-primary font-medium' : 'text-gray-500'
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
