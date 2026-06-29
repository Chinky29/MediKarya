export const SPECIALTIES = [
  'Cardiology',
  'Neurology',
  'Pulmonology',
  'Gastroenterology',
  'Endocrinology',
  'Nephrology',
  'Oncology',
  'Orthopedics',
  'Pediatrics',
  'Psychiatry',
];

export const STATUS_OPTIONS = [
  'Draft',
  'In Progress',
  'Review',
  'Published',
] as const;

export const DIFFICULTY_OPTIONS = [
  'Beginner',
  'Intermediate',
  'Advanced',
] as const;

export const GENDER_OPTIONS = ['Male', 'Female', 'Other'] as const;

export const PAST_MEDICAL_HISTORY_OPTIONS = [
  'Diabetes',
  'Hypertension',
  'Asthma',
  'CAD',
  'TB',
  'Hyperlipidemia',
  'Thyroid Disorder',
];

export const SYSTEMS = [
  'Cardiovascular',
  'Respiratory',
  'Gastrointestinal',
  'Neurological',
  'Musculoskeletal',
  'Dermatological',
] as const;

export const INVESTIGATION_TYPES = ['Lab', 'Imaging', 'Biopsy', 'Other'] as const;

export const MEDICATION_FREQUENCIES = [
  'Once daily',
  'Twice daily',
  'Three times daily',
  'Four times daily',
  'As needed',
];

export const INVESTIGATION_SUGGESTIONS: Record<string, string[]> = {
  Cardiology: ['ECG', 'Echo', 'Troponin', 'CK-MB', 'Lipid Profile'],
  Neurology: ['CT Brain', 'MRI Brain', 'EEG', 'LP'],
  Pulmonology: ['Chest X-ray', 'CT Chest', 'Spirometry', 'ABG'],
  Gastroenterology: ['LFT', 'USG Abdomen', 'Endoscopy', 'Colonoscopy'],
  Endocrinology: ['Blood Sugar', 'HbA1c', 'Thyroid Profile'],
  Nephrology: ['RFT', 'Urine Routine', 'USG KUB'],
};
