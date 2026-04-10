// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
jest.mock('axios');

const originalConsoleError = console.error;

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args: unknown[]) => {
    const firstArg = args[0];
    const message = typeof firstArg === 'string' ? firstArg : '';
    if (message.includes('ReactDOMTestUtils.act is deprecated')) {
      return;
    }
    originalConsoleError(...(args as Parameters<typeof console.error>));
  });
});

afterAll(() => {
  const errorSpy = console.error as unknown as { mockRestore?: () => void };
  if (typeof errorSpy.mockRestore === 'function') {
    errorSpy.mockRestore();
  }
});
