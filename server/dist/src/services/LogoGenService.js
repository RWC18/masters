"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../../constants/constants");
const getLogoInferenceId = async (brandName, businessDescription, colorTone, count) => {
    try {
        const res = await axios_1.default.post(`${constants_1.BASE_URL}/logo`, {
            brand_name: brandName,
            business_description: businessDescription,
            color_tone: colorTone || 'Auto',
            count,
            model: constants_1.LOGO_GEN_DEFAULT_MODEL,
        }, { headers: constants_1.DEFAULT_HEADERS });
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
const getLogoResults = async (inferenceId) => {
    try {
        const res = await axios_1.default.get(`${constants_1.BASE_URL}/logo/inferences/${inferenceId}`, { headers: constants_1.DEFAULT_HEADERS });
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
exports.default = { getLogoInferenceId, getLogoResults };
//# sourceMappingURL=LogoGenService.js.map