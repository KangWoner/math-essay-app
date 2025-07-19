import React, { useState, useEffect } from 'react';
import type { Submission, SubmissionFormData, Problem } from './types';
import { evaluateAnswers } from './services/geminiService';
import * as googleDriveService from './services/googleDriveService';
import EssayForm from './components/EssayForm';
import SubmissionHistory from './components/SubmissionHistory';
import ProblemGenerator from './components/ProblemGenerator';
import GoogleSheetViewerModal from './components/GoogleSheetViewerModal';
import { useSubmissions } from './hooks/useSubmissions';
import { useGoogleAuth } from './hooks/useGoogleAuth';
import { BookOpenIcon, WrenchScrewdriverIcon, GoogleDriveIcon, SpinnerIcon } from './components/icons';

const initialProblems: Problem[] = [
    { id: 'problem-1', title: '문제 1: N각형의 내각의 합', description: 'n각형의 내각의 합이 (n-2) x 180°임을 삼각형 분할을 이용하여 논리적으로 설명하세요.' },
    { id: 'problem-2', title: '문제 2: 부채꼴의 넓이', description: '부채꼴의 넓이를 구하는 공식이 원의 넓이 공식과 어떻게 관련되는지 설명하고, 실생활 예시를 들어보세요.' },
    { id: 'problem-3', title: '문제 3: 정다면체의 종류', description: '정다면체가 5가지 종류밖에 없는 이유를 오일러의 다면체 정리(V-E+F=2)를 이용하여 설명하세요.' },
];

const App: React.FC = () => {
  const { submissions, addSubmission, updateSubmission } = useSubmissions();
  const { isGapiReady, isSignedIn, signIn, signOut, authError } = useGoogleAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSavingOnSubmit, setIsSavingOnSubmit] = useState<boolean>(false);
  const [savingSubmissionId, setSavingSubmissionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isTeacherMode, setIsTeacherMode] = useState(false);
  const [activeProblems, setActiveProblems] = useState<Problem[]>(initialProblems);
  const [viewingSubmission, setViewingSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    if (authError) setError(authError);
  }, [authError]);

  const handleSaveToDrive = async (submission: Submission) => {
    if (!isSignedIn) {
      setError("Google Drive에 저장하려면 먼저 로그인해야 합니다.");
      return;
    }
    setSavingSubmissionId(submission.id);
    setError(null);
    try {
      const { sheetUrl } = await googleDriveService.createStudentSheet(submission);
      updateSubmission(submission.id, { isSavedToDrive: true, driveSheetUrl: sheetUrl });
    } catch (driveError) {
      const message = driveError instanceof Error ? driveError.message : '알 수 없는 오류가 발생했습니다.';
      setError(`Google Drive 저장 실패: ${message}`);
    } finally {
      setSavingSubmissionId(null);
    }
  };

  const handleFormSubmit = async (formData: SubmissionFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const evaluation = await evaluateAnswers(activeProblems, formData);
      const newSubmission: Submission = {
        id: new Date().toISOString(),
        submittedAt: new Date(),
        name: formData.name,
        date: formData.date,
        answers: formData.answers,
        problems: activeProblems,
        evaluation,
        isSavedToDrive: false,
      };
      
      addSubmission(newSubmission);
      
      if (isSignedIn) {
        setIsSavingOnSubmit(true);
        await handleSaveToDrive({ ...newSubmission, isSavedToDrive: true });
        setIsSavingOnSubmit(false);
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleToggleTeacherMode = () => {
      setIsTeacherMode(!isTeacherMode);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <header className="mb-10">
        <div className="flex justify-between items-start flex-wrap gap-4">
            <div className="text-left">
                <div className="flex items-center text-blue-700">
                    <BookOpenIcon />
                    <h1 className="text-4xl font-extrabold tracking-tight">논술형 수학 AI 교사</h1>
                </div>
                <p className="mt-2 text-lg text-slate-600">도형의 성질을 탐구하며 논리의 힘을 길러보세요.</p>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                  onClick={isSignedIn ? signOut : signIn}
                  disabled={!isGapiReady}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-wait ${
                      isSignedIn
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                  }`}
              >
                  <GoogleDriveIcon />
                  <span>{isGapiReady ? (isSignedIn ? 'Drive 연결됨' : 'Google Drive에 연결') : 'API 로딩중...'}</span>
              </button>
              <button 
                  onClick={handleToggleTeacherMode}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      isTeacherMode 
                      ? 'bg-purple-600 text-white hover:bg-purple-700' 
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                  }`}
              >
                  <WrenchScrewdriverIcon />
                  <span>교사 모드</span>
              </button>
            </div>
        </div>
      </header>
      
      <main className="space-y-12">
        
        {isTeacherMode && <ProblemGenerator setActiveProblems={setActiveProblems} />}

        <EssayForm problems={activeProblems} onFormSubmit={handleFormSubmit} isLoading={isLoading || isSavingOnSubmit} />
        
        {isSavingOnSubmit && (
             <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md flex items-center" role="status">
                <SpinnerIcon className="mr-3 h-5 w-5 text-yellow-600" />
                <p>평가 결과를 Google Sheet에 저장 중입니다...</p>
            </div>
        )}
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
            <p className="font-bold">오류 발생</p>
            <p>{error}</p>
          </div>
        )}

        <SubmissionHistory 
          submissions={submissions} 
          onViewInDrive={setViewingSubmission}
          onSaveToDrive={(id) => {
            const sub = submissions.find(s => s.id === id);
            if (sub) handleSaveToDrive(sub);
          }}
          isGoogleSignedIn={isSignedIn}
          savingSubmissionId={savingSubmissionId}
        />
      </main>

      {viewingSubmission && (
        <GoogleSheetViewerModal 
            submission={viewingSubmission} 
            onClose={() => setViewingSubmission(null)} 
        />
      )}

      <footer className="text-center mt-12 py-6 text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} AI 기반 반응형 수학교재. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
