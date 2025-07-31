import React, { useState, useMemo } from 'react';
import type { Problem, SubmissionFormData } from '../types';
import { SpinnerIcon } from './icons';

interface EssayFormProps {
  problems: Problem[];
  onFormSubmit: (formData: SubmissionFormData) => void;
  isLoading: boolean;
}

const EssayForm: React.FC<EssayFormProps> = ({ problems, onFormSubmit, isLoading }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const initialAnswers = useMemo(() =>
    problems.reduce((acc, problem) => {
      acc[problem.id] = '';
      return acc;
    }, {} as Record<string, string>),
    [problems]
  );

  const [answers, setAnswers] = useState<Record<string, string>>(initialAnswers);

  const handleAnswerChange = (problemId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [problemId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('학생 이름을 입력해주세요.');
      return;
    }
    const isConfirmed = window.confirm("답안을 제출하시겠습니까? 제출 후에는 수정할 수 없습니다.");
    if (isConfirmed) {
      onFormSubmit({ name, date, answers });
    }
  };

  return (
    <section className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">답안 작성</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="studentName" className="block text-sm font-medium text-slate-700 mb-1">학생 이름</label>
            <input
              type="text"
              id="studentName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="예: 홍길동"
              required
            />
          </div>
          <div>
            <label htmlFor="submissionDate" className="block text-sm font-medium text-slate-700 mb-1">제출 일자</label>
            <input
              type="date"
              id="submissionDate"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>
        </div>

        <div className="space-y-6">
          {problems.map((problem, index) => (
            <div key={problem.id}>
              <h3 className="text-lg font-semibold text-slate-800">{`논제 ${index + 1}: ${problem.title}`}</h3>
              <p className="text-sm text-slate-600 mt-1 mb-3">{problem.description}</p>
              <textarea
                value={answers[problem.id]}
                onChange={(e) => handleAnswerChange(problem.id, e.target.value)}
                className="w-full h-48 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="여기에 답안을 작성하세요..."
                required
              />
            </div>
          ))}
        </div>

        <div className="text-right">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <SpinnerIcon className="mr-2 h-5 w-5" />
                <span>채점 중...</span>
              </>
            ) : '답안 제출 및 채점 받기'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default EssayForm;
