"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../../constants/constants");
const getAvatarInferenceId = async (imageUrl, prompt, count) => {
    try {
        const res = await axios_1.default.post(constants_1.AVATAR_BASE_URL, {
            images: [imageUrl],
            prompt,
            negative_prompt: constants_1.DEFAULT_NEGATIVE_PROMPT,
            count,
        }, { headers: constants_1.DEFAULT_HEADERS });
        if (res.data.inference_id) {
            return { status: constants_1.SERVICE_STATUS.SUCCESS, data: res.data };
        }
        return { status: constants_1.SERVICE_STATUS.ERROR, data: null };
    }
    catch (e) {
        console.log(e);
        return { status: constants_1.SERVICE_STATUS.ERROR, data: null };
    }
};
const getAvatarResults = async (inferenceId) => {
    try {
        const res = await axios_1.default.get(`${constants_1.AVATAR_BASE_URL}/${inferenceId}`, { headers: constants_1.DEFAULT_HEADERS });
        if (res.data.status !== constants_1.SERVICE_STATUS.ERROR) {
            return { status: constants_1.SERVICE_STATUS.SUCCESS, data: res.data };
        }
        return { status: constants_1.SERVICE_STATUS.ERROR, data: null };
    }
    catch (e) {
        console.log(e);
        return { status: constants_1.SERVICE_STATUS.ERROR, data: null };
    }
};
exports.default = { getAvatarInferenceId, getAvatarResults };
//# sourceMappingURL=AvatarService.js.map