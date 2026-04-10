import axios from 'axios';
import {
  avatarActionTypes,
  genAvatar,
  setAvatarPrompt,
  setAvatarStyle,
  uploaderAvatar,
} from './avatarActions';
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

describe('avatarActions', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('dispatches prompt/style actions', async () => {
    const dispatch = jest.fn();
    await setAvatarPrompt('hero')(dispatch);
    await setAvatarStyle('anime')(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: avatarActionTypes.SET_PROMPT_AVATAR,
      data: 'hero',
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: avatarActionTypes.SET_SELECTED_STYLE_AVATAR,
      data: 'anime',
    });
  });

  it('uploads avatar image and handles upload error', async () => {
    localStorage.setItem('access_token_vai', 'token-1');
    mockedAxios.post.mockResolvedValueOnce({
      data: { data: { url: 'avatar-url' } },
    } as any);

    const dispatch = jest.fn();
    const file = new File(['abc'], 'face.png', { type: 'image/png' });
    await uploaderAvatar(file)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: avatarActionTypes.SET_UPLOADED_IMAGE_AVATAR,
      data: 'avatar-url',
    });

    mockedAxios.post.mockRejectedValueOnce(new Error('upload'));
    await uploaderAvatar(file)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: avatarActionTypes.SET_UPLOADED_IMAGE_AVATAR,
      data: null,
    });
  });

  it('handles generation success including history and balance update', async () => {
    jest.spyOn(global, 'setTimeout').mockImplementation((cb: any) => {
      cb();
      return 0 as any;
    });
    mockedAxios.post.mockResolvedValueOnce({
      data: { status: 'success', data: { inference_id: 'av-1' }, balance: 1 },
    } as any);
    mockedAxios.get.mockResolvedValueOnce({
      data: { data: { status: 'success', data: [{ url: 'avatar-1' }] } },
    } as any);

    const dispatch = jest.fn();
    const getState = () => ({ main: { user: { id: 'u1', credits: 4 } } });
    await genAvatar('person', 'img-url', 'anime style')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: avatarActionTypes.SET_RESULTS_AVATAR,
      data: [{ url: 'avatar-1' }],
    });
    expect(saveGenerationHistory).toHaveBeenCalledWith('avatar', {
      prompt: 'person, anime style',
      images: ['avatar-1'],
    });
  });

  it('handles non-success status and catch path', async () => {
    const dispatch = jest.fn();
    const getState = () => ({ main: { user: null } });

    mockedAxios.post.mockResolvedValueOnce({ data: { status: 'error' } } as any);
    await genAvatar('person', 'img-url')(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith({
      type: avatarActionTypes.SET_ERROR_AVATAR,
      data: true,
    });

    mockedAxios.post.mockRejectedValueOnce(new Error('network'));
    await genAvatar('person', 'img-url')(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith({
      type: avatarActionTypes.SET_LOADING_AVATAR,
      data: false,
    });
  });
});
