import axios from 'axios';
import { AI_API, headers } from './constants';

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
      text_prompt: string;
      tagline: string;
      industries: any[];
      palettes: any[];
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
        `${AI_API}/logo-generator/v1/?limit=${count}`,
        data,
        {
          headers,
        }
      );
      if (res.status === 200) {
        dispatch({
          type: logoGenActions.SET_RESULTS_LOGO,
          data: res.data.data,
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
