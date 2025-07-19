import React, { useState } from 'react';
import type { Problem } from '../types';

interface ProblemGeneratorProps {
  setActiveProblems: (problems: Problem[]) => void;
}

const defaultProblems: Problem[] = [
  { id: 'problem-1', title: '문제 1: N각형의 내각의 합', description: 'n각형의 내각의 합이 (n-2) x 180°임을 삼각형 분할을 이용하여 설명하세요.' },
  { id: 'problem-2', title: '문제 2: 부채꼴의 넓이', description: '부채꼴의 넓이를 구하는 공식을 실생활 예시와 함께 설명하세요.' },
  { id: 'problem-3', title: '문제 3: 정다면체의 종류', description: '정다면체가 5가지인 이유를 오일러의 정리를 이용해 설명하세요.' },
];

const ProblemGenerator: React.FC<ProblemGeneratorProps> = ({ setActiveProblems }) => {
  const [problems, setProblems] = useState<Problem[]>(defaultProblems);

  const handleChange = (id: string, field: keyof Problem, value: string) => {
    setProblems(prev => prev.map(p => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const addProblem = () => {
    const newProblem: Problem = {
      id: `problem-${problems.length + 1}`,
      title: '',
      description: '',
    };
    setProblems(prev => [...prev, newProblem]);
  };

  const removeProblem = (id: string) => {
    setProblems(prev => prev.filter(p => p.id !== id));
  };

  const handleSave = () => {
    setActiveProblems(problems);
  };

  return (
    <section className="space-y-4 border p-4 rounded">
      <h2 className="text-lg font-bold">문제 편집</h2>
      {problems.map(p => (
        <div key={p.id} className="space-y-2 border rounded p-2">
          <input
            type="text"
            value={p.title}
            onChange={(e) => handleChange(p.id, 'title', e.target.value)}
            className="w-full border rounded p-1"
            placeholder="문제 제목"
          />
          <textarea
            value={p.description}
            onChange={(e) => handleChange(p.id, 'description', e.target.value)}
            className="w-full border rounded p-1"
            rows={3}
            placeholder="문제 설명"
          />
          <button
            type="button"
            onClick={() => removeProblem(p.id)}
            className="text-red-600 text-sm"
          >
            삭제
          </button>
        </div>
      ))
      <div className="flex gap-2">
        <button type="button" onClick={addProblem} className="px-2 py-1 bg-slate-200 rounded">
          문제 추가
        </button>
        <button type="button" onClick={handleSave} className="px-2 py-1 bg-blue-600 text-white rounded">
          적용
        </button>
      </div>
    </section>
  );
};

export default ProblemGenerator;
