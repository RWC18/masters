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
    if (!req.file) {
      res.status(400).json({ status: SERVICE_STATUS.ERROR, message: 'image is required' });
      return;
    }

    const filename = req.file.originalname || `upload-${Date.now()}.png`;

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
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: SERVICE_STATUS.ERROR, data: null });
  }
});

export default router;

