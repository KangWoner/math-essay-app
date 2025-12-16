import { GoogleGenerativeAI } from '@google/genai';
import type { Problem, SubmissionFormData, Evaluation, EvaluationResult, AiEvaluationResponse } from '../types';

export async function evaluateAnswers(problems: Problem[], formData: SubmissionFormData): Promise<EvaluationResult> {
  const apiKey = process.env.GEMINI_API_KEY || '';
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = problems.map(p => `Q:${p.description}\nA:${formData.answers[p.id] || ''}`).join('\n');

  const result = await model.generateContent(prompt);
  const text = await result.response.text();
  const ai: AiEvaluationResponse = JSON.parse(text);

  const evaluations: Record<string, Evaluation> = {};
  for (const e of ai.evaluations) {
    evaluations[e.problemId] = { score: e.score, feedback: e.feedback };
  }

  return {
    generalFeedback: ai.generalFeedback,
    evaluations,
  };
}
