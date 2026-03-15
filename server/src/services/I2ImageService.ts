import axios from 'axios';
import FormData from 'form-data';
import { AI_API_BASE_URL, AI_API_HEADERS, IMAGE_TO_IMAGE_BODY, SERVICE_STATUS } from '../../constants/constants';

const uploadImage = async (fileBuffer: Buffer, filename: string, mimetype: string) => {
  try {
    const formData = new FormData();
    formData.append('image', fileBuffer, {
      filename,
      contentType: mimetype,
    });

    const res = await axios.post(
      `${AI_API_BASE_URL}/photos/${filename}`,
      formData,
      {
        headers: {
          ...AI_API_HEADERS,
          ...formData.getHeaders(),
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      }
    );

    if (res.data?.data?.url) {
      return { status: SERVICE_STATUS.SUCCESS, data: res.data.data };
    }
    return { status: SERVICE_STATUS.ERROR, data: null };
  } catch (e) {
    console.log(e);
    return { status: SERVICE_STATUS.ERROR, data: null };
  }
};

const generateI2Image = async (caption: string, imageUrl: string) => {
  try {
    const res = await axios.post(
      `${AI_API_BASE_URL}/image-to-image/v1/task`,
      {
        ...IMAGE_TO_IMAGE_BODY,
        caption,
        image_url: imageUrl,
      },
      { headers: AI_API_HEADERS }
    );

    if (res.data.status === 'DONE') {
      return { status: SERVICE_STATUS.SUCCESS, data: res.data.data };
    }
    return { status: SERVICE_STATUS.ERROR, data: null };
  } catch (e) {
    console.log(e);
    return { status: SERVICE_STATUS.ERROR, data: null };
  }
};

export default { uploadImage, generateI2Image };
