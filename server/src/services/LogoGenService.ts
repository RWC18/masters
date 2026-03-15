import axios from 'axios';
import { BASE_URL, DEFAULT_HEADERS, LOGO_GEN_DEFAULT_MODEL, SERVICE_STATUS } from '../../constants/constants';

const getLogoInferenceId = async (
  brandName: string,
  businessDescription: string,
  colorTone: string,
  count: number
) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/logo`,
      {
        brand_name: brandName,
        business_description: businessDescription,
        color_tone: colorTone || 'Auto',
        count,
        model: LOGO_GEN_DEFAULT_MODEL,
      },
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

const getLogoResults = async (inferenceId: string) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/logo/inferences/${inferenceId}`,
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

export default { getLogoInferenceId, getLogoResults };
