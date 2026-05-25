import axios from 'axios';
import {
  forceDownload,
  getUser,
  mainActionTypes,
  registerUser,
  setPopUpContent,
  setPopUpStatus,
  setUser,
  signInUser,
} from './mainActions';

jest.mock('axios');

describe('mainActions', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns login payload on success', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { ok: true } } as any);
    const res = await signInUser({ email: 'a@a.com', password: 'x' });
    expect(res).toEqual({ ok: true });
  });

  it('returns error payload on login failure', async () => {
    mockedAxios.post.mockRejectedValueOnce({ response: { data: { message: 'bad' } } });
    const res = await signInUser({ email: 'a@a.com', password: 'x' });
    expect(res).toEqual({ message: 'bad' });
  });

  it('returns register payload and get user payload', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { created: true } } as any);
    mockedAxios.post.mockResolvedValueOnce({ data: { result: { id: '1' } } } as any);

    const reg = await registerUser({ email: 'a@a.com', password: 'x', full_name: 'n' });
    const user = await getUser('token');
    expect(reg).toEqual({ created: true });
    expect(user).toEqual({ result: { id: '1' } });
  });

  it('dispatches setUser/setPopUpStatus/setPopUpContent', async () => {
    const dispatch = jest.fn();
    await setUser({ id: 'u1' } as any)(dispatch);
    await setPopUpStatus(true)(dispatch);
    await setPopUpContent('content')(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: mainActionTypes.SET_USER, data: { id: 'u1' } });
    expect(dispatch).toHaveBeenCalledWith({ type: mainActionTypes.SET_POP_UP_STATUS, data: true });
    expect(dispatch).toHaveBeenCalledWith({ type: mainActionTypes.SET_POP_UP_CONTENT, data: 'content' });
  });

  it('forceDownload creates and clicks anchor', () => {
    const open = jest.fn();
    const send = jest.fn();
    const mockXhr = {
      open,
      send,
      responseType: '',
      response: new Blob(['a']),
      onload: null as null | (() => void),
    };
    (global as any).XMLHttpRequest = jest.fn(() => mockXhr);
    const click = jest.fn();
    const appendChild = jest.spyOn(document.body, 'appendChild');
    const removeChild = jest.spyOn(document.body, 'removeChild');
    const anchor = document.createElement('a');
    anchor.click = click;
    jest.spyOn(document, 'createElement').mockReturnValue(anchor);
    (URL as any).createObjectURL = jest.fn().mockReturnValue('blob:1');

    forceDownload('https://file.png');
    expect(open).toHaveBeenCalledWith('GET', 'https://file.png', true);
    expect(send).toHaveBeenCalled();

    mockXhr.onload && mockXhr.onload();
    expect(appendChild).toHaveBeenCalled();
    expect(click).toHaveBeenCalled();
    expect(removeChild).toHaveBeenCalled();
  });
});
