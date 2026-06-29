'use client';

import { useContext } from 'react';
import { CaseContext } from '@/context/CaseContext';

export function useCases() {
  const context = useContext(CaseContext);
  if (!context) {
    throw new Error('useCases must be used within a CaseProvider');
  }
  return context;
}
