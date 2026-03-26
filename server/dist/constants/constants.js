"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOGO_GEN_DEFAULT_MODEL = exports.AI_API_BASE_URL = exports.AI_API_HEADERS = exports.DEFAULT_HEADERS = exports.BASE_URL = exports.SERVICE_STATUS = exports.AVATAR_BASE_URL = exports.DEFAULT_NEGATIVE_PROMPT = exports.IMAGE_TO_IMAGE_BODY = exports.TEXT_2_IMAGE_BODY = exports.DEFAULT_CATCH_MESSAGE = exports.LOGIN_MESSAGES = exports.REGISTRATION_MESSAGES = void 0;
const keys_1 = require("../keys");
exports.REGISTRATION_MESSAGES = {
    NO_PASS: 'Password is required!',
    NO_EMAIL: 'Email is required!',
    NO_FULLNAME: 'Full name is required!',
    EMAIL_EXISTS: 'User with this email already exists!',
    SUCCESS: 'User successfully created!',
    CATCH: "Can't create new user, please try again later!",
};
exports.LOGIN_MESSAGES = {
    NO_PASS: 'Password is required!',
    NO_EMAIL: 'Email is required!',
    EMAIL_NOT_EXISTS: 'User with this email doesnt exists, please register first!',
    SUCCESS: 'User successfully loged in!',
    CATCH: 'Password is not correct!',
};
exports.DEFAULT_CATCH_MESSAGE = "Something wen't wrong, please try again later!";
exports.TEXT_2_IMAGE_BODY = {
    width: 1024,
    height: 1024,
    model: 'urn:air:picsart:model:picsart:fluxt2i@1',
    count: 4,
};
// Used by I2ImageService. Keep minimal defaults; service overrides caption/image_url.
exports.IMAGE_TO_IMAGE_BODY = {
    width: 1024,
    height: 1024,
    // If your provider requires a model, set it here; otherwise it can be omitted.
    // model: '...',
};
exports.DEFAULT_NEGATIVE_PROMPT = 'bad anatomy, bad proportions, blurry, cloned face, cropped, deformed, dehydrated, disfigured, duplicate, error, extra arms, extra fingers, extra legs, extra limbs, fused fingers, gross proportions, jpeg artifacts, long neck, low quality, lowres, malformed limbs, missing arms, missing legs, morbid, mutated hands, mutation, mutilated, out of frame, poorly drawn face, poorly drawn hands, signature, text, too many fingers, ugly, username, watermark, worst quality';
exports.AVATAR_BASE_URL = 'https://genai-avatars-api.picsart.io/v1/avatars/instant';
exports.SERVICE_STATUS = {
    SUCCESS: 'success',
    ERROR: 'error',
    PROCESSING: 'processing',
    QUEUED: 'queued',
};
exports.BASE_URL = 'https://genai-api.picsart.io/v1';
exports.DEFAULT_HEADERS = {
    accept: 'application/json',
    'content-type': 'application/json',
    'X-Picsart-API-Key': keys_1.AUTH_TOKEN,
};
exports.AI_API_HEADERS = {
    'Content-Type': 'application/json',
    'x-app-authorization': `Bearer ${keys_1.X_APP_AUTH}`,
    Authorization: `Bearer ${keys_1.AI_AUTH}`,
    platform: 'website',
    aiTouchPoint: 'aiportal',
};
exports.AI_API_BASE_URL = keys_1.AI_API_URL;
exports.LOGO_GEN_DEFAULT_MODEL = 'urn:air:fluxai:model:fluxai:flux-2-pro@1';
//# sourceMappingURL=constants.js.map