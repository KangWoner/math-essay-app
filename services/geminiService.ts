import { GoogleGenerativeAI } from '@google/genai';
import type { Problem, SubmissionFormData, EvaluationResult, Evaluation, AiEvaluationResponse } from '../types';

export async function evaluateAnswers(problems: Problem[], formData: SubmissionFormData): Promise<EvaluationResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY가 설정되지 않았습니다.');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const promptParts = problems.map((p) => {
    const answer = formData.answers[p.id] || '';
    return `문제ID: ${p.id}\n문제: ${p.title}\n답변: ${answer}`;
  }).join('\n\n');

  const systemPrompt = '다음 학생의 답변을 채점하고 JSON 형식으로 결과를 반환하세요.';

  const result = await model.generateContent([systemPrompt, promptParts]);
  const response = await result.response;
  const text = response.text();

  let aiResponse: AiEvaluationResponse;
  try {
    aiResponse = JSON.parse(text) as AiEvaluationResponse;
  } catch (e) {
    throw new Error('AI 응답을 파싱할 수 없습니다.');
  }

  const evaluations: Record<string, Evaluation> = {};
  aiResponse.evaluations.forEach((e) => {
    evaluations[e.problemId] = { score: e.score, feedback: e.feedback };
  });

  return { generalFeedback: aiResponse.generalFeedback, evaluations };
}
