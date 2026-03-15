import axios from 'axios';
import { DEFAULT_HEADERS, SERVICE_STATUS } from '../../constants/constants';

const REMOVE_BG_URL = 'https://api.picsart.io/tools/1.0/removebg';

const removeBackground = async (imageUrl: string) => {
  try {
    const res = await axios.post(
      REMOVE_BG_URL,
      {
        image_url: imageUrl,
        output_type: 'cutout',
      },
      { headers: DEFAULT_HEADERS }
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

export default { removeBackground };
