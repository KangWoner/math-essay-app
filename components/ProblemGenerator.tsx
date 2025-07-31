import React, { useState } from 'react';
import type { Problem } from '../types';
import { SpinnerIcon } from './icons';

interface ProblemGeneratorProps {
  setActiveProblems: (problems: Problem[]) => void;
}

// A simple mock function to generate new problems
const generateNewProblems = async (): Promise<Problem[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    const timestamp = new Date().getTime();
    return [
        { id: `problem-${timestamp}-1`, title: '새로운 문제 1: 피타고라스 정리', description: '피타고라스 정리를 증명하고, 실생활 예시를 2가지 이상 들어 설명하세요.' },
        { id: `problem-${timestamp}-2`, title: '새로운 문제 2: 원주율(π)', description: '원주율(π)이 왜 무리수인지 설명하고, 원주율의 근사값을 구하는 방법을 한 가지 제시하세요.' },
    ];
}

const ProblemGenerator: React.FC<ProblemGeneratorProps> = ({ setActiveProblems }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const newProblems = await generateNewProblems();
      setActiveProblems(newProblems);
    } catch (e) {
      setError(e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-purple-50 p-6 rounded-2xl shadow-md border border-purple-200">
      <h2 className="text-xl font-bold text-purple-800 mb-4">교사 도구: 문제 생성기</h2>
      <p className="text-purple-700 mb-4">
        아래 버튼을 눌러 새로운 논술 문제를 생성합니다. 현재 문제 목록이 대체됩니다.
      </p>
      <button
        onClick={handleGenerate}
        disabled={isLoading}
        className="inline-flex items-center justify-center px-6 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-slate-400 transition-colors"
      >
        {isLoading ? (
          <>
            <SpinnerIcon className="mr-2 h-5 w-5" />
            <span>생성 중...</span>
          </>
        ) : (
          '새로운 문제 생성하기'
        )}
      </button>
      {error && (
        <div className="mt-4 text-sm text-red-600 bg-red-100 p-3 rounded-lg">
          <strong>오류:</strong> {error}
        </div>
      )}
    </section>
  );
};

export default ProblemGenerator;
