import type { Submission } from '../types';

declare global {
  interface Window {
    gapi: any;
  }
}

export async function createStudentSheet(submission: Submission): Promise<{ sheetUrl: string }> {
  if (typeof window === 'undefined' || !window.gapi?.client) {
    // Fallback simulation
    return { sheetUrl: `https://docs.google.com/spreadsheets/d/${submission.id}` };
  }

  const sheets = window.gapi.client.sheets;
  const title = `${submission.name}_${submission.date}`;

  const createRes = await sheets.spreadsheets.create({
    properties: { title },
  });

  const spreadsheetId = createRes.result.spreadsheetId as string;
  const sheetUrl = createRes.result.spreadsheetUrl as string;

  const values = [
    ['문제', '답변', '점수', '피드백'],
    ...submission.problems.map(p => [
      p.title,
      submission.answers[p.id] || '',
      submission.evaluation.evaluations[p.id]?.score ?? '',
      submission.evaluation.evaluations[p.id]?.feedback ?? '',
    ]),
    ['총평', submission.evaluation.generalFeedback],
  ];

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Sheet1!A1',
    valueInputOption: 'RAW',
    values,
  });

  return { sheetUrl };
}
