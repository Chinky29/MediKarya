import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MedicalCase } from '@/types';

interface Step2Props {
  caseData: MedicalCase;
  onChange: (data: Partial<MedicalCase>) => void;
}

export function Step2_ChiefComplaint({ caseData, onChange }: Step2Props) {
  const updateHistory = (updates: Partial<MedicalCase['medicalHistory']>) => {
    onChange({
      medicalHistory: { ...caseData.medicalHistory, ...updates },
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Chief Complaint & History</h3>

        <div className="space-y-2">
          <Label htmlFor="chiefComplaint">Chief Complaint <span className="text-red-500">*</span></Label>
          <Input
            id="chiefComplaint"
            value={caseData.medicalHistory.chiefComplaint}
            onChange={(e) => updateHistory({ chiefComplaint: e.target.value })}
            placeholder="e.g., Chest pain for 2 hours"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hpi">History of Presenting Illness <span className="text-red-500">*</span></Label>
          <Textarea
            id="hpi"
            rows={8}
            value={caseData.medicalHistory.historyOfPresentingIllness}
            onChange={(e) => updateHistory({ historyOfPresentingIllness: e.target.value })}
            placeholder="Describe the history in detail..."
          />
          <p className="text-sm text-gray-500">
            {caseData.medicalHistory.historyOfPresentingIllness.length} characters
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="familyHistory">Family History</Label>
          <Textarea
            id="familyHistory"
            value={caseData.medicalHistory.familyHistory}
            onChange={(e) => updateHistory({ familyHistory: e.target.value })}
            placeholder="Relevant family history..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="socialHistory">Social History</Label>
          <Textarea
            id="socialHistory"
            value={caseData.medicalHistory.socialHistory}
            onChange={(e) => updateHistory({ socialHistory: e.target.value })}
            placeholder="Smoking, alcohol, occupation..."
          />
        </div>
      </div>
    </div>
  );
}
