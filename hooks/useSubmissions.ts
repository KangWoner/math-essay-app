import { useState, useEffect } from 'react';
import type { Submission } from '../types';

const STORAGE_KEY = 'math-essay-submissions';

export function useSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>(() => {
    if (typeof window === 'undefined') return [];
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Submission[]) : [];
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
  }, [submissions]);

  const addSubmission = (submission: Submission) => {
    setSubmissions(prev => [...prev, submission]);
  };

  const updateSubmission = (id: string, updates: Partial<Submission>) => {
    setSubmissions(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)));
  };

  return { submissions, addSubmission, updateSubmission } as const;
}
