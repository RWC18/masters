import express, { Response, Request } from 'express';
import T2ImageService from '../services/T2ImageService';
import AvatarService from '../services/AvatarService';
import LogoGenService from '../services/LogoGenService';
import RemoveBgService from '../services/RemoveBgService';
import { SERVICE_STATUS } from '../../constants/constants';

const router = express.Router();

// ─── T2I ────────────────────────────────────────────────────────────────────

const getT2ITransactionId = async (req: Request, res: Response) => {
  const prompt: string = req.body.prompt;
  try {
    const response = await T2ImageService.getT2ImageTransactionID(prompt);
    if (response.status === SERVICE_STATUS.SUCCESS) {
      res.status(200).json({ status: SERVICE_STATUS.SUCCESS, data: response.data });
    } else {
      res.status(400).json({ status: SERVICE_STATUS.ERROR, data: response.data });
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
    const response = await T2ImageService.getT2ImageResults(tid);
    if (response.status === SERVICE_STATUS.SUCCESS) {
      res.status(200).json({ status: SERVICE_STATUS.SUCCESS, data: response.data });
    } else {
      res.status(400).json({ status: SERVICE_STATUS.ERROR, data: response.data });
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

// ─── Avatar ─────────────────────────────────────────────────────────────────

const getAvatarInferenceId = async (req: Request, res: Response) => {
  const { image_url, prompt, count } = req.body;

  if (!image_url || !prompt) {
    return res.status(400).json({ status: SERVICE_STATUS.ERROR, data: 'image_url and prompt are required' });
  }

  try {
    const response = await AvatarService.getAvatarInferenceId(image_url, prompt, count || 4);
    if (response.status === SERVICE_STATUS.SUCCESS) {
      res.status(200).json({ status: SERVICE_STATUS.SUCCESS, data: response.data });
    } else {
      res.status(400).json({ status: SERVICE_STATUS.ERROR, data: response.data });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: SERVICE_STATUS.ERROR, data: null });
  }
};

const getAvatarResults = async (req: Request, res: Response) => {
  const tid = req.query.tid as string;

  if (!tid) {
    return res.status(400).json({ status: SERVICE_STATUS.ERROR, data: 'Inference ID is required' });
  }

  try {
    const response = await AvatarService.getAvatarResults(tid);
    if (response.status === SERVICE_STATUS.SUCCESS) {
      res.status(200).json({ status: SERVICE_STATUS.SUCCESS, data: response.data });
    } else {
      res.status(400).json({ status: SERVICE_STATUS.ERROR, data: response.data });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: SERVICE_STATUS.ERROR, data: null });
  }
};

router.post('/avatar', (req: Request, res: Response) => {
  getAvatarInferenceId(req, res);
});
router.get('/avatar', (req: Request, res: Response) => {
  getAvatarResults(req, res);
});

// ─── Logo Generation ────────────────────────────────────────────────────────

const getLogoInferenceId = async (req: Request, res: Response) => {
  const { brand_name, business_description, color_tone, count } = req.body;

  if (!brand_name) {
    return res.status(400).json({ status: SERVICE_STATUS.ERROR, data: 'brand_name is required' });
  }

  try {
    const response = await LogoGenService.getLogoInferenceId(
      brand_name,
      business_description || '',
      color_tone || 'Auto',
      count || 6
    );
    if (response.status === SERVICE_STATUS.SUCCESS) {
      res.status(200).json({ status: SERVICE_STATUS.SUCCESS, data: response.data });
    } else {
      res.status(400).json({ status: SERVICE_STATUS.ERROR, data: response.data });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: SERVICE_STATUS.ERROR, data: null });
  }
};

const getLogoResults = async (req: Request, res: Response) => {
  const tid = req.query.tid as string;

  if (!tid) {
    return res.status(400).json({ status: SERVICE_STATUS.ERROR, data: 'Inference ID is required' });
  }

  try {
    const response = await LogoGenService.getLogoResults(tid);
    if (response.status === SERVICE_STATUS.SUCCESS) {
      res.status(200).json({ status: SERVICE_STATUS.SUCCESS, data: response.data });
    } else {
      res.status(400).json({ status: SERVICE_STATUS.ERROR, data: response.data });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: SERVICE_STATUS.ERROR, data: null });
  }
};

router.post('/logo', (req: Request, res: Response) => {
  getLogoInferenceId(req, res);
});
router.get('/logo', (req: Request, res: Response) => {
  getLogoResults(req, res);
});

// ─── Remove Background ──────────────────────────────────────────────────────

const removeBackground = async (req: Request, res: Response) => {
  const { image_url } = req.body;

  if (!image_url) {
    return res.status(400).json({ status: SERVICE_STATUS.ERROR, data: 'image_url is required' });
  }

  try {
    const response = await RemoveBgService.removeBackground(image_url);
    if (response.status === SERVICE_STATUS.SUCCESS) {
      res.status(200).json({ status: SERVICE_STATUS.SUCCESS, data: response.data });
    } else {
      res.status(400).json({ status: SERVICE_STATUS.ERROR, data: response.data });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: SERVICE_STATUS.ERROR, data: null });
  }
};

router.post('/removebg', (req: Request, res: Response) => {
  removeBackground(req, res);
});

export default router;

