'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCases } from '@/hooks/useCases';
import { useFormStep } from '@/hooks/useFormStep';
import { StepIndicator } from '@/components/case-form/StepIndicator';
import { Step1_PatientDetails } from '@/components/case-form/Step1_PatientDetails';
import { Step2_ChiefComplaint } from '@/components/case-form/Step2_ChiefComplaint';
import { Step3_MedicalHistory } from '@/components/case-form/Step3_MedicalHistory';
import { Step4_ExaminationFindings } from '@/components/case-form/Step4_ExaminationFindings';
import { Step6_DiagnosisAndPlan } from '@/components/case-form/Step6_DiagnosisAndPlan';
import { FormNavigation } from '@/components/case-form/FormNavigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MedicalCase } from '@/types';
import { generateId } from '@/lib/utils';

export default function NewCasePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template');
  const { state, dispatch, createCase } = useCases();
  const { currentStep, nextStep, prevStep, totalSteps, progress } = useFormStep(5);

  const [caseData, setCaseData] = useState<MedicalCase | null>(null);

  useEffect(() => {
    if (templateId) {
      const template = state.cases.find(c => c.id === templateId);
      if (template) {
        setCaseData({
          ...template,
          id: generateId(),
          title: `${template.title} (Copy)`,
          status: 'Draft',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
    } else {
      const newCase = createCase({});
      setCaseData(newCase);
    }
  }, [templateId, state.cases]);

  const handleUpdate = (updates: Partial<MedicalCase>) => {
    if (!caseData) return;
    const updated = { ...caseData, ...updates, updatedAt: new Date().toISOString() };
    setCaseData(updated);
    if (templateId) {
      dispatch({ type: 'ADD_CASE', payload: updated });
    } else {
      dispatch({ type: 'UPDATE_CASE', payload: updated });
    }
  };

  const handleSave = () => {
    if (!caseData) return;
    const updated = { ...caseData, status: 'Draft', updatedAt: new Date().toISOString() };
    setCaseData(updated);
    if (templateId) {
      dispatch({ type: 'ADD_CASE', payload: updated });
    } else {
      dispatch({ type: 'UPDATE_CASE', payload: updated });
    }
    router.push('/cases');
  };

  const handleSubmit = () => {
    if (!caseData) return;
    const updated = { ...caseData, status: 'In Progress', updatedAt: new Date().toISOString() };
    setCaseData(updated);
    if (templateId) {
      dispatch({ type: 'ADD_CASE', payload: updated });
    } else {
      dispatch({ type: 'UPDATE_CASE', payload: updated });
    }
    router.push(`/cases/${updated.id}`);
  };

  if (!caseData) return null;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1_PatientDetails caseData={caseData} onChange={handleUpdate} />;
      case 2:
        return <Step2_ChiefComplaint caseData={caseData} onChange={handleUpdate} />;
      case 3:
        return <Step3_MedicalHistory caseData={caseData} onChange={handleUpdate} />;
      case 4:
        return <Step4_ExaminationFindings caseData={caseData} onChange={handleUpdate} />;
      case 5:
        return <Step6_DiagnosisAndPlan caseData={caseData} onChange={handleUpdate} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{templateId ? 'Use Template' : 'Create New Case'}</h1>
        <p className="text-gray-500 mt-1">Fill in the details step by step</p>
      </div>

      <Card>
        <CardHeader>
          <StepIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
            progress={progress}
          />
        </CardHeader>
        <CardContent>
          {renderStep()}
          <FormNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            onPrevious={prevStep}
            onNext={nextStep}
            onSave={handleSave}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
}
