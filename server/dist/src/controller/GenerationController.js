"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const T2ImageService_1 = __importDefault(require("../services/T2ImageService"));
const AvatarService_1 = __importDefault(require("../services/AvatarService"));
const LogoGenService_1 = __importDefault(require("../services/LogoGenService"));
const RemoveBgService_1 = __importDefault(require("../services/RemoveBgService"));
const constants_1 = require("../../constants/constants");
const authMiddleware_1 = require("../middleware/authMiddleware");
const CreditService_1 = __importStar(require("../services/CreditService"));
const router = express_1.default.Router();
const insufficient = (res, balance, required) => {
    res.status(402).json({
        status: constants_1.SERVICE_STATUS.ERROR,
        message: 'Insufficient credits',
        balance,
        required,
    });
};
const getT2ITransactionId = async (req, res) => {
    var _a;
    if (!req.userId) {
        res.status(401).json({ status: constants_1.SERVICE_STATUS.ERROR, message: 'Unauthorized' });
        return;
    }
    const prompt = req.body.prompt;
    const count = Math.max(1, Number(((_a = req.body) === null || _a === void 0 ? void 0 : _a.count) || 4));
    const debitAmount = count * CreditService_1.TOOL_COSTS.t2i;
    const debit = await CreditService_1.default.spendCredits(req.userId, debitAmount, `T2I (${count})`, 't2i', { count });
    if (!debit.ok)
        return insufficient(res, debit.balance, debitAmount);
    try {
        const response = await T2ImageService_1.default.getT2ImageTransactionID(prompt);
        if (response.status === constants_1.SERVICE_STATUS.SUCCESS) {
            res.status(200).json({ status: constants_1.SERVICE_STATUS.SUCCESS, data: response.data, balance: debit.balance, charged: debitAmount });
            return;
        }
        await CreditService_1.default.refundCredits(req.userId, debitAmount, 'T2I start failed', 't2i', { count });
        res.status(400).json({ status: constants_1.SERVICE_STATUS.ERROR, data: response.data });
    }
    catch (e) {
        console.log(e);
        await CreditService_1.default.refundCredits(req.userId, debitAmount, 'T2I exception', 't2i', { count });
        res.status(500).json({ status: constants_1.SERVICE_STATUS.ERROR, data: null });
    }
};
const getT2IResults = async (req, res) => {
    const tid = req.query.tid;
    if (!tid) {
        res.status(400).json({ status: constants_1.SERVICE_STATUS.ERROR, data: 'Transaction ID is required' });
        return;
    }
    try {
        const response = await T2ImageService_1.default.getT2ImageResults(tid);
        if (response.status === constants_1.SERVICE_STATUS.SUCCESS) {
            res.status(200).json({ status: constants_1.SERVICE_STATUS.SUCCESS, data: response.data });
            return;
        }
        res.status(400).json({ status: constants_1.SERVICE_STATUS.ERROR, data: response.data });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ status: constants_1.SERVICE_STATUS.ERROR, data: null });
    }
};
const getAvatarInferenceId = async (req, res) => {
    if (!req.userId) {
        res.status(401).json({ status: constants_1.SERVICE_STATUS.ERROR, message: 'Unauthorized' });
        return;
    }
    const { image_url, prompt, count } = req.body;
    if (!image_url || !prompt) {
        res.status(400).json({ status: constants_1.SERVICE_STATUS.ERROR, data: 'image_url and prompt are required' });
        return;
    }
    const itemCount = Math.max(1, Number(count || 4));
    const debitAmount = itemCount * CreditService_1.TOOL_COSTS.avatar;
    const debit = await CreditService_1.default.spendCredits(req.userId, debitAmount, `Avatar (${itemCount})`, 'avatar', { count: itemCount });
    if (!debit.ok)
        return insufficient(res, debit.balance, debitAmount);
    try {
        const response = await AvatarService_1.default.getAvatarInferenceId(image_url, prompt, itemCount);
        if (response.status === constants_1.SERVICE_STATUS.SUCCESS) {
            res.status(200).json({ status: constants_1.SERVICE_STATUS.SUCCESS, data: response.data, balance: debit.balance, charged: debitAmount });
            return;
        }
        await CreditService_1.default.refundCredits(req.userId, debitAmount, 'Avatar start failed', 'avatar', { count: itemCount });
        res.status(400).json({ status: constants_1.SERVICE_STATUS.ERROR, data: response.data });
    }
    catch (e) {
        console.log(e);
        await CreditService_1.default.refundCredits(req.userId, debitAmount, 'Avatar exception', 'avatar', { count: itemCount });
        res.status(500).json({ status: constants_1.SERVICE_STATUS.ERROR, data: null });
    }
};
const getAvatarResults = async (req, res) => {
    const tid = req.query.tid;
    if (!tid) {
        res.status(400).json({ status: constants_1.SERVICE_STATUS.ERROR, data: 'Inference ID is required' });
        return;
    }
    try {
        const response = await AvatarService_1.default.getAvatarResults(tid);
        if (response.status === constants_1.SERVICE_STATUS.SUCCESS) {
            res.status(200).json({ status: constants_1.SERVICE_STATUS.SUCCESS, data: response.data });
            return;
        }
        res.status(400).json({ status: constants_1.SERVICE_STATUS.ERROR, data: response.data });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ status: constants_1.SERVICE_STATUS.ERROR, data: null });
    }
};
const getLogoInferenceId = async (req, res) => {
    if (!req.userId) {
        res.status(401).json({ status: constants_1.SERVICE_STATUS.ERROR, message: 'Unauthorized' });
        return;
    }
    const { brand_name, business_description, color_tone, count } = req.body;
    if (!brand_name) {
        res.status(400).json({ status: constants_1.SERVICE_STATUS.ERROR, data: 'brand_name is required' });
        return;
    }
    const itemCount = Math.max(1, Number(count || 6));
    const debitAmount = itemCount * CreditService_1.TOOL_COSTS.logo;
    const debit = await CreditService_1.default.spendCredits(req.userId, debitAmount, `Logo (${itemCount})`, 'logo', { count: itemCount });
    if (!debit.ok)
        return insufficient(res, debit.balance, debitAmount);
    try {
        const response = await LogoGenService_1.default.getLogoInferenceId(brand_name, business_description || '', color_tone || 'Auto', itemCount);
        if (response.status === constants_1.SERVICE_STATUS.SUCCESS) {
            res.status(200).json({ status: constants_1.SERVICE_STATUS.SUCCESS, data: response.data, balance: debit.balance, charged: debitAmount });
            return;
        }
        await CreditService_1.default.refundCredits(req.userId, debitAmount, 'Logo start failed', 'logo', { count: itemCount });
        res.status(400).json({ status: constants_1.SERVICE_STATUS.ERROR, data: response.data });
    }
    catch (e) {
        console.log(e);
        await CreditService_1.default.refundCredits(req.userId, debitAmount, 'Logo exception', 'logo', { count: itemCount });
        res.status(500).json({ status: constants_1.SERVICE_STATUS.ERROR, data: null });
    }
};
const getLogoResults = async (req, res) => {
    const tid = req.query.tid;
    if (!tid) {
        res.status(400).json({ status: constants_1.SERVICE_STATUS.ERROR, data: 'Inference ID is required' });
        return;
    }
    try {
        const response = await LogoGenService_1.default.getLogoResults(tid);
        if (response.status === constants_1.SERVICE_STATUS.SUCCESS) {
            res.status(200).json({ status: constants_1.SERVICE_STATUS.SUCCESS, data: response.data });
            return;
        }
        res.status(400).json({ status: constants_1.SERVICE_STATUS.ERROR, data: response.data });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ status: constants_1.SERVICE_STATUS.ERROR, data: null });
    }
};
const removeBackground = async (req, res) => {
    if (!req.userId) {
        res.status(401).json({ status: constants_1.SERVICE_STATUS.ERROR, message: 'Unauthorized' });
        return;
    }
    const { image_url } = req.body;
    if (!image_url) {
        res.status(400).json({ status: constants_1.SERVICE_STATUS.ERROR, data: 'image_url is required' });
        return;
    }
    const debitAmount = CreditService_1.TOOL_COSTS.removebg;
    const debit = await CreditService_1.default.spendCredits(req.userId, debitAmount, 'Remove background', 'removebg');
    if (!debit.ok)
        return insufficient(res, debit.balance, debitAmount);
    try {
        const response = await RemoveBgService_1.default.removeBackground(image_url);
        if (response.status === constants_1.SERVICE_STATUS.SUCCESS) {
            res.status(200).json({ status: constants_1.SERVICE_STATUS.SUCCESS, data: response.data, balance: debit.balance, charged: debitAmount });
            return;
        }
        await CreditService_1.default.refundCredits(req.userId, debitAmount, 'RemoveBg start failed', 'removebg');
        res.status(400).json({ status: constants_1.SERVICE_STATUS.ERROR, data: response.data });
    }
    catch (e) {
        console.log(e);
        await CreditService_1.default.refundCredits(req.userId, debitAmount, 'RemoveBg exception', 'removebg');
        res.status(500).json({ status: constants_1.SERVICE_STATUS.ERROR, data: null });
    }
};
router.post('/t2i', authMiddleware_1.authMiddleware, (req, res) => getT2ITransactionId(req, res));
router.get('/t2i', authMiddleware_1.authMiddleware, (req, res) => getT2IResults(req, res));
router.post('/avatar', authMiddleware_1.authMiddleware, (req, res) => getAvatarInferenceId(req, res));
router.get('/avatar', authMiddleware_1.authMiddleware, (req, res) => getAvatarResults(req, res));
router.post('/logo', authMiddleware_1.authMiddleware, (req, res) => getLogoInferenceId(req, res));
router.get('/logo', authMiddleware_1.authMiddleware, (req, res) => getLogoResults(req, res));
router.post('/removebg', authMiddleware_1.authMiddleware, (req, res) => removeBackground(req, res));
exports.default = router;
//# sourceMappingURL=GenerationController.js.map