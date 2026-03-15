import axios from 'axios';
import { BACKEND_BASE_URL } from './constants';
import { LOCALSTORAGE_KEYS } from '../../constants/constants';

export type HistoryToolName = 't2i' | 'avatar' | 'logo' | 'removebg';

export interface HistoryItem {
  _id: string;
  user_id: string;
  tool_name: HistoryToolName;
  result: Record<string, unknown> & {
    images?: string[];
    prompt?: string;
    brand_name?: string;
    original_url?: string;
    result_url?: string;
  };
  createdAt: string;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN);
  if (!token) return null;
  return { Authorization: `Bearer ${token}` };
};

export const saveGenerationHistory = async (
  tool_name: HistoryToolName,
  result: Record<string, unknown>
): Promise<void> => {
  const headers = getAuthHeaders();
  if (!headers) return;
  try {
    await axios.post(
      `${BACKEND_BASE_URL}/generation/history`,
      { tool_name, result },
      { headers }
    );
  } catch {
    // Fire-and-forget; don't block UI
  }
};

export const fetchHistory = async (
  tool?: HistoryToolName
): Promise<HistoryItem[]> => {
  const headers = getAuthHeaders();
  if (!headers) return [];
  try {
    const url = tool
      ? `${BACKEND_BASE_URL}/generation/history?tool=${tool}`
      : `${BACKEND_BASE_URL}/generation/history`;
    const res = await axios.get(url, { headers });
    if (res.data?.status === 'success' && Array.isArray(res.data?.data)) {
      return res.data.data;
    }
  } catch {
    // ignore
  }
  return [];
};
