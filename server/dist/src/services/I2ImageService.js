"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const constants_1 = require("../../constants/constants");
const uploadImage = async (fileBuffer, filename, mimetype) => {
    var _a, _b;
    try {
        const formData = new form_data_1.default();
        formData.append('image', fileBuffer, {
            filename,
            contentType: mimetype,
        });
        const res = await axios_1.default.post(`${constants_1.AI_API_BASE_URL}/photos/${filename}`, formData, {
            headers: Object.assign(Object.assign({}, constants_1.AI_API_HEADERS), formData.getHeaders()),
            maxBodyLength: Infinity,
            maxContentLength: Infinity,
        });
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
const generateI2Image = async (caption, imageUrl) => {
    try {
        const res = await axios_1.default.post(`${constants_1.AI_API_BASE_URL}/image-to-image/v1/task`, Object.assign(Object.assign({}, constants_1.IMAGE_TO_IMAGE_BODY), { caption, image_url: imageUrl }), { headers: constants_1.AI_API_HEADERS });
        if (res.data.status === 'DONE') {
            return { status: constants_1.SERVICE_STATUS.SUCCESS, data: res.data.data };
        }
        return { status: constants_1.SERVICE_STATUS.ERROR, data: null };
    }
    catch (e) {
        console.log(e);
        return { status: constants_1.SERVICE_STATUS.ERROR, data: null };
    }
};
exports.default = { uploadImage, generateI2Image };
//# sourceMappingURL=I2ImageService.js.map