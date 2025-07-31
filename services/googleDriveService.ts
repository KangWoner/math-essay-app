import type { Submission } from '../types';

// This is a mock function. In a real application, this would use the
// Google Sheets API to create and populate a spreadsheet.
export const createStudentSheet = async (submission: Submission): Promise<{ sheetUrl:string }> => {
  console.log("Attempting to create Google Sheet for submission:", submission.id);

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Simulate a successful response
  const mockSheetId = `sheet_${new Date().getTime()}`;
  const mockSheetUrl = `https://docs.google.com/spreadsheets/d/${mockSheetId}/edit`;

  console.log(`Mock sheet created for submission ${submission.id} at: ${mockSheetUrl}`);

  // Simulate a potential error
  const shouldSimulateError = false;
  if (shouldSimulateError) {
    throw new Error("Google Sheets API daily quota exceeded. (Simulation)");
  }

  return { sheetUrl: mockSheetUrl };
};
