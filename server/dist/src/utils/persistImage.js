"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.persistRemoteImage = void 0;
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const GENERATED_ROOT = path_1.default.join(process.cwd(), 'public', 'generated');
const ensureDir = async (dir) => {
    await fs_1.default.promises.mkdir(dir, { recursive: true });
};
const safeExtFromContentType = (contentType) => {
    const ct = (contentType || '').toLowerCase();
    if (ct.includes('png'))
        return '.png';
    if (ct.includes('jpeg') || ct.includes('jpg'))
        return '.jpg';
    if (ct.includes('webp'))
        return '.webp';
    return '.png';
};
const safeExtFromUrl = (url) => {
    try {
        const u = new URL(url);
        const ext = path_1.default.extname(u.pathname);
        if (ext && ext.length <= 5)
            return ext;
        return null;
    }
    catch (_a) {
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
const persistRemoteImage = async (remoteUrl, userId, tool) => {
    var _a, _b;
    const day = new Date().toISOString().slice(0, 10);
    const dir = path_1.default.join(GENERATED_ROOT, userId, tool, day);
    await ensureDir(dir);
    // download as arraybuffer to avoid stream edge cases
    const res = await axios_1.default.get(remoteUrl, {
        responseType: 'arraybuffer',
        timeout: 30000,
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        validateStatus: (s) => s >= 200 && s < 300,
    });
    const ext = safeExtFromUrl(remoteUrl) ||
        safeExtFromContentType((_a = res.headers) === null || _a === void 0 ? void 0 : _a['content-type']);
    const filename = `${((_b = crypto_1.default.randomUUID) === null || _b === void 0 ? void 0 : _b.call(crypto_1.default)) || crypto_1.default.randomBytes(16).toString('hex')}${ext}`;
    const fullPath = path_1.default.join(dir, filename);
    await fs_1.default.promises.writeFile(fullPath, Buffer.from(res.data));
    // Public URL path (served by static middleware)
    return `/generated/${userId}/${tool}/${day}/${filename}`;
};
exports.persistRemoteImage = persistRemoteImage;
//# sourceMappingURL=persistImage.js.map