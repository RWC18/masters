import express, { Response, Request } from 'express';
import T2ImageService from '../services/T2ImageService';
import { SERVICE_STATUS } from '../../constants/constants';

const router = express.Router();

const getT2ITransactionId = async (req: Request, res: Response) => {
  const prompt: string = req.body.prompt;
  try {
    const respone = await T2ImageService.getT2ImageTransactionID(prompt);
    if (respone.status === SERVICE_STATUS.SUCCESS) {
      res.status(200).json({ status: SERVICE_STATUS.SUCCESS, data: respone.data });
    } else {
      res.status(400).json({ status: SERVICE_STATUS.ERROR, data: respone.data });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: SERVICE_STATUS.ERROR, data: null });
  }
};

const getT2IResults = async (req: Request, res: Response) => {
  const tid = req.query.tid as string;

  if (!tid) {
    return res.status(400).json({ status: SERVICE_STATUS.ERROR, data: 'Transaction ID is required' });
  }

  try {
    const respone = await T2ImageService.getT2ImageResults(tid);
    if (respone.status === SERVICE_STATUS.SUCCESS) {
      res.status(200).json({ status: SERVICE_STATUS.SUCCESS, data: respone.data });
    } else {
      res.status(400).json({ status: SERVICE_STATUS.ERROR, data: respone.data });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: SERVICE_STATUS.ERROR, data: null });
  }
};

router.post('/t2i', (req: Request, res: Response) => {
  getT2ITransactionId(req, res);
});
router.get('/t2i', (req: Request, res: Response) => {
  getT2IResults(req, res);
});

export default router;

