import axios from 'axios';
import { AI_API, headers, BACKEND_BASE_URL, STATUS_TYPES } from './constants';
import { v4 as uuidv4 } from 'uuid';

export const avatarActionTypes = {
  SET_PROMPT_AVATAR: 'SET_PROMPT_AVATAR',
  SET_UPLOADED_IMAGE_AVATAR: 'SET_UPLOADED_IMAGE_AVATAR',
  SET_LOADING_AVATAR: 'SET_LOADING_AVATAR',
  SET_RESULTS_AVATAR: 'SET_RESULTS_AVATAR',
  SET_ERROR_AVATAR: 'SET_ERROR_AVATAR',
  SET_SELECTED_STYLE_AVATAR: 'SET_SELECTED_STYLE_AVATAR',
};

const getFileExtension = (filename: string): string => {
  const lastDot = filename.lastIndexOf('.');
  return lastDot !== -1 ? filename.substring(lastDot) : '.png';
};

export const uploaderAvatar = (file: File) => async (dispatch: any) => {
  try {
    const uuid = uuidv4();
    const extension = getFileExtension(file.name);
    const newFileName = `${uuid}${extension}`;

    const renamedFile = new File([file], newFileName, { type: file.type });

    const data = new FormData();
    data.append('image', renamedFile);

    const res = await axios.post(
      `${AI_API}/photos/${newFileName}`,
      data,
      {
        headers: { ...headers, 'Content-Type': 'multipart/form-data' },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      }
    );

    dispatch({
      type: avatarActionTypes.SET_UPLOADED_IMAGE_AVATAR,
      data: res.data.data.url,
    });
  } catch (e) {
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

export const genAvatar = (prompt: string, imageUrl: string, stylePrompt?: string) => async (dispatch: any) => {
  try {
    dispatch({
      type: avatarActionTypes.SET_ERROR_AVATAR,
      data: false,
    });
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
      }
    );

    if (res.data.status === STATUS_TYPES.SUCCESS) {
      const inferenceId = res.data.data.inference_id;
      const results = await getAvatarResults(inferenceId);

      dispatch({
        type: avatarActionTypes.SET_RESULTS_AVATAR,
        data: results?.data?.urls || [],
      });
    } else {
      dispatch({
        type: avatarActionTypes.SET_ERROR_AVATAR,
        data: true,
      });
    }

    dispatch({
      type: avatarActionTypes.SET_LOADING_AVATAR,
      data: false,
    });
  } catch (e) {
    dispatch({
      type: avatarActionTypes.SET_ERROR_AVATAR,
      data: true,
    });
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
        `${BACKEND_BASE_URL}/generation/avatar?tid=${inferenceId}`
      );
      status = res.data.data.status?.toLowerCase();

      if (
        status !== 'processing' &&
        status !== STATUS_TYPES.PROCESSING &&
        status !== STATUS_TYPES.QUEUED &&
        status !== ''
      ) {
        return { response: res, data: res.data.data.data || res.data.data };
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
  } catch (e) {
    return { response: e, data: null };
  }
};
