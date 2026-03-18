import axios from 'axios';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const GENERATED_ROOT = path.join(process.cwd(), 'public', 'generated');

const ensureDir = async (dir: string) => {
  await fs.promises.mkdir(dir, { recursive: true });
};

const safeExtFromContentType = (contentType?: string | null): string => {
  const ct = (contentType || '').toLowerCase();
  if (ct.includes('png')) return '.png';
  if (ct.includes('jpeg') || ct.includes('jpg')) return '.jpg';
  if (ct.includes('webp')) return '.webp';
  return '.png';
};

const safeExtFromUrl = (url: string): string | null => {
  try {
    const u = new URL(url);
    const ext = path.extname(u.pathname);
    if (ext && ext.length <= 5) return ext;
    return null;
  } catch {
    return null;
  }
};

/**
 * Downloads a remote image URL and stores it on disk under:
 *   public/generated/<userId>/<tool>/<yyyy-mm-dd>/<random>.<ext>
 *
 * Returns a permanent URL path served by Express:
 *   /generated/<userId>/<tool>/<yyyy-mm-dd>/<filename>
 */
export const persistRemoteImage = async (
  remoteUrl: string,
  userId: string,
  tool: string
): Promise<string> => {
  const day = new Date().toISOString().slice(0, 10);
  const dir = path.join(GENERATED_ROOT, userId, tool, day);
  await ensureDir(dir);

  // download as arraybuffer to avoid stream edge cases
  const res = await axios.get(remoteUrl, {
    responseType: 'arraybuffer',
    timeout: 30000,
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
    validateStatus: (s) => s >= 200 && s < 300,
  });

  const ext =
    safeExtFromUrl(remoteUrl) ||
    safeExtFromContentType(res.headers?.['content-type']);
  const filename = `${crypto.randomUUID?.() || crypto.randomBytes(16).toString('hex')}${ext}`;
  const fullPath = path.join(dir, filename);

  await fs.promises.writeFile(fullPath, Buffer.from(res.data));

  // Public URL path (served by static middleware)
  return `/generated/${userId}/${tool}/${day}/${filename}`;
};

