const { scan, scanPure, shellFiles } = require('@sliit-foss/bashaway');

let files = [];

beforeAll(() => {
  files = scan('**', ['src/**']);
});

test('should validate if only bash files are present', () => {
  expect(shellFiles().length).toBe(files.length);
});

test('should check if there is only one output file', () => {
  expect(scanPure('./out/**').length).toBe(1);
});
test('should check if the output file name is mutateX.txt', () => {
  expect(scanPure('./out/**')[0].endsWith('mutateX.txt')).toBe(true);
});
