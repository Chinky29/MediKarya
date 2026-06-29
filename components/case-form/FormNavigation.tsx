import { Button } from '@/components/ui/button';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSave: () => void;
  onSubmit: () => void;
}

export function FormNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSave,
  onSubmit,
}: FormNavigationProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex items-center justify-between border-t border-gray-200 pt-6 mt-8">
      <div>
        {!isFirstStep && (
          <Button variant="outline" onClick={onPrevious}>
            Previous
          </Button>
        )}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onSave}>
          Save as Draft
        </Button>

        {!isLastStep ? (
          <Button onClick={onNext}>
            Next Step
          </Button>
        ) : (
          <Button onClick={onSubmit}>
            Complete Case
          </Button>
        )}
      </div>
    </div>
  );
}
