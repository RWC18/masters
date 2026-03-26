import express, { Response } from 'express';
import { SERVICE_STATUS } from '../../constants/constants';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import CreditService from '../services/CreditService';

const router = express.Router();

router.get('/packs', authMiddleware, async (_req: AuthRequest, res: Response) => {
  res.status(200).json({
    status: SERVICE_STATUS.SUCCESS,
    data: CreditService.CREDIT_PACKS,
  });
});

router.get('/wallet', authMiddleware, async (req: AuthRequest, res: Response) => {
  if (!req.userId) {
    res.status(401).json({ status: SERVICE_STATUS.ERROR, message: 'Unauthorized' });
    return;
  }

  const balance = await CreditService.getUserCredits(req.userId);
  const transactions = await CreditService.getRecentTransactions(req.userId, 30);

  res.status(200).json({
    status: SERVICE_STATUS.SUCCESS,
    data: {
      balance,
      packs: CreditService.CREDIT_PACKS,
      transactions,
    },
  });
});

router.post('/purchase', authMiddleware, async (req: AuthRequest, res: Response) => {
  if (!req.userId) {
    res.status(401).json({ status: SERVICE_STATUS.ERROR, message: 'Unauthorized' });
    return;
  }

  const packId = String(req.body?.pack_id || '');
  const pack = CreditService.getPackById(packId);
  if (!pack) {
    res.status(400).json({ status: SERVICE_STATUS.ERROR, message: 'Invalid pack_id' });
    return;
  }

  // Payment provider integration point (vPOS/webhook/verification) should be added here.
  const purchase = await CreditService.addCredits(
    req.userId,
    pack.credits,
    `Purchase ${pack.credits} credits`,
    { pack_id: pack.id, price_usd: pack.price_usd }
  );

  if (!purchase.ok) {
    res.status(500).json({ status: SERVICE_STATUS.ERROR, message: 'Failed to add credits' });
    return;
  }

  res.status(200).json({
    status: SERVICE_STATUS.SUCCESS,
    data: {
      balance: purchase.balance,
      purchased_credits: pack.credits,
      price_usd: pack.price_usd,
      pack_id: pack.id,
    },
  });
});

export default router;

