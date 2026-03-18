"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants/constants");
const axios_1 = __importDefault(require("axios"));
const getT2ImageTransactionID = async (prompt) => {
    try {
        const res = await axios_1.default.post(`${constants_1.BASE_URL}/text2image`, Object.assign(Object.assign({}, constants_1.TEXT_2_IMAGE_BODY), { prompt: prompt }), { headers: constants_1.DEFAULT_HEADERS });
        console.log(res.status);
        if (res.data.status !== constants_1.SERVICE_STATUS.ERROR) {
            return { status: constants_1.SERVICE_STATUS.SUCCESS, data: res.data };
        }
        else {
            return { status: constants_1.SERVICE_STATUS.ERROR, data: null };
        }
    }
    catch (e) {
        console.log(e);
        return { status: constants_1.SERVICE_STATUS.ERROR, data: null };
    }
};
const getT2ImageResults = async (tid) => {
    try {
        const res = await axios_1.default.get(`${constants_1.BASE_URL}/text2image/inferences/${tid}`, { headers: constants_1.DEFAULT_HEADERS });
        if (res.data.status !== constants_1.SERVICE_STATUS.ERROR) {
            return { status: constants_1.SERVICE_STATUS.SUCCESS, data: res.data };
        }
        else {
            return { status: constants_1.SERVICE_STATUS.ERROR, data: null };
        }
    }
    catch (e) {
        console.log(e);
        return { status: constants_1.SERVICE_STATUS.ERROR, data: null };
    }
};
exports.default = { getT2ImageTransactionID, getT2ImageResults };
//# sourceMappingURL=T2ImageService.js.map