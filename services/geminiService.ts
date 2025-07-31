import type { Problem, SubmissionFormData, EvaluationResult, AiEvaluationResponse } from '../types';

// This is a simplified mock function. In a real scenario, this would
// interact with the Google Generative AI API.
export const evaluateAnswers = async (
  problems: Problem[],
  formData: SubmissionFormData
): Promise<EvaluationResult> => {
  console.log("Evaluating answers with mock service:", { problems, formData });

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mock AI response
  const mockAiResponse: AiEvaluationResponse = {
    generalFeedback: "전반적으로 논리적인 설명이 돋보입니다. 각 문제에 대한 이해도가 높고, 설명을 명확하게 하려는 노력이 보입니다. 다만, 일부 개념 설명에서 조금 더 구체적인 예시를 사용하면 좋겠습니다.",
    evaluations: problems.map(p => ({
      problemId: p.id,
      score: Math.floor(Math.random() * 21) + 80, // 80-100점 사이의 랜덤 점수
      feedback: `"${p.title}" 문제에 대한 답변은 매우 훌륭합니다. 핵심 개념을 정확히 이해하고 있으며, 논리 전개 과정이 명확합니다. 특히, 삼각형 분할을 이용한 설명 방식은 매우 효과적이었습니다.`
    }))
  };

  // Transform the AI response to the format expected by the app
  const result: EvaluationResult = {
    generalFeedback: mockAiResponse.generalFeedback,
    evaluations: {},
  };

  mockAiResponse.evaluations.forEach(ev => {
    result.evaluations[ev.problemId] = {
      score: ev.score,
      feedback: ev.feedback,
    };
  });

  // Simulate a potential error
  const shouldSimulateError = false; //
  if (shouldSimulateError) {
     throw new Error("AI 평가 중 예기치 않은 오류가 발생했습니다. (시뮬레이션)");
  }

  console.log("Mock evaluation result:", result);
  return result;
};
