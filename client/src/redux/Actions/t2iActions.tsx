import axios from 'axios';
import { BACKEND_BASE_URL, STATUS_TYPES } from './constants';
import { saveGenerationHistory } from './historyActions';

export const t2iActionTypes = {
  SET_PROMPT_T2I: 'SET_PROMPT_T2I',
  SET_SELECTED_STYLES_T2I: 'SET_SELECTED_STYLES_T2I',
  SET_LOADING_T2I: 'SET_LOADING_T2I',
  SET_RESULTS_T2I: 'SET_RESULTS_T2I',
  SET_ERROR_T2I: 'SET_ERROR_T2I',
};

export const setT2iPrompt = (prompt: string) => async (dispatch: any) => {
  dispatch({
    type: t2iActionTypes.SET_PROMPT_T2I,
    data: prompt,
  });
};

export const setSelectedStylesT2i =
  (style: { title: string; thumbnail: string; prompt: string }) =>
  async (dispatch: any) => {
    dispatch({
      type: t2iActionTypes.SET_SELECTED_STYLES_T2I,
      data: style,
    });
  };

export const genT2img = (caption: string) => async (dispatch: any) => {
  try {
    dispatch({
      type: t2iActionTypes.SET_ERROR_T2I,
      data: false,
    });
    dispatch({
      type: t2iActionTypes.SET_RESULTS_T2I,
      data: [],
    });
    dispatch({
      type: t2iActionTypes.SET_LOADING_T2I,
      data: true,
    });
    const res = await axios.post(
      `${BACKEND_BASE_URL}/generation/t2i`,
      { prompt: caption }
    );

    if (res.data.status === STATUS_TYPES.SUCCESS) {
      const tid = res.data.data.inference_id;
      const results = await getT2IResults(tid);
      const data = results?.data?.data || [];
      dispatch({
        type: t2iActionTypes.SET_RESULTS_T2I,
        data,
      });
      const images = Array.isArray(data) ? data.map((img: any) => (typeof img === 'string' ? img : img?.url)) : [];
      saveGenerationHistory('t2i', { prompt: caption, images }).catch(() => {});
    } else {
      dispatch({
        type: t2iActionTypes.SET_ERROR_T2I,
        data: true,
      });
    }

    dispatch({
      type: t2iActionTypes.SET_LOADING_T2I,
      data: false,
    });
  } catch (e) {
    dispatch({
      type: t2iActionTypes.SET_ERROR_T2I,
      data: true,
    });
    dispatch({
      type: t2iActionTypes.SET_LOADING_T2I,
      data: false,
    });
  }
};


export const getT2IResults =
async (tid: string) => {
    try {
      let status = '';

      while (
        status === STATUS_TYPES.PROCESSING ||
        status === STATUS_TYPES.QUEUED
        || status === ''
      ) {
        const res = await axios.get(
          `${BACKEND_BASE_URL}/generation/t2i?tid=${tid}`
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