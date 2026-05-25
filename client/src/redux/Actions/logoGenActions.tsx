import axios from 'axios';
import { BACKEND_BASE_URL, STATUS_TYPES, getAuthHeaders } from './constants';
import { saveGenerationHistory } from './historyActions';
import { setUser } from './mainActions';
import {
  handleAxiosGenerationError,
  handleResponseGenerationError,
} from './generationErrorHandler';

export const logoGenActions = {
  SET_BRANDNAME_LOGO: 'SET_BRANDNAME_LOGO',
  SET_TAGLINE_LOGO: 'SET_TAGLINE_LOGO',
  SET_SELECTED_INDUSTRY_LOGO: 'SET_SELECTED_INDUSTRY_LOGO',
  SET_SELECTED_COLOR_LOGO: 'SET_SELECTED_COLOR_LOGO',
  SET_LOADING_LOGO: 'SET_LOADING_LOGO',
  SET_RESULTS_LOGO: 'SET_RESULTS_LOGO',
  SET_ERROR_LOGO: 'SET_ERROR_LOGO',
};

const setError = (dispatch: any, message: string | null) => {
  dispatch({ type: logoGenActions.SET_ERROR_LOGO, data: message });
};

export const setLogoBrandname =
  (brandname: string) => async (dispatch: any) => {
    dispatch({
      type: logoGenActions.SET_BRANDNAME_LOGO,
      data: brandname,
    });
  };

export const setLogoTagline = (tagline: string) => async (dispatch: any) => {
  dispatch({
    type: logoGenActions.SET_TAGLINE_LOGO,
    data: tagline,
  });
};

export const setSelectedIndustryLogoGen =
  (industry: any) => async (dispatch: any) => {
    dispatch({
      type: logoGenActions.SET_SELECTED_INDUSTRY_LOGO,
      data: industry,
    });
  };

export const setSelectedColorLogoGen =
  (color: any) => async (dispatch: any) => {
    dispatch({
      type: logoGenActions.SET_SELECTED_COLOR_LOGO,
      data: color,
    });
  };

export const genLogo =
  (
    data: {
      brand_name: string;
      business_description: string;
      color_tone: string;
    },
    count: number
  ) =>
  async (dispatch: any, getState: any) => {
    try {
      setError(dispatch, null);
      dispatch({
        type: logoGenActions.SET_RESULTS_LOGO,
        data: [],
      });
      dispatch({
        type: logoGenActions.SET_LOADING_LOGO,
        data: true,
      });

      const res = await axios.post(
        `${BACKEND_BASE_URL}/generation/logo`,
        { ...data, count },
        { headers: getAuthHeaders() }
      );

      if (res.data.status === STATUS_TYPES.SUCCESS) {
        const inferenceId = res.data.data.inference_id;
        const results = await getLogoResults(inferenceId);
        const resultsData = results?.data?.data || [];

        if (!resultsData.length) {
          setError(
            dispatch,
            results?.failed
              ? 'Generation failed. Please try again.'
              : 'No logos were returned. Please try again.'
          );
        } else {
          dispatch({
            type: logoGenActions.SET_RESULTS_LOGO,
            data: resultsData,
          });
          const images = Array.isArray(resultsData)
            ? resultsData.map((img: any) =>
                typeof img === 'string' ? img : img?.url
              )
            : [];
          saveGenerationHistory('logo', {
            brand_name: data.brand_name,
            images,
          }).catch(() => {});
        }

        if (typeof res?.data?.balance === 'number') {
          const currentUser = getState()?.main?.user;
          if (currentUser) {
            dispatch(setUser({ ...currentUser, credits: res.data.balance }));
          }
        }
      } else if (
        !handleResponseGenerationError(dispatch, res.data, (msg) =>
          setError(dispatch, msg)
        )
      ) {
        setError(dispatch, 'Generation failed. Please try again.');
      }

      dispatch({
        type: logoGenActions.SET_LOADING_LOGO,
        data: false,
      });
    } catch (e) {
      handleAxiosGenerationError(dispatch, e, (msg) =>
        setError(dispatch, msg)
      );
      dispatch({
        type: logoGenActions.SET_LOADING_LOGO,
        data: false,
      });
    }
  };

const getLogoResults = async (inferenceId: string) => {
  try {
    let status = '';

    while (
      status === STATUS_TYPES.PROCESSING ||
      status === STATUS_TYPES.QUEUED ||
      status === ''
    ) {
      const res = await axios.get(
        `${BACKEND_BASE_URL}/generation/logo?tid=${inferenceId}`,
        { headers: getAuthHeaders() }
      );
      status = res.data.data.status;

      if (
        status !== STATUS_TYPES.PROCESSING &&
        status !== STATUS_TYPES.QUEUED &&
        status !== ''
      ) {
        if (status === STATUS_TYPES.ERROR || status === 'failed') {
          return { response: res, data: res.data.data, failed: true };
        }
        return { response: res, data: res.data.data, failed: false };
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    return { response: null, data: null, failed: true };
  } catch (e) {
    return { response: e, data: null, failed: true };
  }
};
