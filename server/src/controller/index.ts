import express, { Request, Response } from 'express';

import HealthController from './HealthController';
import AuthController from './AuthController';
import T2ImageController from './GenerationController';
import HistoryController from './HistoryController';

const router = express.Router();

router.use('/health', HealthController);
router.use('/auth', AuthController);
router.use('/generation', T2ImageController);
router.use('/generation', HistoryController);

router.use('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'ok' });
});

export { router };
