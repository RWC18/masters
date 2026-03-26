import mongoose from 'mongoose';
import { User } from '../models/users';
import { CreditTransaction } from '../models/creditTransaction';

export const CREDIT_PACKS = [
  { id: 'pack_100', credits: 100, price_usd: 1 },
  { id: 'pack_500', credits: 500, price_usd: 4.5 },
  { id: 'pack_1000', credits: 1000, price_usd: 8 },
  { id: 'pack_2000', credits: 2000, price_usd: 15 },
] as const;

export const TOOL_COSTS = {
  t2i: 2, // per photo
  avatar: 3, // per photo
  logo: 4, // per photo
  removebg: 2, // single photo
} as const;

type CreditTxType = 'purchase' | 'spend' | 'refund';

const toObjectId = (id: string) => new mongoose.Types.ObjectId(id);

const createTx = async (params: {
  userId: string;
  amount: number;
  balanceAfter: number;
  type: CreditTxType;
  reason: string;
  toolName?: string;
  metadata?: Record<string, unknown>;
}) => {
  await CreditTransaction.create({
    user_id: toObjectId(params.userId),
    amount: params.amount,
    balance_after: params.balanceAfter,
    type: params.type,
    reason: params.reason,
    tool_name: params.toolName,
    metadata: params.metadata || {},
  });
};

const getUserCredits = async (userId: string): Promise<number> => {
  const user = await User.findById(userId).lean();
  return Number(user?.credits || 0);
};

const addCredits = async (
  userId: string,
  amount: number,
  reason: string,
  metadata?: Record<string, unknown>
): Promise<{ ok: boolean; balance: number }> => {
  if (amount <= 0) return { ok: false, balance: await getUserCredits(userId) };

  const user = await User.findOneAndUpdate(
    { _id: toObjectId(userId) },
    { $inc: { credits: amount } },
    { new: true }
  );

  if (!user) return { ok: false, balance: 0 };

  const balance = Number(user.credits || 0);
  await createTx({
    userId,
    amount,
    balanceAfter: balance,
    type: 'purchase',
    reason,
    metadata,
  });
  return { ok: true, balance };
};

const spendCredits = async (
  userId: string,
  amount: number,
  reason: string,
  toolName: string,
  metadata?: Record<string, unknown>
): Promise<{ ok: boolean; balance: number }> => {
  if (amount <= 0) return { ok: true, balance: await getUserCredits(userId) };

  const user = await User.findOneAndUpdate(
    { _id: toObjectId(userId), credits: { $gte: amount } },
    { $inc: { credits: -amount } },
    { new: true }
  );

  if (!user) return { ok: false, balance: await getUserCredits(userId) };

  const balance = Number(user.credits || 0);
  await createTx({
    userId,
    amount: -amount,
    balanceAfter: balance,
    type: 'spend',
    reason,
    toolName,
    metadata,
  });
  return { ok: true, balance };
};

const refundCredits = async (
  userId: string,
  amount: number,
  reason: string,
  toolName: string,
  metadata?: Record<string, unknown>
): Promise<{ ok: boolean; balance: number }> => {
  if (amount <= 0) return { ok: true, balance: await getUserCredits(userId) };

  const user = await User.findOneAndUpdate(
    { _id: toObjectId(userId) },
    { $inc: { credits: amount } },
    { new: true }
  );

  if (!user) return { ok: false, balance: 0 };

  const balance = Number(user.credits || 0);
  await createTx({
    userId,
    amount,
    balanceAfter: balance,
    type: 'refund',
    reason,
    toolName,
    metadata,
  });
  return { ok: true, balance };
};

const getRecentTransactions = async (userId: string, limit = 30) => {
  return CreditTransaction.find({ user_id: toObjectId(userId) })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
};

const getPackById = (id: string) => CREDIT_PACKS.find((p) => p.id === id);

export default {
  CREDIT_PACKS,
  TOOL_COSTS,
  getUserCredits,
  addCredits,
  spendCredits,
  refundCredits,
  getRecentTransactions,
  getPackById,
};

