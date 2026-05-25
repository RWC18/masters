import { getAuthHeaders, BACKEND_BASE_URL, STATUS_TYPES, headers } from './constants';
import { LOCALSTORAGE_KEYS } from '../../constants/constants';

describe('actions/constants', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    localStorage.clear();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('builds backend base url from env without trailing slash', async () => {
    process.env.REACT_APP_BACKEND_URL = 'https://example.com/';
    const mod = await import('./constants');
    expect(mod.BACKEND_BASE_URL).toBe('https://example.com/api/v1');
  });

  it('falls back backend base url when env is missing', async () => {
    delete process.env.REACT_APP_BACKEND_URL;
    const mod = await import('./constants');
    expect(mod.BACKEND_BASE_URL).toBe('/api/v1');
  });

  it('returns auth headers only when token exists', () => {
    expect(getAuthHeaders()).toEqual({});
    localStorage.setItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN, 'abc');
    expect(getAuthHeaders()).toEqual({ Authorization: 'Bearer abc' });
  });

  it('exposes status types and default headers shape', () => {
    expect(STATUS_TYPES.SUCCESS).toBe('success');
    expect(headers.platform).toBe('website');
  });

  it('imports default base url constant', () => {
    expect(BACKEND_BASE_URL).toBeDefined();
  });
});
