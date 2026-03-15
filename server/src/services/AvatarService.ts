import axios from 'axios';
import { AVATAR_BASE_URL, DEFAULT_HEADERS, DEFAULT_NEGATIVE_PROMPT, SERVICE_STATUS } from '../../constants/constants';

const getAvatarInferenceId = async (imageUrl: string, prompt: string, count: number) => {
  try {
    const res = await axios.post(
      AVATAR_BASE_URL,
      {
        images: [imageUrl],
        prompt,
        negative_prompt: DEFAULT_NEGATIVE_PROMPT,
        count,
      },
      { headers: DEFAULT_HEADERS }
    );

    if (res.data.inference_id) {
      return { status: SERVICE_STATUS.SUCCESS, data: res.data };
    }
    return { status: SERVICE_STATUS.ERROR, data: null };
  } catch (e) {
    console.log(e);
    return { status: SERVICE_STATUS.ERROR, data: null };
  }
};

const getAvatarResults = async (inferenceId: string) => {
  try {
    const res = await axios.get(
      `${AVATAR_BASE_URL}/${inferenceId}`,
      { headers: DEFAULT_HEADERS }
    );

    if (res.data.status !== SERVICE_STATUS.ERROR) {
      return { status: SERVICE_STATUS.SUCCESS, data: res.data };
    }
    return { status: SERVICE_STATUS.ERROR, data: null };
  } catch (e) {
    console.log(e);
    return { status: SERVICE_STATUS.ERROR, data: null };
  }
};

export default { getAvatarInferenceId, getAvatarResults };
