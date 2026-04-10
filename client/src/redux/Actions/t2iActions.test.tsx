import axios from 'axios';
import {
  genT2img,
  getT2IResults,
  setSelectedStylesT2i,
  setT2iPrompt,
  t2iActionTypes,
} from './t2iActions';
import { saveGenerationHistory } from './historyActions';

jest.mock('axios');
jest.mock('./historyActions', () => ({
  saveGenerationHistory: jest.fn(() => Promise.resolve()),
}));
jest.mock('./mainActions', () => ({
  ...jest.requireActual('./mainActions'),
  setUser: jest.fn((user: unknown) => ({ type: 'SET_USER', data: user })),
}));

describe('t2iActions', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('dispatches prompt and style actions', async () => {
    const dispatch = jest.fn();
    await setT2iPrompt('cat')(dispatch);
    await setSelectedStylesT2i({ title: 'Ink', thumbnail: 'i.png', prompt: 'ink' })(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: t2iActionTypes.SET_PROMPT_T2I,
      data: 'cat',
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: t2iActionTypes.SET_SELECTED_STYLES_T2I,
      data: { title: 'Ink', thumbnail: 'i.png', prompt: 'ink' },
    });
  });

  it('handles successful generation and updates user balance', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { status: 'success', data: { inference_id: 'tid-1' }, balance: 7 },
    } as any);
    mockedAxios.get.mockResolvedValueOnce({
      data: { data: { status: 'success', data: [{ url: 'img-1' }, { url: 'img-2' }] } },
    } as any);

    const dispatch = jest.fn();
    const getState = () => ({ main: { user: { id: 'u1', credits: 10 } } });
    await genT2img('my prompt')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: t2iActionTypes.SET_RESULTS_T2I,
      data: [{ url: 'img-1' }, { url: 'img-2' }],
    });
    expect(saveGenerationHistory).toHaveBeenCalledWith('t2i', {
      prompt: 'my prompt',
      images: ['img-1', 'img-2'],
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: t2iActionTypes.SET_LOADING_T2I,
      data: false,
    });
  });

  it('handles unsuccessful generation and caught errors', async () => {
    const dispatch = jest.fn();
    const getState = () => ({ main: { user: null } });

    mockedAxios.post.mockResolvedValueOnce({ data: { status: 'error' } } as any);
    await genT2img('bad')(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith({
      type: t2iActionTypes.SET_ERROR_T2I,
      data: true,
    });

    mockedAxios.post.mockRejectedValueOnce(new Error('network'));
    await genT2img('boom')(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith({
      type: t2iActionTypes.SET_LOADING_T2I,
      data: false,
    });
  });

  it('getT2IResults polls until non-processing status', async () => {
    jest.spyOn(global, 'setTimeout').mockImplementation((cb: any) => {
      cb();
      return 0 as any;
    });
    mockedAxios.get
      .mockResolvedValueOnce({ data: { data: { status: 'processing' } } } as any)
      .mockResolvedValueOnce({
        data: { data: { status: 'success', data: [{ url: 'done' }] } },
      } as any);

    const res = await getT2IResults('tid-2');
    expect(res?.data).toEqual({ status: 'success', data: [{ url: 'done' }] });
  });
});
