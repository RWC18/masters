import axios from 'axios';
import { DEFAULT_NEGATIVE_PROMPT, headers, AI_API } from './constants';
import { v4 as uuidv4 } from 'uuid';

export const i2iActionTypes = {
  SET_PROMPT_I2I: 'SET_PROMPT_I2I',
  SET_UPLOADED_IMAGE_I2I: 'SET_UPLOADED_IMAGE_I2I',
  SET_SELECTED_STYLES_I2I: 'SET_SELECTED_STYLES_I2I',
  SET_LOADING_I2I: 'SET_LOADING_I2I',
  SET_RESULTS_I2I: 'SET_RESULTS_I2I',
  SET_ERROR_I2I: 'SET_ERROR_I2I',
};

// Get file extension from filename
const getFileExtension = (filename: string): string => {
  const lastDot = filename.lastIndexOf('.');
  return lastDot !== -1 ? filename.substring(lastDot) : '.png';
};

export const uploaderI2I = (file: File) => async (dispatch: any) => {
  try {
    // Generate UUID and get file extension
    const uuid = uuidv4();
    const extension = getFileExtension(file.name);
    const newFileName = `${uuid}${extension}`;
    
    // Create a new File object with the UUID name
    const renamedFile = new File([file], newFileName, { type: file.type });
    
    // Create FormData with renamed file
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
    debugger;
    dispatch({
      type: i2iActionTypes.SET_UPLOADED_IMAGE_I2I,
      data: res.data.data.url,
    });
  } catch (e) {
    debugger;
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
      `${AI_API}/image-to-image/v1/task`,
      {
        caption: caption,
        image_url: url,
        negative_prompt: DEFAULT_NEGATIVE_PROMPT,
        strength: 0.7,
        guidance_scale: 7.5,
        output_shape: '1024x1024',
        sampling_method: 'Euler A',
        resize_mode: 'Just resize',
        count: 4,
        model_version: 'DREAMSHAPER',
        num_inference_steps: 100,
      },
      {
        headers,
      }
    );

    if (res.data.status === 'DONE') {
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


