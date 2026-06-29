'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCases } from '@/hooks/useCases';
import { useFormStep } from '@/hooks/useFormStep';
import { StepIndicator } from '@/components/case-form/StepIndicator';
import { Step1_PatientDetails } from '@/components/case-form/Step1_PatientDetails';
import { Step2_ChiefComplaint } from '@/components/case-form/Step2_ChiefComplaint';
import { Step3_MedicalHistory } from '@/components/case-form/Step3_MedicalHistory';
import { Step4_ExaminationFindings } from '@/components/case-form/Step4_ExaminationFindings';
import { Step5_Investigations } from '@/components/case-form/Step5_Investigations';
import { Step6_DiagnosisAndPlan } from '@/components/case-form/Step6_DiagnosisAndPlan';
import { FormNavigation } from '@/components/case-form/FormNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MedicalCase } from '@/types';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function EditCasePage() {
  const params = useParams();
  const router = useRouter();
  const { state, dispatch } = useCases();
  const { currentStep, nextStep, prevStep, totalSteps, progress } = useFormStep();

  const [caseData, setCaseData] = useState<MedicalCase | null>(null);

  useEffect(() => {
    const caseItem = state.cases.find(c => c.id === params.id);
    if (caseItem) {
      setCaseData(caseItem);
    } else {
      router.push('/cases');
    }
  }, [params.id, state.cases, router]);

  const handleUpdate = (updates: Partial<MedicalCase>) => {
    if (!caseData) return;
    const updated = { ...caseData, ...updates, updatedAt: new Date().toISOString() };
    setCaseData(updated);
    dispatch({ type: 'UPDATE_CASE', payload: updated });
  };

  const handleSave = () => {
    if (!caseData) return;
    const updated = { ...caseData, status: 'Draft', updatedAt: new Date().toISOString() };
    setCaseData(updated);
    dispatch({ type: 'UPDATE_CASE', payload: updated });
    router.push(`/cases/${caseData.id}`);
  };

  const handleSubmit = () => {
    if (!caseData) return;
    const updated = { ...caseData, status: 'In Progress', updatedAt: new Date().toISOString() };
    setCaseData(updated);
    dispatch({ type: 'UPDATE_CASE', payload: updated });
    router.push(`/cases/${caseData.id}`);
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
        return <Step5_Investigations caseData={caseData} onChange={handleUpdate} />;
      case 6:
        return <Step6_DiagnosisAndPlan caseData={caseData} onChange={handleUpdate} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.push(`/cases/${caseData.id}`)}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Case</h1>
          <p className="text-gray-500 mt-1">{caseData.title}</p>
        </div>
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
