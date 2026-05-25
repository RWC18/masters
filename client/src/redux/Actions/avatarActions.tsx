import axios from 'axios';
import { BACKEND_BASE_URL, STATUS_TYPES, getAuthHeaders } from './constants';
import { v4 as uuidv4 } from 'uuid';
import { saveGenerationHistory } from './historyActions';
import { LOCALSTORAGE_KEYS } from '../../constants/constants';
import { setUser } from './mainActions';
import { parseApiError } from './apiError';
import {
  handleAxiosGenerationError,
  handleResponseGenerationError,
} from './generationErrorHandler';

export const avatarActionTypes = {
  SET_PROMPT_AVATAR: 'SET_PROMPT_AVATAR',
  SET_UPLOADED_IMAGE_AVATAR: 'SET_UPLOADED_IMAGE_AVATAR',
  SET_LOADING_AVATAR: 'SET_LOADING_AVATAR',
  SET_RESULTS_AVATAR: 'SET_RESULTS_AVATAR',
  SET_ERROR_AVATAR: 'SET_ERROR_AVATAR',
  SET_SELECTED_STYLE_AVATAR: 'SET_SELECTED_STYLE_AVATAR',
};

const setError = (dispatch: any, message: string | null) => {
  dispatch({ type: avatarActionTypes.SET_ERROR_AVATAR, data: message });
};

const getFileExtension = (filename: string): string => {
  const lastDot = filename.lastIndexOf('.');
  return lastDot !== -1 ? filename.substring(lastDot) : '.png';
};

export const uploaderAvatar = (file: File) => async (dispatch: any) => {
  try {
    setError(dispatch, null);
    const uuid = uuidv4();
    const extension = getFileExtension(file.name);
    const newFileName = `${uuid}${extension}`;

    const renamedFile = new File([file], newFileName, { type: file.type });

    const data = new FormData();
    data.append('image', renamedFile);

    const res = await axios.post(
      `${BACKEND_BASE_URL}/upload/photo`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN) || ''}`,
          'Content-Type': 'multipart/form-data',
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      }
    );

    if (res.data?.status === STATUS_TYPES.SUCCESS && res.data?.data?.url) {
      dispatch({
        type: avatarActionTypes.SET_UPLOADED_IMAGE_AVATAR,
        data: res.data.data.url,
      });
    } else {
      setError(
        dispatch,
        res.data?.message || 'Image upload failed. Please try again.'
      );
      dispatch({
        type: avatarActionTypes.SET_UPLOADED_IMAGE_AVATAR,
        data: null,
      });
    }
  } catch (e) {
    const parsed = parseApiError(e);
    setError(dispatch, parsed.message);
    dispatch({
      type: avatarActionTypes.SET_UPLOADED_IMAGE_AVATAR,
      data: null,
    });
  }
};

export const setAvatarPrompt = (prompt: string) => async (dispatch: any) => {
  dispatch({
    type: avatarActionTypes.SET_PROMPT_AVATAR,
    data: prompt,
  });
};

export const setAvatarStyle = (styleId: string | null) => async (dispatch: any) => {
  dispatch({
    type: avatarActionTypes.SET_SELECTED_STYLE_AVATAR,
    data: styleId,
  });
};

export const genAvatar =
  (prompt: string, imageUrl: string, stylePrompt?: string) =>
  async (dispatch: any, getState: any) => {
    try {
      setError(dispatch, null);
      dispatch({
        type: avatarActionTypes.SET_RESULTS_AVATAR,
        data: [],
      });
      dispatch({
        type: avatarActionTypes.SET_LOADING_AVATAR,
        data: true,
      });

      const fullPrompt = stylePrompt ? `${prompt}, ${stylePrompt}` : prompt;

      const res = await axios.post(
        `${BACKEND_BASE_URL}/generation/avatar`,
        {
          image_url: imageUrl,
          prompt: fullPrompt,
          count: 4,
        },
        { headers: getAuthHeaders() }
      );

      if (res.data.status === STATUS_TYPES.SUCCESS) {
        const inferenceId = res.data.data.inference_id;
        const results = await getAvatarResults(inferenceId);
        const images =
          results?.data?.urls ||
          results?.data?.data ||
          (Array.isArray(results?.data) ? results?.data : []) ||
          [];

        if (!images.length) {
          setError(
            dispatch,
            results?.failed
              ? 'Generation failed. Please try again.'
              : 'No avatars were returned. Please try again.'
          );
        } else {
          dispatch({
            type: avatarActionTypes.SET_RESULTS_AVATAR,
            data: images,
          });
          const urls = Array.isArray(images)
            ? images.map((i: any) => (typeof i === 'string' ? i : i?.url))
            : [];
          saveGenerationHistory('avatar', {
            prompt: fullPrompt,
            images: urls,
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
        type: avatarActionTypes.SET_LOADING_AVATAR,
        data: false,
      });
    } catch (e) {
      handleAxiosGenerationError(dispatch, e, (msg) =>
        setError(dispatch, msg)
      );
      dispatch({
        type: avatarActionTypes.SET_LOADING_AVATAR,
        data: false,
      });
    }
  };

const getAvatarResults = async (inferenceId: string) => {
  try {
    let status = '';

    while (
      status === 'processing' ||
      status === STATUS_TYPES.PROCESSING ||
      status === STATUS_TYPES.QUEUED ||
      status === ''
    ) {
      const res = await axios.get(
        `${BACKEND_BASE_URL}/generation/avatar?tid=${inferenceId}`,
        { headers: getAuthHeaders() }
      );
      status = res.data.data.status?.toLowerCase();

      if (
        status !== 'processing' &&
        status !== STATUS_TYPES.PROCESSING &&
        status !== STATUS_TYPES.QUEUED &&
        status !== ''
      ) {
        if (status === STATUS_TYPES.ERROR || status === 'failed') {
          return {
            response: res,
            data: res.data.data.data || res.data.data,
            failed: true,
          };
        }
        return {
          response: res,
          data: res.data.data.data || res.data.data,
          failed: false,
        };
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
    return { response: null, data: null, failed: true };
  } catch (e) {
    return { response: e, data: null, failed: true };
  }
};
