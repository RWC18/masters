import axios from 'axios';
import {
  removeBgActionTypes,
  resetRemoveBg,
  uploadAndRemoveBg,
} from './removeBgActions';
import { saveGenerationHistory } from './historyActions';

jest.mock('axios');
jest.mock('uuid', () => ({ v4: () => 'fixed-uuid' }));
jest.mock('./historyActions', () => ({
  saveGenerationHistory: jest.fn(() => Promise.resolve()),
}));
jest.mock('./mainActions', () => ({
  ...jest.requireActual('./mainActions'),
  setUser: jest.fn((user: unknown) => ({ type: 'SET_USER', data: user })),
}));

describe('removeBgActions', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('uploads image and removes background successfully', async () => {
    localStorage.setItem('access_token_vai', 'token-1');
    mockedAxios.post
      .mockResolvedValueOnce({ data: { data: { url: 'orig-url' } } } as any)
      .mockResolvedValueOnce({
        data: { status: 'success', data: { url: 'result-url' }, balance: 3 },
      } as any);

    const dispatch = jest.fn();
    const getState = () => ({ main: { user: { id: 'u1', credits: 5 } } });
    const file = new File(['abc'], 'photo.jpg', { type: 'image/jpeg' });

    await uploadAndRemoveBg(file)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: removeBgActionTypes.SET_ORIGINAL_IMAGE,
      data: 'orig-url',
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: removeBgActionTypes.SET_RESULT_IMAGE,
      data: 'result-url',
    });
    expect(saveGenerationHistory).toHaveBeenCalledWith('removebg', {
      original_url: 'orig-url',
      result_url: 'result-url',
    });
  });

  it('handles unsuccessful status and thrown errors', async () => {
    const dispatch = jest.fn();
    const getState = () => ({ main: { user: null } });
    const file = new File(['abc'], 'photo.jpg', { type: 'image/jpeg' });

    mockedAxios.post
      .mockResolvedValueOnce({ data: { data: { url: 'orig-url' } } } as any)
      .mockResolvedValueOnce({ data: { status: 'error' } } as any);
    await uploadAndRemoveBg(file)(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith({
      type: removeBgActionTypes.SET_ERROR_REMOVEBG,
      data: true,
    });

    mockedAxios.post.mockRejectedValueOnce(new Error('network'));
    await uploadAndRemoveBg(file)(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith({
      type: removeBgActionTypes.SET_LOADING_REMOVEBG,
      data: false,
    });
  });

  it('dispatches reset action', () => {
    const dispatch = jest.fn();
    resetRemoveBg()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: removeBgActionTypes.RESET_REMOVEBG,
    });
  });
});
