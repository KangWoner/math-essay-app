import { useState, useCallback } from 'react';
import type { Submission } from '../types';

export const useSubmissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  const addSubmission = useCallback((newSubmission: Submission) => {
    setSubmissions(prevSubmissions => [newSubmission, ...prevSubmissions]);
  }, []);

  const updateSubmission = useCallback((submissionId: string, updates: Partial<Submission>) => {
    setSubmissions(prevSubmissions =>
      prevSubmissions.map(sub =>
        sub.id === submissionId ? { ...sub, ...updates } : sub
      )
    );
  }, []);

  return { submissions, addSubmission, updateSubmission };
};
