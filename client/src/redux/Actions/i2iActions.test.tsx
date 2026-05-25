import axios from 'axios';
import { genI2img, i2iActionTypes, setI2iPrompt, setSelectedStylesI2i, uploaderI2I } from './i2iActions';

jest.mock('axios');
jest.mock('uuid', () => ({ v4: () => 'fixed-uuid' }));

describe('i2iActions', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches simple prompt/style actions', async () => {
    const dispatch = jest.fn();
    await setI2iPrompt('hello')(dispatch);
    await setSelectedStylesI2i({ title: 'A', thumbnail: 't', prompt: 'p' })(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: i2iActionTypes.SET_PROMPT_I2I, data: 'hello' });
    expect(dispatch).toHaveBeenCalledWith({
      type: i2iActionTypes.SET_SELECTED_STYLES_I2I,
      data: { title: 'A', thumbnail: 't', prompt: 'p' },
    });
  });

  it('uploads image and dispatches URL', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { data: { url: 'https://img' } } } as any);
    const dispatch = jest.fn();
    const file = new File(['x'], 'test.jpg', { type: 'image/jpeg' });
    await uploaderI2I(file)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: i2iActionTypes.SET_UPLOADED_IMAGE_I2I, data: 'https://img' });
  });

  it('handles upload failure', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('failed'));
    const dispatch = jest.fn();
    const file = new File(['x'], 'test', { type: 'image/png' });
    await uploaderI2I(file)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: i2iActionTypes.SET_UPLOADED_IMAGE_I2I, data: null });
  });

  it('genI2img success path', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { status: 'success', data: ['one'] } } as any);
    const dispatch = jest.fn();
    await genI2img('caption', 'url')(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: i2iActionTypes.SET_RESULTS_I2I, data: ['one'] });
    expect(dispatch).toHaveBeenCalledWith({ type: i2iActionTypes.SET_LOADING_I2I, data: false });
  });

  it('genI2img non-success and error paths', async () => {
    const dispatch = jest.fn();
    mockedAxios.post.mockResolvedValueOnce({ data: { status: 'error' } } as any);
    await genI2img('caption', 'url')(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: i2iActionTypes.SET_ERROR_I2I, data: true });

    mockedAxios.post.mockRejectedValueOnce(new Error('x'));
    await genI2img('caption', 'url')(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: i2iActionTypes.SET_LOADING_I2I, data: false });
  });
});
