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
// ========== 기존 코드 (그대로 두세요) ==========

export type ModelName = 'gemini-2.5-flash' | 'gemini-2.5-pro' | 'gemini-3-pro-preview';

export interface StudentData {
  id: string;
  name: string;
  email: string;
  solutionFiles: File[];
  reportTemplate: string;
}

export interface FormData {
  examInfo: string;
  scoringCriteria: string;
  examMaterials: File[];
  students: StudentData[];
  model: ModelName;
}

export interface ReportData {
  htmlContent: string;
  studentEmail: string;
  studentName: string;
  examInfo: string;
  generationDate: string;
}

export interface FileContent {
  mimeType: string;
  data: string;
}

// ========== 여기부터 새로 추가 ==========

export interface StudentRecord {
  id: string;
  date: string;
  examInfo: string;
  totalScore: number;
  maxScore: number;
  weaknesses: string[];
  strengths: string[];
  criteriaScores: {
    criterion: string;
    score: number;
    maxScore: number;
  }[];
}

export interface StudentHistory {
  studentId: string;
  studentName: string;
  studentEmail: string;
  records: StudentRecord[];
}
