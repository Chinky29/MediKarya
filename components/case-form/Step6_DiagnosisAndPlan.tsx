import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MedicalCase } from '@/types';
import { Plus, X, Trash2 } from 'lucide-react';

interface Step6Props {
  caseData: MedicalCase;
  onChange: (data: Partial<MedicalCase>) => void;
}

export function Step6_DiagnosisAndPlan({ caseData, onChange }: Step6Props) {
  const [newDiff, setNewDiff] = useState('');
  const [newLearning, setNewLearning] = useState('');
  const [newMed, setNewMed] = useState({ name: '', dose: '', frequency: '', duration: '' });

  const updateDx = (updates: Partial<MedicalCase['diagnosisAndPlan']>) => {
    onChange({
      diagnosisAndPlan: { ...caseData.diagnosisAndPlan, ...updates },
    });
  };

  const addDifferential = () => {
    if (newDiff.trim()) {
      updateDx({ differentialDiagnoses: [...caseData.diagnosisAndPlan.differentialDiagnoses, newDiff.trim()] });
      setNewDiff('');
    }
  };

  const removeDifferential = (diff: string) => {
    updateDx({ differentialDiagnoses: caseData.diagnosisAndPlan.differentialDiagnoses.filter(d => d !== diff) });
  };

  const addLearning = () => {
    if (newLearning.trim()) {
      updateDx({ learningPoints: [...caseData.diagnosisAndPlan.learningPoints, newLearning.trim()] });
      setNewLearning('');
    }
  };

  const removeLearning = (lp: string) => {
    updateDx({ learningPoints: caseData.diagnosisAndPlan.learningPoints.filter(l => l !== lp) });
  };

  const addMedication = () => {
    if (newMed.name && newMed.dose && newMed.frequency && newMed.duration) {
      updateDx({ medications: [...caseData.diagnosisAndPlan.medications, newMed] });
      setNewMed({ name: '', dose: '', frequency: '', duration: '' });
    }
  };

  const removeMedication = (idx: number) => {
    updateDx({
      medications: caseData.diagnosisAndPlan.medications.filter((_, i) => i !== idx)
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Diagnosis</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Provisional Diagnosis <span className="text-red-500">*</span></Label>
            <Input
              value={caseData.diagnosisAndPlan.provisionalDiagnosis}
              onChange={(e) => updateDx({ provisionalDiagnosis: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Final Diagnosis</Label>
            <Input
              value={caseData.diagnosisAndPlan.finalDiagnosis || ''}
              onChange={(e) => updateDx({ finalDiagnosis: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Differential Diagnoses</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {caseData.diagnosisAndPlan.differentialDiagnoses.map((diff, idx) => (
                <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                  {diff}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeDifferential(diff)} />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newDiff}
                onChange={(e) => setNewDiff(e.target.value)}
                placeholder="Add a differential diagnosis"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addDifferential())}
              />
              <Button onClick={addDifferential}>
                <Plus className="h-4 w-4 mr-2" /> Add
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Management</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Treatment Plan <span className="text-red-500">*</span></Label>
            <Textarea
              rows={4}
              value={caseData.diagnosisAndPlan.treatmentPlan}
              onChange={(e) => updateDx({ treatmentPlan: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Medications</Label>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <Input
                    placeholder="Drug name"
                    value={newMed.name}
                    onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                  />
                  <Input
                    placeholder="Dose"
                    value={newMed.dose}
                    onChange={(e) => setNewMed({ ...newMed, dose: e.target.value })}
                  />
                  <Input
                    placeholder="Frequency"
                    value={newMed.frequency}
                    onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
                  />
                  <Input
                    placeholder="Duration"
                    value={newMed.duration}
                    onChange={(e) => setNewMed({ ...newMed, duration: e.target.value })}
                  />
                </div>
                <Button onClick={addMedication}>
                  <Plus className="h-4 w-4 mr-2" /> Add Medication
                </Button>
              </CardContent>
            </Card>

            {caseData.diagnosisAndPlan.medications.length > 0 && (
              <div className="space-y-2 mt-4">
                {caseData.diagnosisAndPlan.medications.map((med, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{med.name}</p>
                      <p className="text-sm text-gray-500">
                        {med.dose} • {med.frequency} • {med.duration}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeMedication(idx)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Follow-up Plan <span className="text-red-500">*</span></Label>
            <Textarea
              value={caseData.diagnosisAndPlan.followUp}
              onChange={(e) => updateDx({ followUp: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Prognosis <span className="text-red-500">*</span></Label>
            <Input
              value={caseData.diagnosisAndPlan.prognosis}
              onChange={(e) => updateDx({ prognosis: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Learning Points</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {caseData.diagnosisAndPlan.learningPoints.map((lp, idx) => (
            <Badge key={idx} variant="outline" className="flex items-center gap-1">
              {lp}
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeLearning(lp)} />
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newLearning}
            onChange={(e) => setNewLearning(e.target.value)}
            placeholder="Add a learning point"
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addLearning())}
          />
          <Button onClick={addLearning}>
            <Plus className="h-4 w-4 mr-2" /> Add
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Internal Notes</h3>
        <Textarea
          value={caseData.notes || ''}
          onChange={(e) => onChange({ notes: e.target.value })}
          placeholder="Private notes (not visible in published version)"
        />
      </div>
    </div>
  );
}
