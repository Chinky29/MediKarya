import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PAST_MEDICAL_HISTORY_OPTIONS } from '@/lib/constants';
import { MedicalCase } from '@/types';
import { X, Plus } from 'lucide-react';

interface Step3Props {
  caseData: MedicalCase;
  onChange: (data: Partial<MedicalCase>) => void;
}

export function Step3_MedicalHistory({ caseData, onChange }: Step3Props) {
  const [newAllergy, setNewAllergy] = useState('');
  const [newMedication, setNewMedication] = useState('');

  const updateHistory = (updates: Partial<MedicalCase['medicalHistory']>) => {
    onChange({
      medicalHistory: { ...caseData.medicalHistory, ...updates },
    });
  };

  const togglePMH = (item: string) => {
    const pmh = caseData.medicalHistory.pastMedicalHistory;
    updateHistory({
      pastMedicalHistory: pmh.includes(item)
        ? pmh.filter(i => i !== item)
        : [...pmh, item],
    });
  };

  const addAllergy = () => {
    if (newAllergy.trim()) {
      updateHistory({
        allergies: [...caseData.medicalHistory.allergies, newAllergy.trim()],
      });
      setNewAllergy('');
    }
  };

  const removeAllergy = (allergy: string) => {
    updateHistory({
      allergies: caseData.medicalHistory.allergies.filter(a => a !== allergy),
    });
  };

  const addMedication = () => {
    if (newMedication.trim()) {
      updateHistory({
        currentMedications: [...caseData.medicalHistory.currentMedications, newMedication.trim()],
      });
      setNewMedication('');
    }
  };

  const removeMedication = (med: string) => {
    updateHistory({
      currentMedications: caseData.medicalHistory.currentMedications.filter(m => m !== med),
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Past Medical History</h3>
        <div className="flex flex-wrap gap-2">
          {PAST_MEDICAL_HISTORY_OPTIONS.map(item => (
            <button
              key={item}
              type="button"
              onClick={() => togglePMH(item)}
              className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                caseData.medicalHistory.pastMedicalHistory.includes(item)
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Allergies</h3>
        <div className="flex gap-2 flex-wrap mb-2">
          {caseData.medicalHistory.allergies.map((allergy, idx) => (
            <Badge key={idx} variant="secondary" className="flex items-center gap-1">
              {allergy}
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeAllergy(allergy)} />
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newAllergy}
            onChange={(e) => setNewAllergy(e.target.value)}
            placeholder="Add an allergy"
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addAllergy())}
          />
          <Button type="button" onClick={addAllergy}>
            <Plus className="h-4 w-4 mr-2" /> Add
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Current Medications</h3>
        <div className="flex gap-2 flex-wrap mb-2">
          {caseData.medicalHistory.currentMedications.map((med, idx) => (
            <Badge key={idx} variant="secondary" className="flex items-center gap-1">
              {med}
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeMedication(med)} />
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newMedication}
            onChange={(e) => setNewMedication(e.target.value)}
            placeholder="Add a medication"
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addMedication())}
          />
          <Button type="button" onClick={addMedication}>
            <Plus className="h-4 w-4 mr-2" /> Add
          </Button>
        </div>
      </div>
    </div>
  );
}
