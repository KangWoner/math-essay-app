import { evaluateAnswers } from '../services/geminiService';
import { GoogleGenerativeAI } from '@google/genai';
import type { Problem, SubmissionFormData } from '../types';

jest.mock('@google/genai');

describe('evaluateAnswers', () => {
  it('parses AI response and returns evaluation result', async () => {
    const mockGenerate = jest.fn().mockResolvedValue({
      response: { text: () => Promise.resolve(JSON.stringify({
        generalFeedback: 'good',
        evaluations: [
          { problemId: 'p1', score: 90, feedback: 'nice' },
        ],
      })) },
    });

    (GoogleGenerativeAI as jest.Mock).mockImplementation(() => ({
      getGenerativeModel: () => ({ generateContent: mockGenerate }),
    }));

    const problems: Problem[] = [{ id: 'p1', title: 't', description: 'd' }];
    const formData: SubmissionFormData = {
      name: 's',
      date: 'today',
      answers: { p1: 'answer' },
    };

    const result = await evaluateAnswers(problems, formData);
    expect(result.generalFeedback).toBe('good');
    expect(result.evaluations.p1.score).toBe(90);
    expect(mockGenerate).toHaveBeenCalled();
  });
});
