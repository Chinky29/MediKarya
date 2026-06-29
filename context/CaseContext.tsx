'use client';

import { createContext, useReducer, useEffect } from 'react';
import { MedicalCase } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { MOCK_CASES, DEFAULT_AUTHOR } from '@/lib/mockData';
import { generateId } from '@/lib/utils';

type CaseState = {
  cases: MedicalCase[];
  currentCase: MedicalCase | null;
};

type CaseAction =
  | { type: 'SET_CASES'; payload: MedicalCase[] }
  | { type: 'ADD_CASE'; payload: MedicalCase }
  | { type: 'UPDATE_CASE'; payload: MedicalCase }
  | { type: 'DELETE_CASE'; payload: string }
  | { type: 'SET_CURRENT_CASE'; payload: MedicalCase | null };

function caseReducer(state: CaseState, action: CaseAction): CaseState {
  switch (action.type) {
    case 'SET_CASES':
      return { ...state, cases: action.payload };
    case 'ADD_CASE':
      return { ...state, cases: [action.payload, ...state.cases] };
    case 'UPDATE_CASE':
      return {
        ...state,
        cases: state.cases.map(c =>
          c.id === action.payload.id ? action.payload : c
        ),
        currentCase:
          state.currentCase?.id === action.payload.id
            ? action.payload
            : state.currentCase,
      };
    case 'DELETE_CASE':
      return {
        ...state,
        cases: state.cases.filter(c => c.id !== action.payload),
        currentCase:
          state.currentCase?.id === action.payload ? null : state.currentCase,
      };
    case 'SET_CURRENT_CASE':
      return { ...state, currentCase: action.payload };
    default:
      return state;
  }
}

export const CaseContext = createContext<{
  state: CaseState;
  dispatch: React.Dispatch<CaseAction>;
  createCase: (caseData: Partial<MedicalCase>) => MedicalCase;
  duplicateCase: (caseId: string) => void;
} | null>(null);

export function CaseProvider({ children }: { children: React.ReactNode }) {
  const [savedCases, setSavedCases] = useLocalStorage<MedicalCase[]>(
    'medical-cases',
    MOCK_CASES
  );

  const [state, dispatch] = useReducer(caseReducer, {
    cases: savedCases,
    currentCase: null,
  });

  useEffect(() => {
    setSavedCases(state.cases);
  }, [state.cases, setSavedCases]);

  const createCase = (caseData: Partial<MedicalCase>): MedicalCase => {
    // Get the max PT id
    const existingPTIds = state.cases.map(c => parseInt(c.patientDetails.patientId.split('-')[2] || '0', 10));
    const nextPTNumber = Math.max(0, ...existingPTIds) + 1;

    const newCase: MedicalCase = {
      id: `case-${generateId()}`,
      title: caseData.title || 'Untitled Case',
      specialty: caseData.specialty || 'Cardiology',
      status: caseData.status || 'Draft',
      tags: caseData.tags || [],
      difficulty: caseData.difficulty || 'Beginner',
      authorId: DEFAULT_AUTHOR.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      patientDetails: caseData.patientDetails || {
        patientId: `PT-${new Date().getFullYear()}-${String(nextPTNumber).padStart(3, '0')}`,
        age: 0,
        gender: 'Male',
        occupation: '',
        location: '',
        presentingDate: new Date().toISOString().split('T')[0],
      },
      medicalHistory: caseData.medicalHistory || {
        chiefComplaint: '',
        historyOfPresentingIllness: '',
        pastMedicalHistory: [],
        familyHistory: '',
        socialHistory: '',
        allergies: [],
        currentMedications: [],
        reviewOfSystems: {},
      },
      examinationFindings: caseData.examinationFindings || {
        generalAppearance: '',
        vitalSigns: {
          bloodPressure: '',
          heartRate: '',
          respiratoryRate: '',
          temperature: '',
          oxygenSaturation: '',
          weight: '',
          height: '',
          bmi: '',
        },
        systemicExamination: {
          cardiovascular: '',
          respiratory: '',
          gastrointestinal: '',
          neurological: '',
          musculoskeletal: '',
          dermatological: '',
        },
      },
      investigations: caseData.investigations || [],
      diagnosisAndPlan: caseData.diagnosisAndPlan || {
        provisionalDiagnosis: '',
        differentialDiagnoses: [],
        finalDiagnosis: '',
        treatmentPlan: '',
        medications: [],
        followUp: '',
        prognosis: '',
        learningPoints: [],
      },
      notes: caseData.notes || '',
    };
    dispatch({ type: 'ADD_CASE', payload: newCase });
    return newCase;
  };

  const duplicateCase = (caseId: string) => {
    const originalCase = state.cases.find(c => c.id === caseId);
    if (originalCase) {
      const duplicated = {
        ...originalCase,
        id: `case-${generateId()}`,
        title: `${originalCase.title} (Copy)`,
        status: 'Draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      dispatch({ type: 'ADD_CASE', payload: duplicated });
    }
  };

  return (
    <CaseContext.Provider value={{ state, dispatch, createCase, duplicateCase }}>
      {children}
    </CaseContext.Provider>
  );
}
