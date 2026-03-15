import axios from 'axios';
import { AI_API, headers, BACKEND_BASE_URL, STATUS_TYPES } from './constants';
import { v4 as uuidv4 } from 'uuid';

export const removeBgActionTypes = {
  SET_ORIGINAL_IMAGE: 'SET_ORIGINAL_IMAGE',
  SET_RESULT_IMAGE: 'SET_RESULT_IMAGE',
  SET_LOADING_REMOVEBG: 'SET_LOADING_REMOVEBG',
  SET_ERROR_REMOVEBG: 'SET_ERROR_REMOVEBG',
  RESET_REMOVEBG: 'RESET_REMOVEBG',
};

const getFileExtension = (filename: string): string => {
  const lastDot = filename.lastIndexOf('.');
  return lastDot !== -1 ? filename.substring(lastDot) : '.png';
};

export const uploadAndRemoveBg = (file: File) => async (dispatch: any) => {
  try {
    dispatch({ type: removeBgActionTypes.SET_ERROR_REMOVEBG, data: false });
    dispatch({ type: removeBgActionTypes.SET_RESULT_IMAGE, data: null });
    dispatch({ type: removeBgActionTypes.SET_LOADING_REMOVEBG, data: true });

    const uuid = uuidv4();
    const extension = getFileExtension(file.name);
    const newFileName = `${uuid}${extension}`;
    const renamedFile = new File([file], newFileName, { type: file.type });

    const formData = new FormData();
    formData.append('image', renamedFile);

    const uploadRes = await axios.post(
      `${AI_API}/photos/${newFileName}`,
      formData,
      {
        headers: { ...headers, 'Content-Type': 'multipart/form-data' },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      }
    );

    const imageUrl = uploadRes.data.data.url;
    dispatch({ type: removeBgActionTypes.SET_ORIGINAL_IMAGE, data: imageUrl });

    const res = await axios.post(
      `${BACKEND_BASE_URL}/generation/removebg`,
      { image_url: imageUrl }
    );

    if (res.data.status === STATUS_TYPES.SUCCESS) {
      dispatch({
        type: removeBgActionTypes.SET_RESULT_IMAGE,
        data: res.data.data.url,
      });
    } else {
      dispatch({ type: removeBgActionTypes.SET_ERROR_REMOVEBG, data: true });
    }

    dispatch({ type: removeBgActionTypes.SET_LOADING_REMOVEBG, data: false });
  } catch (e) {
    dispatch({ type: removeBgActionTypes.SET_ERROR_REMOVEBG, data: true });
    dispatch({ type: removeBgActionTypes.SET_LOADING_REMOVEBG, data: false });
  }
};

export const resetRemoveBg = () => (dispatch: any) => {
  dispatch({ type: removeBgActionTypes.RESET_REMOVEBG });
};
