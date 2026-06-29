import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MedicalCase, Investigation } from '@/types';
import { INVESTIGATION_TYPES, INVESTIGATION_SUGGESTIONS } from '@/lib/constants';
import { generateId } from '@/lib/utils';
import { Plus, Trash2 } from 'lucide-react';

interface Step5Props {
  caseData: MedicalCase;
  onChange: (data: Partial<MedicalCase>) => void;
}

export function Step5_Investigations({ caseData, onChange }: Step5Props) {
  const [newInvestigation, setNewInvestigation] = useState<Partial<Investigation>>({
    type: 'Lab',
    name: '',
    result: '',
    normalRange: '',
    date: new Date().toISOString().split('T')[0],
    interpretation: '',
  });

  const addInvestigation = () => {
    if (newInvestigation.name && newInvestigation.result && newInvestigation.interpretation) {
      const inv: Investigation = {
        id: generateId(),
        type: newInvestigation.type as any,
        name: newInvestigation.name,
        result: newInvestigation.result,
        normalRange: newInvestigation.normalRange || '',
        date: newInvestigation.date,
        interpretation: newInvestigation.interpretation,
      };
      onChange({ investigations: [...caseData.investigations, inv] });
      setNewInvestigation({
        type: 'Lab',
        name: '',
        result: '',
        normalRange: '',
        date: new Date().toISOString().split('T')[0],
        interpretation: '',
      });
    }
  };

  const removeInvestigation = (id: string) => {
    onChange({
      investigations: caseData.investigations.filter(i => i.id !== id)
    });
  };

  const suggestions = INVESTIGATION_SUGGESTIONS[caseData.specialty] || [];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Add Investigation</h3>
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select
                  value={newInvestigation.type}
                  onChange={(e) => setNewInvestigation({ ...newInvestigation, type: e.target.value as any })}
                >
                  {INVESTIGATION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Test Name</Label>
                <Input
                  value={newInvestigation.name}
                  onChange={(e) => setNewInvestigation({ ...newInvestigation, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Result</Label>
                <Input
                  value={newInvestigation.result}
                  onChange={(e) => setNewInvestigation({ ...newInvestigation, result: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Normal Range</Label>
                <Input
                  value={newInvestigation.normalRange}
                  onChange={(e) => setNewInvestigation({ ...newInvestigation, normalRange: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={newInvestigation.date}
                  onChange={(e) => setNewInvestigation({ ...newInvestigation, date: e.target.value })}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label>Interpretation</Label>
                <Textarea
                  value={newInvestigation.interpretation}
                  onChange={(e) => setNewInvestigation({ ...newInvestigation, interpretation: e.target.value })}
                />
              </div>
            </div>
            <Button className="mt-4" onClick={addInvestigation}>
              <Plus className="mr-2 h-4 w-4" /> Add Investigation
            </Button>
          </CardContent>
        </Card>
      </div>

      {suggestions.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Suggested for {caseData.specialty}</h4>
          <div className="flex flex-wrap gap-2">
            {suggestions.map(s => (
              <Button
                key={s}
                variant="outline"
                size="sm"
                onClick={() => setNewInvestigation({ ...newInvestigation, name: s })}
              >
                {s}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Investigations List</h3>
        {caseData.investigations.length === 0 ? (
          <p className="text-gray-500">No investigations added yet.</p>
        ) : (
          <div className="space-y-4">
            {caseData.investigations.map(inv => (
              <Card key={inv.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{inv.name}</CardTitle>
                      <div className="flex gap-2 mt-1">
                        <span className="text-sm text-gray-500">{inv.type}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{inv.date}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeInvestigation(inv.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-gray-500">Result</Label>
                      <p className="font-medium">{inv.result}</p>
                    </div>
                    {inv.normalRange && (
                      <div>
                        <Label className="text-sm text-gray-500">Normal Range</Label>
                        <p>{inv.normalRange}</p>
                      </div>
                    )}
                    <div className="col-span-2">
                      <Label className="text-sm text-gray-500">Interpretation</Label>
                      <p>{inv.interpretation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
