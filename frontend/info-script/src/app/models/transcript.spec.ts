import { Transcript } from './transcript';

describe('Transcript', () => {
  it('should create an instance', () => {
    const transcript: Transcript = {
      _id: '1',
      title: 'Test Title',
      fileName: 'testFile.txt',
      transcript: 'Test Transcript',
      createdAt: new Date().toISOString(),
      summary: 'Test Summary'
    };
    expect(transcript).toBeTruthy();
  });
});
