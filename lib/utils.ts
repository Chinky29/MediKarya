import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export function calculateBMI(weight: string, height: string) {
  const w = parseFloat(weight);
  const h = parseFloat(height) / 100; // convert cm to m
  if (isNaN(w) || isNaN(h) || h === 0) return '';
  return (w / (h * h)).toFixed(1);
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
