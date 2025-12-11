import React from 'react';
import type { Submission } from '../types';

interface GoogleSheetViewerModalProps {
  submission: Submission;
  onClose: () => void;
}

const GoogleSheetViewerModal: React.FC<GoogleSheetViewerModalProps> = ({ submission, onClose }) => {
  if (!submission.driveSheetUrl) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg w-full max-w-3xl p-4 relative">
        <button className="absolute top-2 right-2 text-slate-600" onClick={onClose}>X</button>
        <h3 className="text-lg font-bold mb-2">Google Sheet 보기</h3>
        <iframe src={submission.driveSheetUrl} className="w-full h-[60vh] border" title="sheet" />
      </div>
    </div>
  );
};

export default GoogleSheetViewerModal;
