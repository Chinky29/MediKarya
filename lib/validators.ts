import { z } from 'zod';

export const step1Schema = z.object({
  title: z.string().min(1, 'Case title is required'),
  specialty: z.string().min(1, 'Specialty is required'),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  tags: z.array(z.string()),
  patientId: z.string().min(1, 'Patient ID is required'),
  age: z.number().min(0, 'Age must be a positive number'),
  gender: z.enum(['Male', 'Female', 'Other']),
  occupation: z.string().min(1, 'Occupation is required'),
  location: z.string().min(1, 'Location is required'),
  presentingDate: z.string().min(1, 'Presenting date is required'),
});

export const step2Schema = z.object({
  chiefComplaint: z.string().min(1, 'Chief complaint is required'),
  historyOfPresentingIllness: z.string().min(1, 'HPI is required'),
});

export const step3Schema = z.object({
  pastMedicalHistory: z.array(z.string()),
  familyHistory: z.string(),
  socialHistory: z.string(),
  allergies: z.array(z.string()),
  currentMedications: z.array(z.string()),
  reviewOfSystems: z.record(z.string()),
});

export const step4Schema = z.object({
  generalAppearance: z.string().min(1, 'General appearance is required'),
  vitalSigns: z.object({
    bloodPressure: z.string().min(1, 'BP is required'),
    heartRate: z.string().min(1, 'HR is required'),
    respiratoryRate: z.string().min(1, 'RR is required'),
    temperature: z.string().min(1, 'Temp is required'),
    oxygenSaturation: z.string().min(1, 'SpO2 is required'),
    weight: z.string().min(1, 'Weight is required'),
    height: z.string().min(1, 'Height is required'),
    bmi: z.string().optional(),
  }),
  systemicExamination: z.object({
    cardiovascular: z.string(),
    respiratory: z.string(),
    gastrointestinal: z.string(),
    neurological: z.string(),
    musculoskeletal: z.string(),
    dermatological: z.string(),
  }),
});

export const step5Schema = z.object({
  investigations: z.array(
    z.object({
      id: z.string(),
      type: z.enum(['Lab', 'Imaging', 'Biopsy', 'Other']),
      name: z.string().min(1, 'Test name is required'),
      result: z.string().min(1, 'Result is required'),
      normalRange: z.string().optional(),
      date: z.string().min(1, 'Date is required'),
      interpretation: z.string().min(1, 'Interpretation is required'),
    })
  ),
});

export const step6Schema = z.object({
  provisionalDiagnosis: z.string().min(1, 'Provisional diagnosis is required'),
  differentialDiagnoses: z.array(z.string()),
  finalDiagnosis: z.string().optional(),
  treatmentPlan: z.string().min(1, 'Treatment plan is required'),
  medications: z.array(
    z.object({
      name: z.string().min(1, 'Drug name is required'),
      dose: z.string().min(1, 'Dose is required'),
      frequency: z.string().min(1, 'Frequency is required'),
      duration: z.string().min(1, 'Duration is required'),
    })
  ),
  followUp: z.string().min(1, 'Follow-up is required'),
  prognosis: z.string().min(1, 'Prognosis is required'),
  learningPoints: z.array(z.string()),
  notes: z.string().optional(),
});
