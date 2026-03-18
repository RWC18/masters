"use strict";
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
const router = express_1.default.Router();
// ─── T2I ────────────────────────────────────────────────────────────────────
const getT2ITransactionId = async (req, res) => {
    const prompt = req.body.prompt;
    try {
        const response = await T2ImageService_1.default.getT2ImageTransactionID(prompt);
        if (response.status === constants_1.SERVICE_STATUS.SUCCESS) {
            res.status(200).json({ status: constants_1.SERVICE_STATUS.SUCCESS, data: response.data });
        }
        else {
            res.status(400).json({ status: constants_1.SERVICE_STATUS.ERROR, data: response.data });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ status: constants_1.SERVICE_STATUS.ERROR, data: null });
    }
};
const getT2IResults = async (req, res) => {
    const tid = req.query.tid;
    if (!tid) {
        return res.status(400).json({ status: constants_1.SERVICE_STATUS.ERROR, data: 'Transaction ID is required' });
    }
    try {
        const response = await T2ImageService_1.default.getT2ImageResults(tid);
        if (response.status === constants_1.SERVICE_STATUS.SUCCESS) {
            res.status(200).json({ status: constants_1.SERVICE_STATUS.SUCCESS, data: response.data });
        }
        else {
            res.status(400).json({ status: constants_1.SERVICE_STATUS.ERROR, data: response.data });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ status: constants_1.SERVICE_STATUS.ERROR, data: null });
    }
};
router.post('/t2i', (req, res) => {
    getT2ITransactionId(req, res);
});
router.get('/t2i', (req, res) => {
    getT2IResults(req, res);
});
// ─── Avatar ─────────────────────────────────────────────────────────────────
const getAvatarInferenceId = async (req, res) => {
    const { image_url, prompt, count } = req.body;
    if (!image_url || !prompt) {
        return res.status(400).json({ status: constants_1.SERVICE_STATUS.ERROR, data: 'image_url and prompt are required' });
    }
    try {
        const response = await AvatarService_1.default.getAvatarInferenceId(image_url, prompt, count || 4);
        if (response.status === constants_1.SERVICE_STATUS.SUCCESS) {
            res.status(200).json({ status: constants_1.SERVICE_STATUS.SUCCESS, data: response.data });
        }
        else {
            res.status(400).json({ status: constants_1.SERVICE_STATUS.ERROR, data: response.data });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ status: constants_1.SERVICE_STATUS.ERROR, data: null });
    }
};
const getAvatarResults = async (req, res) => {
    const tid = req.query.tid;
    if (!tid) {
        return res.status(400).json({ status: constants_1.SERVICE_STATUS.ERROR, data: 'Inference ID is required' });
    }
    try {
        const response = await AvatarService_1.default.getAvatarResults(tid);
        if (response.status === constants_1.SERVICE_STATUS.SUCCESS) {
            res.status(200).json({ status: constants_1.SERVICE_STATUS.SUCCESS, data: response.data });
        }
        else {
            res.status(400).json({ status: constants_1.SERVICE_STATUS.ERROR, data: response.data });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ status: constants_1.SERVICE_STATUS.ERROR, data: null });
    }
};
router.post('/avatar', (req, res) => {
    getAvatarInferenceId(req, res);
});
router.get('/avatar', (req, res) => {
    getAvatarResults(req, res);
});
// ─── Logo Generation ────────────────────────────────────────────────────────
const getLogoInferenceId = async (req, res) => {
    const { brand_name, business_description, color_tone, count } = req.body;
    if (!brand_name) {
        return res.status(400).json({ status: constants_1.SERVICE_STATUS.ERROR, data: 'brand_name is required' });
    }
    try {
        const response = await LogoGenService_1.default.getLogoInferenceId(brand_name, business_description || '', color_tone || 'Auto', count || 6);
        if (response.status === constants_1.SERVICE_STATUS.SUCCESS) {
            res.status(200).json({ status: constants_1.SERVICE_STATUS.SUCCESS, data: response.data });
        }
        else {
            res.status(400).json({ status: constants_1.SERVICE_STATUS.ERROR, data: response.data });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ status: constants_1.SERVICE_STATUS.ERROR, data: null });
    }
};
const getLogoResults = async (req, res) => {
    const tid = req.query.tid;
    if (!tid) {
        return res.status(400).json({ status: constants_1.SERVICE_STATUS.ERROR, data: 'Inference ID is required' });
    }
    try {
        const response = await LogoGenService_1.default.getLogoResults(tid);
        if (response.status === constants_1.SERVICE_STATUS.SUCCESS) {
            res.status(200).json({ status: constants_1.SERVICE_STATUS.SUCCESS, data: response.data });
        }
        else {
            res.status(400).json({ status: constants_1.SERVICE_STATUS.ERROR, data: response.data });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ status: constants_1.SERVICE_STATUS.ERROR, data: null });
    }
};
router.post('/logo', (req, res) => {
    getLogoInferenceId(req, res);
});
router.get('/logo', (req, res) => {
    getLogoResults(req, res);
});
// ─── Remove Background ──────────────────────────────────────────────────────
const removeBackground = async (req, res) => {
    const { image_url } = req.body;
    if (!image_url) {
        return res.status(400).json({ status: constants_1.SERVICE_STATUS.ERROR, data: 'image_url is required' });
    }
    try {
        const response = await RemoveBgService_1.default.removeBackground(image_url);
        if (response.status === constants_1.SERVICE_STATUS.SUCCESS) {
            res.status(200).json({ status: constants_1.SERVICE_STATUS.SUCCESS, data: response.data });
        }
        else {
            res.status(400).json({ status: constants_1.SERVICE_STATUS.ERROR, data: response.data });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ status: constants_1.SERVICE_STATUS.ERROR, data: null });
    }
};
router.post('/removebg', (req, res) => {
    removeBackground(req, res);
});
exports.default = router;
//# sourceMappingURL=GenerationController.js.map