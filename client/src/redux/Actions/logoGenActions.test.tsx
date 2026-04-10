import axios from 'axios';
import {
  genLogo,
  logoGenActions,
  setLogoBrandname,
  setLogoTagline,
  setSelectedColorLogoGen,
  setSelectedIndustryLogoGen,
} from './logoGenActions';
import { saveGenerationHistory } from './historyActions';

jest.mock('axios');
jest.mock('./historyActions', () => ({
  saveGenerationHistory: jest.fn(() => Promise.resolve()),
}));
jest.mock('./mainActions', () => ({
  ...jest.requireActual('./mainActions'),
  setUser: jest.fn((user: unknown) => ({ type: 'SET_USER', data: user })),
}));

describe('logoGenActions', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches simple field actions', async () => {
    const dispatch = jest.fn();
    await setLogoBrandname('Acme')(dispatch);
    await setLogoTagline('Fast')(dispatch);
    await setSelectedIndustryLogoGen('tech')(dispatch);
    await setSelectedColorLogoGen('blue')(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: logoGenActions.SET_BRANDNAME_LOGO,
      data: 'Acme',
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: logoGenActions.SET_TAGLINE_LOGO,
      data: 'Fast',
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: logoGenActions.SET_SELECTED_INDUSTRY_LOGO,
      data: 'tech',
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: logoGenActions.SET_SELECTED_COLOR_LOGO,
      data: 'blue',
    });
  });

  it('handles success flow and balance update', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { status: 'success', data: { inference_id: 'lg-1' }, balance: 2 },
    } as any);
    mockedAxios.get.mockResolvedValueOnce({
      data: { data: { status: 'success', data: [{ url: 'logo-1' }] } },
    } as any);

    const dispatch = jest.fn();
    const getState = () => ({ main: { user: { id: 'u1', credits: 10 } } });
    await genLogo({ brand_name: 'Acme', business_description: 'desc', color_tone: 'blue' }, 1)(
      dispatch,
      getState
    );

    expect(dispatch).toHaveBeenCalledWith({
      type: logoGenActions.SET_RESULTS_LOGO,
      data: [{ url: 'logo-1' }],
    });
    expect(saveGenerationHistory).toHaveBeenCalledWith('logo', {
      brand_name: 'Acme',
      images: ['logo-1'],
    });
  });

  it('handles non-success and errors', async () => {
    const dispatch = jest.fn();
    const getState = () => ({ main: { user: null } });

    mockedAxios.post.mockResolvedValueOnce({ data: { status: 'error' } } as any);
    await genLogo({ brand_name: 'X', business_description: 'Y', color_tone: 'Z' }, 1)(
      dispatch,
      getState
    );
    expect(dispatch).toHaveBeenCalledWith({
      type: logoGenActions.SET_ERROR_LOGO,
      data: true,
    });

    mockedAxios.post.mockRejectedValueOnce(new Error('boom'));
    await genLogo({ brand_name: 'X', business_description: 'Y', color_tone: 'Z' }, 1)(
      dispatch,
      getState
    );
    expect(dispatch).toHaveBeenCalledWith({
      type: logoGenActions.SET_LOADING_LOGO,
      data: false,
    });
  });
});
