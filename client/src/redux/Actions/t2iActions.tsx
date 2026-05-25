import axios from 'axios';
import { BACKEND_BASE_URL, STATUS_TYPES, getAuthHeaders } from './constants';
import { saveGenerationHistory } from './historyActions';
import { setUser } from './mainActions';
import {
  handleAxiosGenerationError,
  handleResponseGenerationError,
} from './generationErrorHandler';

export const t2iActionTypes = {
  SET_PROMPT_T2I: 'SET_PROMPT_T2I',
  SET_SELECTED_STYLES_T2I: 'SET_SELECTED_STYLES_T2I',
  SET_LOADING_T2I: 'SET_LOADING_T2I',
  SET_RESULTS_T2I: 'SET_RESULTS_T2I',
  SET_ERROR_T2I: 'SET_ERROR_T2I',
};

const setError = (dispatch: any, message: string | null) => {
  dispatch({ type: t2iActionTypes.SET_ERROR_T2I, data: message });
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

export const genT2img = (caption: string) => async (dispatch: any, getState: any) => {
  try {
    setError(dispatch, null);
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
      { prompt: caption },
      { headers: getAuthHeaders() }
    );

    if (res.data.status === STATUS_TYPES.SUCCESS) {
      const tid = res.data.data.inference_id;
      const results = await getT2IResults(tid);
      const data = results?.data?.data || [];

      if (!data.length) {
        setError(
          dispatch,
          results?.failed
            ? 'Generation failed. Please try again.'
            : 'No images were returned. Please try again.'
        );
      } else {
        dispatch({
          type: t2iActionTypes.SET_RESULTS_T2I,
          data,
        });
        const images = Array.isArray(data)
          ? data.map((img: any) => (typeof img === 'string' ? img : img?.url))
          : [];
        saveGenerationHistory('t2i', { prompt: caption, images }).catch(
          () => {}
        );
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
      type: t2iActionTypes.SET_LOADING_T2I,
      data: false,
    });
  } catch (e) {
    handleAxiosGenerationError(dispatch, e, (msg) => setError(dispatch, msg));
    dispatch({
      type: t2iActionTypes.SET_LOADING_T2I,
      data: false,
    });
  }
};

export const getT2IResults = async (tid: string) => {
  try {
    let status = '';

    while (
      status === STATUS_TYPES.PROCESSING ||
      status === STATUS_TYPES.QUEUED ||
      status === ''
    ) {
      const res = await axios.get(
        `${BACKEND_BASE_URL}/generation/t2i?tid=${tid}`,
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
