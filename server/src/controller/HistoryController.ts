import express, { Response } from 'express';
import mongoose from 'mongoose';
import { History } from '../models/history';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import { SERVICE_STATUS } from '../../constants/constants';
import { persistRemoteImage } from '../utils/persistImage';

const router = express.Router();

const TOOL_NAMES = ['t2i', 'avatar', 'logo', 'removebg'] as const;

const getPublicBaseUrl = (req: AuthRequest): string => {
  const protoHeader = (req.headers['x-forwarded-proto'] as string | undefined) || req.protocol;
  const hostHeader =
    (req.headers['x-forwarded-host'] as string | undefined) ||
    (req.headers.host as string | undefined) ||
    'localhost';
  const proto = protoHeader.split(',')[0].trim();
  const host = hostHeader.split(',')[0].trim();
  return `${proto}://${host}`;
};

const absolutizeGeneratedUrls = (baseUrl: string, result: any): any => {
  if (!result || typeof result !== 'object') return result;
  const next = { ...result };

  const toAbs = (u: any) => {
    if (typeof u !== 'string') return u;
    if (u.startsWith('http://') || u.startsWith('https://')) return u;
    if (u.startsWith('/generated/')) return `${baseUrl}${u}`;
    return u;
  };

  if (Array.isArray(next.images)) {
    next.images = next.images.map(toAbs);
  }
  if (typeof next.original_url === 'string') next.original_url = toAbs(next.original_url);
  if (typeof next.result_url === 'string') next.result_url = toAbs(next.result_url);

  return next;
};

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
    const userId = req.userId;
    const tool = tool_name;
    const nextResult: Record<string, unknown> = { ...result };

    // Persist multi-image generations
    if (Array.isArray((result as any).images)) {
      const images: unknown[] = (result as any).images;
      const persisted: string[] = [];
      for (const img of images) {
        if (typeof img === 'string' && img.startsWith('http')) {
          try {
            persisted.push(await persistRemoteImage(img, userId, tool));
          } catch {
            // fallback to original if persist fails
            persisted.push(img);
          }
        }
      }
      if (persisted.length > 0) nextResult.images = persisted;
    }

    // Persist removebg style payloads
    if (typeof (result as any).original_url === 'string' && (result as any).original_url.startsWith('http')) {
      try {
        nextResult.original_url = await persistRemoteImage((result as any).original_url, userId, tool);
      } catch {
        nextResult.original_url = (result as any).original_url;
      }
    }
    if (typeof (result as any).result_url === 'string' && (result as any).result_url.startsWith('http')) {
      try {
        nextResult.result_url = await persistRemoteImage((result as any).result_url, userId, tool);
      } catch {
        nextResult.result_url = (result as any).result_url;
      }
    }

    const doc = new History({
      user_id: new mongoose.Types.ObjectId(req.userId),
      tool_name,
      result: nextResult,
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
    const baseUrl = getPublicBaseUrl(req);
    const filter: { user_id: mongoose.Types.ObjectId; tool_name?: string } = {
      user_id: new mongoose.Types.ObjectId(req.userId),
    };
    if (tool && TOOL_NAMES.includes(tool as (typeof TOOL_NAMES)[number])) {
      filter.tool_name = tool;
    }

    const items = await History.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    const hydrated = items.map((it: any) => ({
      ...it,
      result: absolutizeGeneratedUrls(baseUrl, it.result),
    }));

    res.status(200).json({ status: SERVICE_STATUS.SUCCESS, data: hydrated });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: SERVICE_STATUS.ERROR, data: null });
  }
};

router.post('/history', authMiddleware, saveHistory);
router.get('/history', authMiddleware, getHistory);

export default router;
