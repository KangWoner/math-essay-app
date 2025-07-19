export interface Evaluation {
  score: number;
  feedback: string;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
}

// AI가 생성하는 평가 결과의 구조
export interface AiEvaluationResponse {
  generalFeedback: string;
  // AI가 문제 ID와 함께 평가를 반환하도록 변경하여 안정성 향상
  evaluations: {
    problemId: string;
    score: number;
    feedback: string;
  }[];
}

// 앱에서 사용하는 평가 결과의 구조 (문제 ID와 매핑됨)
export interface EvaluationResult {
  generalFeedback: string;
  evaluations: Record<string, Evaluation>; // e.g. { 'problem-1': { score: 90, ... } }
}

export interface SubmissionFormData {
  name: string;
  date: string;
  answers: Record<string, string>; // e.g. { 'problem-1': 'The answer is...' }
}

export interface Submission extends Omit<SubmissionFormData, 'answers'> {
  id: string;
  submittedAt: Date;
  evaluation: EvaluationResult;
  problems: Problem[];
  answers: Record<string, string>;
  name: string;
  date: string;
  isSavedToDrive?: boolean;
  driveSheetUrl?: string; // Google Sheet 파일 URL (시뮬레이션용)
}
