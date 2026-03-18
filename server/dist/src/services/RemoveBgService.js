"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../../constants/constants");
const REMOVE_BG_URL = 'https://api.picsart.io/tools/1.0/removebg';
const removeBackground = async (imageUrl) => {
    var _a, _b;
    try {
        const res = await axios_1.default.post(REMOVE_BG_URL, {
            image_url: imageUrl,
            output_type: 'cutout',
        }, { headers: constants_1.DEFAULT_HEADERS });
        if ((_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.url) {
            return { status: constants_1.SERVICE_STATUS.SUCCESS, data: res.data.data };
        }
        return { status: constants_1.SERVICE_STATUS.ERROR, data: null };
    }
    catch (e) {
        console.log(e);
        return { status: constants_1.SERVICE_STATUS.ERROR, data: null };
    }
};
exports.default = { removeBackground };
//# sourceMappingURL=RemoveBgService.js.map