import React, { useState } from 'react';
import type { Problem, SubmissionFormData } from '../types';

interface EssayFormProps {
  problems: Problem[];
  isLoading?: boolean;
  onFormSubmit: (data: SubmissionFormData) => void;
}

const EssayForm: React.FC<EssayFormProps> = ({ problems, onFormSubmit, isLoading }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    problems.forEach(p => {
      initial[p.id] = '';
    });
    return initial;
  });

  const handleChange = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData: SubmissionFormData = { name, date, answers };
    onFormSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          required
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border rounded p-2"
        />
        <input
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="flex-1 border rounded p-2"
        />
      </div>

      {problems.map(p => (
        <div key={p.id} className="space-y-2">
          <label className="font-semibold block">{p.title}</label>
          <p className="text-sm text-slate-600">{p.description}</p>
          <textarea
            required
            className="w-full border rounded p-2 mt-1"
            rows={4}
            value={answers[p.id]}
            onChange={(e) => handleChange(p.id, e.target.value)}
          />
        </div>
      ))

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isLoading ? '제출 중...' : '제출하기'}
      </button>
    </form>
  );
};

export default EssayForm;
