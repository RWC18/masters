import axios from 'axios';
import { fetchHistory, saveGenerationHistory } from './historyActions';
import { LOCALSTORAGE_KEYS } from '../../constants/constants';

jest.mock('axios');

describe('historyActions', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('does not send save request without token', async () => {
    await saveGenerationHistory('t2i', { prompt: 'cat' });
    expect(mockedAxios.post).not.toHaveBeenCalled();
  });

  it('saves history when token exists and ignores errors', async () => {
    localStorage.setItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN, 'token');
    mockedAxios.post.mockResolvedValueOnce({ data: { status: 'success' } } as any);
    await saveGenerationHistory('avatar', { prompt: 'me' });
    expect(mockedAxios.post).toHaveBeenCalled();

    mockedAxios.post.mockRejectedValueOnce(new Error('x'));
    await expect(saveGenerationHistory('logo', { brand: 'b' })).resolves.toBeUndefined();
  });

  it('fetchHistory returns [] without token', async () => {
    await expect(fetchHistory()).resolves.toEqual([]);
  });

  it('fetchHistory returns records on success and [] on invalid payload/error', async () => {
    localStorage.setItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN, 'token');
    mockedAxios.get.mockResolvedValueOnce({ data: { status: 'success', data: [{ _id: '1' }] } } as any);
    await expect(fetchHistory('t2i')).resolves.toEqual([{ _id: '1' }]);

    mockedAxios.get.mockResolvedValueOnce({ data: { status: 'success', data: null } } as any);
    await expect(fetchHistory()).resolves.toEqual([]);

    mockedAxios.get.mockRejectedValueOnce(new Error('fail'));
    await expect(fetchHistory()).resolves.toEqual([]);
  });
});
