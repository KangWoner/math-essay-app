import React from 'react';
import type { Submission } from '../types';

interface GoogleSheetViewerModalProps {
  submission: Submission;
  onClose: () => void;
}

const GoogleSheetViewerModal: React.FC<GoogleSheetViewerModalProps> = ({ submission, onClose }) => {
  // In a real app, you might want to make the iframe URL more robust
  // or use a more sophisticated way to embed the sheet.
  const sheetUrl = submission.driveSheetUrl ? `${submission.driveSheetUrl.replace('/edit', '/embed?widget=true&headers=false')}` : '';

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <header className="flex justify-between items-center p-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Google Sheet에서 채점 결과 보기</h2>
            <p className="text-sm text-slate-600">
              {submission.name} 학생 ({new Date(submission.date).toLocaleDateString('ko-KR')})
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 transition-colors p-2 rounded-full"
            aria-label="닫기"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>
        <div className="flex-grow p-2">
          {sheetUrl ? (
            <iframe
              src={sheetUrl}
              className="w-full h-full border-0 rounded-lg"
              title={`채점 결과: ${submission.name}`}
            ></iframe>
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-red-500">Google Sheet URL을 찾을 수 없습니다.</p>
            </div>
          )}
        </div>
         <footer className="p-4 bg-slate-50 text-right border-t border-slate-200">
            <a
                href={submission.driveSheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 text-sm font-semibold text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200"
            >
                새 탭에서 열기
            </a>
        </footer>
      </div>
    </div>
  );
};

export default GoogleSheetViewerModal;
