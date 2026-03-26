import axios from 'axios';
import { BACKEND_BASE_URL, getAuthHeaders } from './constants';

export interface CreditPack {
  id: string;
  credits: number;
  price_usd: number;
}

export interface CreditTransaction {
  _id: string;
  amount: number;
  balance_after: number;
  type: 'purchase' | 'spend' | 'refund';
  reason: string;
  tool_name?: string;
  createdAt: string;
}

export interface WalletResponse {
  balance: number;
  packs: CreditPack[];
  transactions: CreditTransaction[];
}

export const fetchWallet = async (): Promise<WalletResponse | null> => {
  try {
    const res = await axios.get(`${BACKEND_BASE_URL}/billing/wallet`, {
      headers: getAuthHeaders(),
    });
    return res?.data?.data || null;
  } catch {
    return null;
  }
};

export const purchasePack = async (packId: string): Promise<{ ok: boolean; balance?: number; message?: string }> => {
  try {
    const res = await axios.post(
      `${BACKEND_BASE_URL}/billing/purchase`,
      { pack_id: packId },
      { headers: getAuthHeaders() }
    );
    return { ok: true, balance: res?.data?.data?.balance };
  } catch (e: any) {
    return { ok: false, message: e?.response?.data?.message || 'Purchase failed' };
  }
};

