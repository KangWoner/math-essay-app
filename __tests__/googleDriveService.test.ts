import { createStudentSheet } from '../services/googleDriveService';
import type { Submission } from '../types';

declare const global: any;

describe('createStudentSheet', () => {
  it('creates sheet and returns URL', async () => {
    const mockCreate = jest.fn().mockResolvedValue({ result: { webViewLink: 'url' } });
    global.gapi = { client: { drive: { files: { create: mockCreate } } } };

    const submission = {
      id: '1',
      name: 'Jane',
      date: '2024-01-01',
      submittedAt: new Date(),
      answers: {},
      problems: [],
      evaluation: { generalFeedback: '', evaluations: {} },
    } as Submission;

    const result = await createStudentSheet(submission);
    expect(result.sheetUrl).toBe('url');
    expect(mockCreate).toHaveBeenCalled();
  });
});
