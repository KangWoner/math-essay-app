import type { Submission } from '../types';

export async function createStudentSheet(submission: Submission): Promise<{ sheetUrl: string }> {
  const gapi = (global as any).gapi || (window as any).gapi;
  if (!gapi || !gapi.client) {
    throw new Error('Google API client not loaded');
  }

  const metadata = {
    name: `${submission.name}-${submission.date}.xlsx`,
    mimeType: 'application/vnd.google-apps.spreadsheet',
  };

  const response = await gapi.client.drive.files.create({
    resource: metadata,
    fields: 'webViewLink',
  });

  return { sheetUrl: response.result.webViewLink };
}
