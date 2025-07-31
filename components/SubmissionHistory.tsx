import React from 'react';
import type { Submission } from '../types';
import { SpinnerIcon } from './icons';

interface SubmissionHistoryProps {
  submissions: Submission[];
  onViewInDrive: (submission: Submission) => void;
  onSaveToDrive: (submissionId: string) => void;
  isGoogleSignedIn: boolean;
  savingSubmissionId: string | null;
}

const SubmissionHistory: React.FC<SubmissionHistoryProps> = ({
  submissions,
  onViewInDrive,
  onSaveToDrive,
  isGoogleSignedIn,
  savingSubmissionId
}) => {
  if (submissions.length === 0) {
    return null;
  }

  const getOverallScore = (submission: Submission): number => {
    const problemIds = submission.problems.map(p => p.id);
    const totalScore = problemIds.reduce((acc, id) => {
        return acc + (submission.evaluation.evaluations[id]?.score || 0);
    }, 0);
    return Math.round(totalScore / problemIds.length);
  }

  return (
    <section className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">제출 기록</h2>
      <div className="space-y-6">
        {submissions.map((submission) => (
          <div key={submission.id} className="bg-slate-50 p-6 rounded-lg border border-slate-200 transition-shadow hover:shadow-md">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <h3 className="font-bold text-lg text-slate-800">
                  {submission.name} - {new Date(submission.submittedAt).toLocaleString('ko-KR')}
                </h3>
                <p className="text-sm text-slate-500">
                  종합 점수: <span className="font-semibold text-blue-600">{getOverallScore(submission)}점</span>
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {submission.isSavedToDrive && submission.driveSheetUrl ? (
                  <button
                    onClick={() => onViewInDrive(submission)}
                    className="px-4 py-2 text-sm font-semibold text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    Drive에서 보기
                  </button>
                ) : (
                  <button
                    onClick={() => onSaveToDrive(submission.id)}
                    disabled={!isGoogleSignedIn || savingSubmissionId === submission.id}
                    className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-wait"
                  >
                    {savingSubmissionId === submission.id ? (
                      <span className="flex items-center">
                        <SpinnerIcon className="mr-2 h-4 w-4" />
                        저장 중...
                      </span>
                    ) : (
                      'Drive에 저장'
                    )}
                  </button>
                )}
              </div>
            </div>
            <div className="mt-6 border-t border-slate-200 pt-6">
              <h4 className="font-semibold text-slate-700 mb-3">AI 교사 총평</h4>
              <p className="text-slate-600 bg-slate-100 p-4 rounded-md whitespace-pre-wrap font-mono text-sm">
                {submission.evaluation.generalFeedback}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SubmissionHistory;
