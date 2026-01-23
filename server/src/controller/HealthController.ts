import express, { Request, Response } from 'express';

const router = express.Router();

const healthCheck = async (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
};

router.get('/', healthCheck);

export default router;
