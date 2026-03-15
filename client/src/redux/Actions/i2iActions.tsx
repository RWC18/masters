import axios from 'axios';
import { BACKEND_BASE_URL, STATUS_TYPES } from './constants';
import { v4 as uuidv4 } from 'uuid';

export const i2iActionTypes = {
  SET_PROMPT_I2I: 'SET_PROMPT_I2I',
  SET_UPLOADED_IMAGE_I2I: 'SET_UPLOADED_IMAGE_I2I',
  SET_SELECTED_STYLES_I2I: 'SET_SELECTED_STYLES_I2I',
  SET_LOADING_I2I: 'SET_LOADING_I2I',
  SET_RESULTS_I2I: 'SET_RESULTS_I2I',
  SET_ERROR_I2I: 'SET_ERROR_I2I',
};

const getFileExtension = (filename: string): string => {
  const lastDot = filename.lastIndexOf('.');
  return lastDot !== -1 ? filename.substring(lastDot) : '.png';
};

export const uploaderI2I = (file: File) => async (dispatch: any) => {
  try {
    const uuid = uuidv4();
    const extension = getFileExtension(file.name);
    const newFileName = `${uuid}${extension}`;

    const renamedFile = new File([file], newFileName, { type: file.type });

    const data = new FormData();
    data.append('image', renamedFile);

    const res = await axios.post(
      `${BACKEND_BASE_URL}/generation/i2i/upload`,
      data,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      }
    );

    dispatch({
      type: i2iActionTypes.SET_UPLOADED_IMAGE_I2I,
      data: res.data.data.url,
    });
  } catch (e) {
    dispatch({
      type: i2iActionTypes.SET_UPLOADED_IMAGE_I2I,
      data: null,
    });
  }
};

export const setI2iPrompt = (prompt: string) => async (dispatch: any) => {
  dispatch({
    type: i2iActionTypes.SET_PROMPT_I2I,
    data: prompt,
  });
};

export const setSelectedStylesI2i =
  (style: { title: string; thumbnail: string; prompt: string }) =>
  async (dispatch: any) => {
    dispatch({
      type: i2iActionTypes.SET_SELECTED_STYLES_I2I,
      data: style,
    });
  };

export const genI2img = (caption: string, url: string) => async (dispatch: any) => {
  try {
    dispatch({
      type: i2iActionTypes.SET_ERROR_I2I,
      data: false,
    });
    dispatch({
      type: i2iActionTypes.SET_RESULTS_I2I,
      data: [],
    });
    dispatch({
      type: i2iActionTypes.SET_LOADING_I2I,
      data: true,
    });

    const res = await axios.post(
      `${BACKEND_BASE_URL}/generation/i2i`,
      {
        caption,
        image_url: url,
      }
    );

    if (res.data.status === STATUS_TYPES.SUCCESS) {
      dispatch({
        type: i2iActionTypes.SET_RESULTS_I2I,
        data: res.data.data,
      });
    } else {
      dispatch({
        type: i2iActionTypes.SET_ERROR_I2I,
        data: true,
      });
    }

    dispatch({
      type: i2iActionTypes.SET_LOADING_I2I,
      data: false,
    });
  } catch (e) {
    dispatch({
      type: i2iActionTypes.SET_ERROR_I2I,
      data: true,
    });
    dispatch({
      type: i2iActionTypes.SET_LOADING_I2I,
      data: false,
    });
  }
};


