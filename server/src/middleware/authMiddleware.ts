import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/AuthService';

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : (req.body?.access_token as string);

  if (!token) {
    res.status(401).json({ status: 'error', message: 'Unauthorized' });
    return;
  }

  const response = await AuthService.getUserByAccessToken(token);
  if (response.status && response.result?._id) {
    req.userId = response.result._id.toString();
    next();
  } else {
    res.status(401).json({ status: 'error', message: 'Invalid token' });
    return;
  }
};

/** Optional auth: sets req.userId if valid token present, does not block request */
export const optionalAuthMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : (req.body?.access_token as string);

  if (!token) {
    next();
    return;
  }

  const response = await AuthService.getUserByAccessToken(token);
  if (response.status && response.result?._id) {
    req.userId = response.result._id.toString();
  }
  next();
};
