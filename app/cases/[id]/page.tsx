'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCases } from '@/hooks/useCases';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Select } from '@/components/ui/select';
import { formatDate } from '@/lib/utils';
import { Edit, Trash2, Copy, Share, Printer, ArrowLeft } from 'lucide-react';

export default function CaseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { state, dispatch, duplicateCase } = useCases();
  const caseItem = state.cases.find(c => c.id === params.id);

  if (!caseItem) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold">Case not found</h2>
        <Button className="mt-4" onClick={() => router.push('/cases')}>
          Back to Cases
        </Button>
      </div>
    );
  }

  const handleStatusChange = (status: string) => {
    dispatch({
      type: 'UPDATE_CASE',
      payload: { ...caseItem, status: status as any, updatedAt: new Date().toISOString() }
    });
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this case?')) {
      dispatch({ type: 'DELETE_CASE', payload: caseItem.id });
      router.push('/cases');
    }
  };

  const handleDuplicate = () => {
    duplicateCase(caseItem.id);
    router.push('/cases');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{caseItem.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">{caseItem.specialty}</Badge>
              <Badge variant="outline">{caseItem.difficulty}</Badge>
              <StatusBadge status={caseItem.status} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={caseItem.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="w-40"
          >
            <option value="Draft">Draft</option>
            <option value="In Progress">In Progress</option>
            <option value="Review">Review</option>
            <option value="Published">Published</option>
          </Select>
          <Button variant="ghost" onClick={handleDuplicate}>
            <Copy className="h-4 w-4 mr-2" /> Duplicate
          </Button>
          <Button variant="ghost" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" /> Print
          </Button>
          <Button variant="ghost" onClick={() => router.push(`/cases/${caseItem.id}/edit`)}>
            <Edit className="h-4 w-4 mr-2" /> Edit
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" /> Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          {/* Patient Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Patient Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Patient ID</p>
                  <p className="font-mono font-medium">{caseItem.patientDetails.patientId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="font-medium">{caseItem.patientDetails.age} years</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-medium">{caseItem.patientDetails.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Presenting Date</p>
                  <p className="font-medium">{formatDate(caseItem.patientDetails.presentingDate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chief Complaint & History */}
          <Card>
            <CardHeader>
              <CardTitle>Chief Complaint</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium text-lg">{caseItem.medicalHistory.chiefComplaint}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>History of Presenting Illness</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{caseItem.medicalHistory.historyOfPresentingIllness}</p>
            </CardContent>
          </Card>

          {/* Past Medical History */}
          <Card>
            <CardHeader>
              <CardTitle>Medical History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {caseItem.medicalHistory.pastMedicalHistory.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Past Medical History</h4>
                  <div className="flex flex-wrap gap-2">
                    {caseItem.medicalHistory.pastMedicalHistory.map((pmh, idx) => (
                      <Badge key={idx} variant="outline">{pmh}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {caseItem.medicalHistory.familyHistory && (
                <div>
                  <h4 className="font-medium mb-2">Family History</h4>
                  <p>{caseItem.medicalHistory.familyHistory}</p>
                </div>
              )}
              {caseItem.medicalHistory.socialHistory && (
                <div>
                  <h4 className="font-medium mb-2">Social History</h4>
                  <p>{caseItem.medicalHistory.socialHistory}</p>
                </div>
              )}
              {caseItem.medicalHistory.allergies.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Allergies</h4>
                  <div className="flex flex-wrap gap-2">
                    {caseItem.medicalHistory.allergies.map((a, idx) => (
                      <Badge key={idx} variant="secondary">{a}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {caseItem.medicalHistory.currentMedications.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Current Medications</h4>
                  <div className="flex flex-wrap gap-2">
                    {caseItem.medicalHistory.currentMedications.map((m, idx) => (
                      <Badge key={idx} variant="outline">{m}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Examination */}
          <Card>
            <CardHeader>
              <CardTitle>Examination Findings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">General Appearance</h4>
                <p>{caseItem.examinationFindings.generalAppearance}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Vital Signs</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <span className="text-gray-500 text-sm">BP:</span> {caseItem.examinationFindings.vitalSigns.bloodPressure}
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">HR:</span> {caseItem.examinationFindings.vitalSigns.heartRate}
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">RR:</span> {caseItem.examinationFindings.vitalSigns.respiratoryRate}
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Temp:</span> {caseItem.examinationFindings.vitalSigns.temperature}
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">SpO2:</span> {caseItem.examinationFindings.vitalSigns.oxygenSaturation}
                  </div>
                  {caseItem.examinationFindings.vitalSigns.bmi && (
                    <div>
                      <span className="text-gray-500 text-sm">BMI:</span> {caseItem.examinationFindings.vitalSigns.bmi}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Systemic Examination</h4>
                <div className="space-y-2">
                  {Object.entries(caseItem.examinationFindings.systemicExamination).map(([key, value]) => (
                    value && (
                      <div key={key}>
                        <p className="capitalize font-medium text-gray-600">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p>{value}</p>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Investigations */}
          {caseItem.investigations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Investigations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {caseItem.investigations.map(inv => (
                  <div key={inv.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{inv.name}</h4>
                        <Badge variant="outline">{inv.type}</Badge>
                      </div>
                      <span className="text-sm text-gray-500">{formatDate(inv.date)}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-gray-500 text-sm">Result:</span> <span className="font-medium">{inv.result}</span>
                      </div>
                      {inv.normalRange && (
                        <div>
                          <span className="text-gray-500 text-sm">Normal Range:</span> {inv.normalRange}
                        </div>
                      )}
                      <div className="md:col-span-2">
                        <span className="text-gray-500 text-sm">Interpretation:</span> {inv.interpretation}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Diagnosis & Plan */}
          <Card>
            <CardHeader>
              <CardTitle>Diagnosis & Management Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Provisional Diagnosis</h4>
                <p>{caseItem.diagnosisAndPlan.provisionalDiagnosis}</p>
              </div>
              {caseItem.diagnosisAndPlan.finalDiagnosis && (
                <div>
                  <h4 className="font-medium mb-2">Final Diagnosis</h4>
                  <p className="text-lg font-semibold">{caseItem.diagnosisAndPlan.finalDiagnosis}</p>
                </div>
              )}
              {caseItem.diagnosisAndPlan.differentialDiagnoses.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Differential Diagnoses</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {caseItem.diagnosisAndPlan.differentialDiagnoses.map((dd, idx) => (
                      <li key={idx}>{dd}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <h4 className="font-medium mb-2">Treatment Plan</h4>
                <p className="whitespace-pre-wrap">{caseItem.diagnosisAndPlan.treatmentPlan}</p>
              </div>
              {caseItem.diagnosisAndPlan.medications.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Medications</h4>
                  <div className="space-y-2">
                    {caseItem.diagnosisAndPlan.medications.map((med, idx) => (
                      <div key={idx} className="border rounded p-3">
                        <p className="font-medium">{med.name}</p>
                        <p className="text-sm text-gray-600">{med.dose} • {med.frequency} • {med.duration}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <h4 className="font-medium mb-2">Follow-up Plan</h4>
                <p>{caseItem.diagnosisAndPlan.followUp}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Prognosis</h4>
                <p>{caseItem.diagnosisAndPlan.prognosis}</p>
              </div>
              {caseItem.diagnosisAndPlan.learningPoints.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Learning Points</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {caseItem.diagnosisAndPlan.learningPoints.map((lp, idx) => (
                      <li key={idx}>{lp}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Case Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p>{formatDate(caseItem.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Updated</p>
                <p>{formatDate(caseItem.updatedAt)}</p>
              </div>
              {caseItem.tags.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Tags</p>
                  <div className="flex flex-wrap gap-1">
                    {caseItem.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
