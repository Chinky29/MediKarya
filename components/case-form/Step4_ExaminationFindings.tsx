import { useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MedicalCase } from '@/types';
import { calculateBMI } from '@/lib/utils';

interface Step4Props {
  caseData: MedicalCase;
  onChange: (data: Partial<MedicalCase>) => void;
}

export function Step4_ExaminationFindings({ caseData, onChange }: Step4Props) {
  const updateExam = (updates: Partial<MedicalCase['examinationFindings']>) => {
    onChange({
      examinationFindings: { ...caseData.examinationFindings, ...updates },
    });
  };

  const updateVitals = (key: string, value: string) => {
    const newVitals = { ...caseData.examinationFindings.vitalSigns, [key]: value };
    if ((key === 'weight' || key === 'height') && newVitals.weight && newVitals.height) {
      newVitals.bmi = calculateBMI(newVitals.weight, newVitals.height);
    }
    updateExam({ vitalSigns: newVitals });
  };

  const updateSystemic = (key: string, value: string) => {
    updateExam({
      systemicExamination: { ...caseData.examinationFindings.systemicExamination, [key]: value },
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">General Appearance</h3>
        <Textarea
          value={caseData.examinationFindings.generalAppearance}
          onChange={(e) => updateExam({ generalAppearance: e.target.value })}
          placeholder="Describe the patient's general appearance..."
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Vital Signs</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>BP</Label>
            <Input
              value={caseData.examinationFindings.vitalSigns.bloodPressure}
              onChange={(e) => updateVitals('bloodPressure', e.target.value)}
              placeholder="120/80 mmHg"
            />
          </div>
          <div className="space-y-2">
            <Label>Heart Rate</Label>
            <Input
              value={caseData.examinationFindings.vitalSigns.heartRate}
              onChange={(e) => updateVitals('heartRate', e.target.value)}
              placeholder="72 bpm"
            />
          </div>
          <div className="space-y-2">
            <Label>Respiratory Rate</Label>
            <Input
              value={caseData.examinationFindings.vitalSigns.respiratoryRate}
              onChange={(e) => updateVitals('respiratoryRate', e.target.value)}
              placeholder="16/min"
            />
          </div>
          <div className="space-y-2">
            <Label>Temperature</Label>
            <Input
              value={caseData.examinationFindings.vitalSigns.temperature}
              onChange={(e) => updateVitals('temperature', e.target.value)}
              placeholder="98.6°F"
            />
          </div>
          <div className="space-y-2">
            <Label>SpO2</Label>
            <Input
              value={caseData.examinationFindings.vitalSigns.oxygenSaturation}
              onChange={(e) => updateVitals('oxygenSaturation', e.target.value)}
              placeholder="98%"
            />
          </div>
          <div className="space-y-2">
            <Label>Weight (kg)</Label>
            <Input
              type="number"
              value={caseData.examinationFindings.vitalSigns.weight}
              onChange={(e) => updateVitals('weight', e.target.value)}
              placeholder="70"
            />
          </div>
          <div className="space-y-2">
            <Label>Height (cm)</Label>
            <Input
              type="number"
              value={caseData.examinationFindings.vitalSigns.height}
              onChange={(e) => updateVitals('height', e.target.value)}
              placeholder="170"
            />
          </div>
          <div className="space-y-2">
            <Label>BMI</Label>
            <Input
              value={caseData.examinationFindings.vitalSigns.bmi || ''}
              disabled
              placeholder="Auto-calculated"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Systemic Examination</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(caseData.examinationFindings.systemicExamination).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
              <Textarea
                value={value}
                onChange={(e) => updateSystemic(key, e.target.value)}
                placeholder={`Enter ${key} findings...`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
