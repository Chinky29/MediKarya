'use client';

import { createContext, useContext } from 'react';
import { Author } from '@/types';
import { DEFAULT_AUTHOR } from '@/lib/mockData';

type AuthorContextType = {
  author: Author;
  updateAuthor: (updates: Partial<Author>) => void;
};

const AuthorContext = createContext<AuthorContextType | null>(null);

export function AuthorProvider({ children }: { children: React.ReactNode }) {
  // For now, we'll just use the default author
  // In a real app, this would use localStorage too
  const value = {
    author: DEFAULT_AUTHOR,
    updateAuthor: () => {},
  };

  return (
    <AuthorContext.Provider value={value}>{children}</AuthorContext.Provider>
  );
}

export function useAuthor() {
  const context = useContext(AuthorContext);
  if (!context) {
    throw new Error('useAuthor must be used within an AuthorProvider');
  }
  return context;
}
