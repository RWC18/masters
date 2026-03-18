"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const history_1 = require("../models/history");
const authMiddleware_1 = require("../middleware/authMiddleware");
const constants_1 = require("../../constants/constants");
const persistImage_1 = require("../utils/persistImage");
const router = express_1.default.Router();
const TOOL_NAMES = ['t2i', 'avatar', 'logo', 'removebg'];
const saveHistory = async (req, res) => {
    const { tool_name, result } = req.body;
    if (!req.userId) {
        res.status(401).json({ status: constants_1.SERVICE_STATUS.ERROR, message: 'Unauthorized' });
        return;
    }
    if (!tool_name || !result || typeof result !== 'object') {
        res.status(400).json({ status: constants_1.SERVICE_STATUS.ERROR, message: 'tool_name and result are required' });
        return;
    }
    if (!TOOL_NAMES.includes(tool_name)) {
        res.status(400).json({ status: constants_1.SERVICE_STATUS.ERROR, message: 'Invalid tool_name' });
        return;
    }
    try {
        const userId = req.userId;
        const tool = tool_name;
        const nextResult = Object.assign({}, result);
        // Persist multi-image generations
        if (Array.isArray(result.images)) {
            const images = result.images;
            const persisted = [];
            for (const img of images) {
                if (typeof img === 'string' && img.startsWith('http')) {
                    try {
                        persisted.push(await (0, persistImage_1.persistRemoteImage)(img, userId, tool));
                    }
                    catch (_a) {
                        // fallback to original if persist fails
                        persisted.push(img);
                    }
                }
            }
            if (persisted.length > 0)
                nextResult.images = persisted;
        }
        // Persist removebg style payloads
        if (typeof result.original_url === 'string' && result.original_url.startsWith('http')) {
            try {
                nextResult.original_url = await (0, persistImage_1.persistRemoteImage)(result.original_url, userId, tool);
            }
            catch (_b) {
                nextResult.original_url = result.original_url;
            }
        }
        if (typeof result.result_url === 'string' && result.result_url.startsWith('http')) {
            try {
                nextResult.result_url = await (0, persistImage_1.persistRemoteImage)(result.result_url, userId, tool);
            }
            catch (_c) {
                nextResult.result_url = result.result_url;
            }
        }
        const doc = new history_1.History({
            user_id: new mongoose_1.default.Types.ObjectId(req.userId),
            tool_name,
            result: nextResult,
        });
        await doc.save();
        res.status(200).json({ status: constants_1.SERVICE_STATUS.SUCCESS, data: { id: doc._id } });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ status: constants_1.SERVICE_STATUS.ERROR, data: null });
    }
};
const getHistory = async (req, res) => {
    if (!req.userId) {
        res.status(401).json({ status: constants_1.SERVICE_STATUS.ERROR, message: 'Unauthorized' });
        return;
    }
    const tool = req.query.tool;
    try {
        const filter = {
            user_id: new mongoose_1.default.Types.ObjectId(req.userId),
        };
        if (tool && TOOL_NAMES.includes(tool)) {
            filter.tool_name = tool;
        }
        const items = await history_1.History.find(filter)
            .sort({ createdAt: -1 })
            .lean();
        res.status(200).json({ status: constants_1.SERVICE_STATUS.SUCCESS, data: items });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ status: constants_1.SERVICE_STATUS.ERROR, data: null });
    }
};
router.post('/history', authMiddleware_1.authMiddleware, saveHistory);
router.get('/history', authMiddleware_1.authMiddleware, getHistory);
exports.default = router;
//# sourceMappingURL=HistoryController.js.map