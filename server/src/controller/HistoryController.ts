import express, { Response } from 'express';
import mongoose from 'mongoose';
import { History } from '../models/history';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import { SERVICE_STATUS } from '../../constants/constants';

const router = express.Router();

const TOOL_NAMES = ['t2i', 'avatar', 'logo', 'removebg'] as const;

const saveHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  const { tool_name, result } = req.body as { tool_name: string; result: Record<string, unknown> };

  if (!req.userId) {
    res.status(401).json({ status: SERVICE_STATUS.ERROR, message: 'Unauthorized' });
    return;
  }
  if (!tool_name || !result || typeof result !== 'object') {
    res.status(400).json({ status: SERVICE_STATUS.ERROR, message: 'tool_name and result are required' });
    return;
  }
  if (!TOOL_NAMES.includes(tool_name as (typeof TOOL_NAMES)[number])) {
    res.status(400).json({ status: SERVICE_STATUS.ERROR, message: 'Invalid tool_name' });
    return;
  }

  try {
    const doc = new History({
      user_id: new mongoose.Types.ObjectId(req.userId),
      tool_name,
      result,
    });
    await doc.save();
    res.status(200).json({ status: SERVICE_STATUS.SUCCESS, data: { id: doc._id } });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: SERVICE_STATUS.ERROR, data: null });
  }
};

const getHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.userId) {
    res.status(401).json({ status: SERVICE_STATUS.ERROR, message: 'Unauthorized' });
    return;
  }

  const tool = req.query.tool as string | undefined;

  try {
    const filter: { user_id: mongoose.Types.ObjectId; tool_name?: string } = {
      user_id: new mongoose.Types.ObjectId(req.userId),
    };
    if (tool && TOOL_NAMES.includes(tool as (typeof TOOL_NAMES)[number])) {
      filter.tool_name = tool;
    }

    const items = await History.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({ status: SERVICE_STATUS.SUCCESS, data: items });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: SERVICE_STATUS.ERROR, data: null });
  }
};

router.post('/history', authMiddleware, saveHistory);
router.get('/history', authMiddleware, getHistory);

export default router;
