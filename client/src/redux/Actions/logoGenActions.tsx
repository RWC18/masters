import axios from 'axios';
import { BACKEND_BASE_URL, STATUS_TYPES } from './constants';

export const logoGenActions = {
  SET_BRANDNAME_LOGO: 'SET_BRANDNAME_LOGO',
  SET_TAGLINE_LOGO: 'SET_TAGLINE_LOGO',
  SET_SELECTED_INDUSTRY_LOGO: 'SET_SELECTED_INDUSTRY_LOGO',
  SET_SELECTED_COLOR_LOGO: 'SET_SELECTED_COLOR_LOGO',
  SET_LOADING_LOGO: 'SET_LOADING_LOGO',
  SET_RESULTS_LOGO: 'SET_RESULTS_LOGO',
  SET_ERROR_LOGO: 'SET_ERROR_LOGO',
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
  async (dispatch: any) => {
    try {
      dispatch({
        type: logoGenActions.SET_ERROR_LOGO,
        data: false,
      });
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
        { ...data, count }
      );

      if (res.data.status === STATUS_TYPES.SUCCESS) {
        const inferenceId = res.data.data.inference_id;
        const results = await getLogoResults(inferenceId);

        dispatch({
          type: logoGenActions.SET_RESULTS_LOGO,
          data: results?.data?.data || [],
        });
      } else {
        dispatch({
          type: logoGenActions.SET_ERROR_LOGO,
          data: true,
        });
      }

      dispatch({
        type: logoGenActions.SET_LOADING_LOGO,
        data: false,
      });
    } catch (e) {
      dispatch({
        type: logoGenActions.SET_ERROR_LOGO,
        data: true,
      });
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
        `${BACKEND_BASE_URL}/generation/logo?tid=${inferenceId}`
      );
      status = res.data.data.status;

      if (
        status !== STATUS_TYPES.PROCESSING &&
        status !== STATUS_TYPES.QUEUED &&
        status !== ''
      ) {
        return { response: res, data: res.data.data };
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  } catch (e) {
    return { response: e, data: null };
  }
};
