import express, { Request, Response } from 'express';
import T2ImageService from '../services/T2ImageService';
import AvatarService from '../services/AvatarService';
import LogoGenService from '../services/LogoGenService';
import RemoveBgService from '../services/RemoveBgService';
import { SERVICE_STATUS } from '../../constants/constants';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import CreditService, { TOOL_COSTS } from '../services/CreditService';

const router = express.Router();

const insufficient = (res: Response, balance: number, required: number) => {
  res.status(402).json({
    status: SERVICE_STATUS.ERROR,
    message: 'Insufficient credits',
    balance,
    required,
  });
};

const getT2ITransactionId = async (req: AuthRequest, res: Response) => {
  if (!req.userId) {
    res.status(401).json({ status: SERVICE_STATUS.ERROR, message: 'Unauthorized' });
    return;
  }
  const prompt: string = req.body.prompt;
  const count = Math.max(1, Number(req.body?.count || 4));
  const debitAmount = count * TOOL_COSTS.t2i;
  const debit = await CreditService.spendCredits(req.userId, debitAmount, `T2I (${count})`, 't2i', { count });

  if (!debit.ok) return insufficient(res, debit.balance, debitAmount);

  try {
    const response = await T2ImageService.getT2ImageTransactionID(prompt);
    if (response.status === SERVICE_STATUS.SUCCESS) {
      res.status(200).json({ status: SERVICE_STATUS.SUCCESS, data: response.data, balance: debit.balance, charged: debitAmount });
      return;
    }
    await CreditService.refundCredits(req.userId, debitAmount, 'T2I start failed', 't2i', { count });
    res.status(400).json({ status: SERVICE_STATUS.ERROR, data: response.data });
  } catch (e) {
    console.log(e);
    await CreditService.refundCredits(req.userId, debitAmount, 'T2I exception', 't2i', { count });
    res.status(500).json({ status: SERVICE_STATUS.ERROR, data: null });
  }
};

const getT2IResults = async (req: Request, res: Response) => {
  const tid = req.query.tid as string;
  if (!tid) {
    res.status(400).json({ status: SERVICE_STATUS.ERROR, data: 'Transaction ID is required' });
    return;
  }
  try {
    const response = await T2ImageService.getT2ImageResults(tid);
    if (response.status === SERVICE_STATUS.SUCCESS) {
      res.status(200).json({ status: SERVICE_STATUS.SUCCESS, data: response.data });
      return;
    }
    res.status(400).json({ status: SERVICE_STATUS.ERROR, data: response.data });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: SERVICE_STATUS.ERROR, data: null });
  }
};

const getAvatarInferenceId = async (req: AuthRequest, res: Response) => {
  if (!req.userId) {
    res.status(401).json({ status: SERVICE_STATUS.ERROR, message: 'Unauthorized' });
    return;
  }
  const { image_url, prompt, count } = req.body;
  if (!image_url || !prompt) {
    res.status(400).json({ status: SERVICE_STATUS.ERROR, data: 'image_url and prompt are required' });
    return;
  }

  const itemCount = Math.max(1, Number(count || 4));
  const debitAmount = itemCount * TOOL_COSTS.avatar;
  const debit = await CreditService.spendCredits(req.userId, debitAmount, `Avatar (${itemCount})`, 'avatar', { count: itemCount });
  if (!debit.ok) return insufficient(res, debit.balance, debitAmount);

  try {
    const response = await AvatarService.getAvatarInferenceId(image_url, prompt, itemCount);
    if (response.status === SERVICE_STATUS.SUCCESS) {
      res.status(200).json({ status: SERVICE_STATUS.SUCCESS, data: response.data, balance: debit.balance, charged: debitAmount });
      return;
    }
    await CreditService.refundCredits(req.userId, debitAmount, 'Avatar start failed', 'avatar', { count: itemCount });
    res.status(400).json({ status: SERVICE_STATUS.ERROR, data: response.data });
  } catch (e) {
    console.log(e);
    await CreditService.refundCredits(req.userId, debitAmount, 'Avatar exception', 'avatar', { count: itemCount });
    res.status(500).json({ status: SERVICE_STATUS.ERROR, data: null });
  }
};

const getAvatarResults = async (req: Request, res: Response) => {
  const tid = req.query.tid as string;
  if (!tid) {
    res.status(400).json({ status: SERVICE_STATUS.ERROR, data: 'Inference ID is required' });
    return;
  }
  try {
    const response = await AvatarService.getAvatarResults(tid);
    if (response.status === SERVICE_STATUS.SUCCESS) {
      res.status(200).json({ status: SERVICE_STATUS.SUCCESS, data: response.data });
      return;
    }
    res.status(400).json({ status: SERVICE_STATUS.ERROR, data: response.data });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: SERVICE_STATUS.ERROR, data: null });
  }
};

const getLogoInferenceId = async (req: AuthRequest, res: Response) => {
  if (!req.userId) {
    res.status(401).json({ status: SERVICE_STATUS.ERROR, message: 'Unauthorized' });
    return;
  }
  const { brand_name, business_description, color_tone, count } = req.body;
  if (!brand_name) {
    res.status(400).json({ status: SERVICE_STATUS.ERROR, data: 'brand_name is required' });
    return;
  }

  const itemCount = Math.max(1, Number(count || 6));
  const debitAmount = itemCount * TOOL_COSTS.logo;
  const debit = await CreditService.spendCredits(req.userId, debitAmount, `Logo (${itemCount})`, 'logo', { count: itemCount });
  if (!debit.ok) return insufficient(res, debit.balance, debitAmount);

  try {
    const response = await LogoGenService.getLogoInferenceId(
      brand_name,
      business_description || '',
      color_tone || 'Auto',
      itemCount
    );
    if (response.status === SERVICE_STATUS.SUCCESS) {
      res.status(200).json({ status: SERVICE_STATUS.SUCCESS, data: response.data, balance: debit.balance, charged: debitAmount });
      return;
    }
    await CreditService.refundCredits(req.userId, debitAmount, 'Logo start failed', 'logo', { count: itemCount });
    res.status(400).json({ status: SERVICE_STATUS.ERROR, data: response.data });
  } catch (e) {
    console.log(e);
    await CreditService.refundCredits(req.userId, debitAmount, 'Logo exception', 'logo', { count: itemCount });
    res.status(500).json({ status: SERVICE_STATUS.ERROR, data: null });
  }
};

const getLogoResults = async (req: Request, res: Response) => {
  const tid = req.query.tid as string;
  if (!tid) {
    res.status(400).json({ status: SERVICE_STATUS.ERROR, data: 'Inference ID is required' });
    return;
  }
  try {
    const response = await LogoGenService.getLogoResults(tid);
    if (response.status === SERVICE_STATUS.SUCCESS) {
      res.status(200).json({ status: SERVICE_STATUS.SUCCESS, data: response.data });
      return;
    }
    res.status(400).json({ status: SERVICE_STATUS.ERROR, data: response.data });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: SERVICE_STATUS.ERROR, data: null });
  }
};

const removeBackground = async (req: AuthRequest, res: Response) => {
  if (!req.userId) {
    res.status(401).json({ status: SERVICE_STATUS.ERROR, message: 'Unauthorized' });
    return;
  }
  const { image_url } = req.body;
  if (!image_url) {
    res.status(400).json({ status: SERVICE_STATUS.ERROR, data: 'image_url is required' });
    return;
  }

  const debitAmount = TOOL_COSTS.removebg;
  const debit = await CreditService.spendCredits(req.userId, debitAmount, 'Remove background', 'removebg');
  if (!debit.ok) return insufficient(res, debit.balance, debitAmount);

  try {
    const response = await RemoveBgService.removeBackground(image_url);
    if (response.status === SERVICE_STATUS.SUCCESS) {
      res.status(200).json({ status: SERVICE_STATUS.SUCCESS, data: response.data, balance: debit.balance, charged: debitAmount });
      return;
    }
    await CreditService.refundCredits(req.userId, debitAmount, 'RemoveBg start failed', 'removebg');
    res.status(400).json({ status: SERVICE_STATUS.ERROR, data: response.data });
  } catch (e) {
    console.log(e);
    await CreditService.refundCredits(req.userId, debitAmount, 'RemoveBg exception', 'removebg');
    res.status(500).json({ status: SERVICE_STATUS.ERROR, data: null });
  }
};

router.post('/t2i', authMiddleware, (req: AuthRequest, res: Response) => getT2ITransactionId(req, res));
router.get('/t2i', authMiddleware, (req: Request, res: Response) => getT2IResults(req, res));
router.post('/avatar', authMiddleware, (req: AuthRequest, res: Response) => getAvatarInferenceId(req, res));
router.get('/avatar', authMiddleware, (req: Request, res: Response) => getAvatarResults(req, res));
router.post('/logo', authMiddleware, (req: AuthRequest, res: Response) => getLogoInferenceId(req, res));
router.get('/logo', authMiddleware, (req: Request, res: Response) => getLogoResults(req, res));
router.post('/removebg', authMiddleware, (req: AuthRequest, res: Response) => removeBackground(req, res));

export default router;

