import express, { Response } from 'express';
import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';
import { AI_API_BASE_URL, AI_API_HEADERS, SERVICE_STATUS } from '../../constants/constants';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * Upload image to Picsart photos service using server-side credentials.
 * Client sends multipart/form-data with field: `image`.
 * Returns: { status, data: { url } }
 */
router.post('/photo', authMiddleware, upload.single('image'), async (req: AuthRequest, res: Response) => {
  try {
    if (!AI_API_BASE_URL) {
      res.status(500).json({
        status: SERVICE_STATUS.ERROR,
        message: 'Server misconfigured: AI_API_URL is missing',
      });
      return;
    }
    const authHeader = String(AI_API_HEADERS?.Authorization || '').trim();
    const xAppHeader = String(AI_API_HEADERS?.['x-app-authorization'] || '').trim();
    const hasBearerToken = (v: string) => v.startsWith('Bearer ') && v.length > 'Bearer '.length;
    if (!hasBearerToken(authHeader) || !hasBearerToken(xAppHeader)) {
      res.status(500).json({
        status: SERVICE_STATUS.ERROR,
        message: 'Server misconfigured: AI_AUTH / X_APP_AUTH is missing',
      });
      return;
    }

    if (!req.file) {
      res.status(400).json({ status: SERVICE_STATUS.ERROR, message: 'image is required' });
      return;
    }

    const safeName = (req.file.originalname || `upload-${Date.now()}.png`).replace(/[^\w.\-]+/g, '_');
    const filename = `${Date.now()}_${safeName}`;

    const formData = new FormData();
    formData.append('image', req.file.buffer, {
      filename,
      contentType: req.file.mimetype,
    });

    const resp = await axios.post(`${AI_API_BASE_URL}/photos/${filename}`, formData, {
      headers: {
        ...AI_API_HEADERS,
        ...formData.getHeaders(),
      },
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
      timeout: 30000,
    });

    const url = resp.data?.data?.url;
    if (url) {
      res.status(200).json({ status: SERVICE_STATUS.SUCCESS, data: { url } });
      return;
    }

    res.status(400).json({ status: SERVICE_STATUS.ERROR, data: null });
  } catch (e: any) {
    const upstreamStatus = e?.response?.status;
    const upstreamData = e?.response?.data;
    console.log('Upload photo failed', {
      message: e?.message,
      upstreamStatus,
      upstreamData,
    });
    res.status(500).json({
      status: SERVICE_STATUS.ERROR,
      message: 'Upload failed',
      upstreamStatus: upstreamStatus || null,
    });
  }
});

export default router;

