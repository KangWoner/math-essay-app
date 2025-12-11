import React from 'react';
import type { Submission } from '../types';
import { GoogleDriveIcon, SpinnerIcon } from './icons';

interface SubmissionHistoryProps {
  submissions: Submission[];
  onViewInDrive: (submission: Submission) => void;
  onSaveToDrive: (id: string) => void;
  isGoogleSignedIn: boolean;
  savingSubmissionId: string | null;
}

const SubmissionHistory: React.FC<SubmissionHistoryProps> = ({
  submissions,
  onViewInDrive,
  onSaveToDrive,
  isGoogleSignedIn,
  savingSubmissionId,
}) => {
  if (submissions.length === 0) {
    return <p className="text-center text-slate-500">제출 내역이 없습니다.</p>;
  }

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold">제출 내역</h2>
      {submissions.map((s) => (
        <div key={s.id} className="border rounded p-4 space-y-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{s.name}</p>
              <p className="text-sm text-slate-600">{new Date(s.submittedAt).toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2">
              {s.isSavedToDrive ? (
                <button
                  onClick={() => onViewInDrive(s)}
                  className="flex items-center space-x-1 text-blue-600 hover:underline"
                >
                  <GoogleDriveIcon className="h-5 w-5" />
                  <span>열기</span>
                </button>
              ) : (
                <button
                  onClick={() => onSaveToDrive(s.id)}
                  disabled={!isGoogleSignedIn || savingSubmissionId === s.id}
                  className="flex items-center space-x-1 text-green-600 hover:underline disabled:opacity-50"
                >
                  {savingSubmissionId === s.id ? (
                    <SpinnerIcon className="h-5 w-5" />
                  ) : (
                    <GoogleDriveIcon className="h-5 w-5" />
                  )}
                  <span>Drive 저장</span>
                </button>
              )}
            </div>
          </div>
          <div className="text-sm">
            <p className="font-medium">총평</p>
            <p>{s.evaluation.generalFeedback}</p>
          </div>
        </div>
      ))
    </section>
  );
};

export default SubmissionHistory;
