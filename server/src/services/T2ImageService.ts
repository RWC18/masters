import { DEFAULT_CATCH_MESSAGE, TEXT_2_IMAGE_BODY, SERVICE_STATUS, DEFAULT_HEADERS, BASE_URL } from '../../constants/constants';
import axios from 'axios';

const getT2ImageTransactionID = async (prompt: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/text2image`, {
      ...TEXT_2_IMAGE_BODY,
      prompt: prompt,
    }, { headers: DEFAULT_HEADERS })
    console.log(res.status);
    if (res.data.status !== SERVICE_STATUS.ERROR) {
      return { status: SERVICE_STATUS.SUCCESS, data: res.data };
    } else {
      return { status: SERVICE_STATUS.ERROR, data: null };
    }
    
  } catch (e) {
    console.log(e);
    return { status: SERVICE_STATUS.ERROR, data: null };
  }
};


const getT2ImageResults = async (tid: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/text2image/inferences/${tid}`, 
      { headers: DEFAULT_HEADERS })
    if (res.data.status !== SERVICE_STATUS.ERROR) {
      return { status: SERVICE_STATUS.SUCCESS, data: res.data };
    } else {
      return { status: SERVICE_STATUS.ERROR, data: null };
    }
  } catch (e) {
    console.log(e);
    return { status: SERVICE_STATUS.ERROR, data: null };
  }
}

export default { getT2ImageTransactionID, getT2ImageResults };
