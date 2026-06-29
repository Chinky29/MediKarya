import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { SPECIALTIES, DIFFICULTY_OPTIONS, GENDER_OPTIONS } from '@/lib/constants';
import { MedicalCase } from '@/types';

interface Step1Props {
  caseData: MedicalCase;
  onChange: (data: Partial<MedicalCase>) => void;
}

export function Step1_PatientDetails({ caseData, onChange }: Step1Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Case Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Case Title <span className="text-red-500">*</span></Label>
            <Input
              id="title"
              value={caseData.title}
              onChange={(e) => onChange({ title: e.target.value })}
              placeholder="Enter case title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="specialty">Specialty <span className="text-red-500">*</span></Label>
            <Select
              id="specialty"
              value={caseData.specialty}
              onChange={(e) => onChange({ specialty: e.target.value })}
            >
              {SPECIALTIES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty <span className="text-red-500">*</span></Label>
            <Select
              id="difficulty"
              value={caseData.difficulty}
              onChange={(e) => onChange({ difficulty: e.target.value as any })}
            >
              {DIFFICULTY_OPTIONS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              value={caseData.tags.join(', ')}
              onChange={(e) => onChange({ tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
              placeholder="e.g., STEMI, Cardiology"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Patient Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="patientId">Patient ID</Label>
            <Input
              id="patientId"
              value={caseData.patientDetails.patientId}
              onChange={(e) => onChange({
                patientDetails: { ...caseData.patientDetails, patientId: e.target.value },
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age <span className="text-red-500">*</span></Label>
            <Input
              id="age"
              type="number"
              value={caseData.patientDetails.age || ''}
              onChange={(e) => onChange({
                patientDetails: { ...caseData.patientDetails, age: parseInt(e.target.value) || 0 },
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender <span className="text-red-500">*</span></Label>
            <Select
              id="gender"
              value={caseData.patientDetails.gender}
              onChange={(e) => onChange({
                patientDetails: { ...caseData.patientDetails, gender: e.target.value as any },
              })}
            >
              {GENDER_OPTIONS.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="occupation">Occupation</Label>
            <Input
              id="occupation"
              value={caseData.patientDetails.occupation}
              onChange={(e) => onChange({
                patientDetails: { ...caseData.patientDetails, occupation: e.target.value },
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={caseData.patientDetails.location}
              onChange={(e) => onChange({
                patientDetails: { ...caseData.patientDetails, location: e.target.value },
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="presentingDate">Presenting Date <span className="text-red-500">*</span></Label>
            <Input
              id="presentingDate"
              type="date"
              value={caseData.patientDetails.presentingDate}
              onChange={(e) => onChange({
                patientDetails: { ...caseData.patientDetails, presentingDate: e.target.value },
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
