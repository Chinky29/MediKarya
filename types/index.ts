export interface PatientDetails {
  patientId: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  occupation: string;
  location: string;
  presentingDate: string;
}

export interface MedicalHistory {
  chiefComplaint: string;
  historyOfPresentingIllness: string;
  pastMedicalHistory: string[];
  familyHistory: string;
  socialHistory: string;
  allergies: string[];
  currentMedications: string[];
  reviewOfSystems: Record<string, string>;
}

export interface ExaminationFindings {
  generalAppearance: string;
  vitalSigns: {
    bloodPressure: string;
    heartRate: string;
    respiratoryRate: string;
    temperature: string;
    oxygenSaturation: string;
    weight: string;
    height: string;
    bmi?: string;
  };
  systemicExamination: {
    cardiovascular: string;
    respiratory: string;
    gastrointestinal: string;
    neurological: string;
    musculoskeletal: string;
    dermatological: string;
  };
}

export interface Investigation {
  id: string;
  type: 'Lab' | 'Imaging' | 'Biopsy' | 'Other';
  name: string;
  result: string;
  normalRange?: string;
  date: string;
  interpretation: string;
}

export interface DiagnosisAndPlan {
  provisionalDiagnosis: string;
  differentialDiagnoses: string[];
  finalDiagnosis?: string;
  treatmentPlan: string;
  medications: { name: string; dose: string; frequency: string; duration: string }[];
  followUp: string;
  prognosis: string;
  learningPoints: string[];
}

export interface MedicalCase {
  id: string;
  title: string;
  specialty: string;
  status: 'Draft' | 'In Progress' | 'Review' | 'Published';
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  authorId: string;
  createdAt: string;
  updatedAt: string;
  patientDetails: PatientDetails;
  medicalHistory: MedicalHistory;
  examinationFindings: ExaminationFindings;
  investigations: Investigation[];
  diagnosisAndPlan: DiagnosisAndPlan;
  notes?: string;
}

export interface Author {
  id: string;
  name: string;
  role: 'Medical Student' | 'Content Writer' | 'Doctor' | 'Educator';
  specialty: string;
  institution: string;
  casesCreated: number;
  avatar: string;
}
