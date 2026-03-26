"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.X_APP_AUTH = exports.AI_AUTH = exports.AI_API_URL = exports.AUTH_TOKEN = exports.SECRET_KEY = exports.MONGO_URL = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT || '';
exports.MONGO_URL = process.env.MONGO_URL || '';
exports.SECRET_KEY = process.env.SECRET_KEY || '';
exports.AUTH_TOKEN = process.env.AUTH_TOKEN || '';
exports.AI_API_URL = process.env.AI_API_URL || '';
// Back-compat: some envs used API_AUTH
exports.AI_AUTH = process.env.AI_AUTH || process.env.API_AUTH || '';
exports.X_APP_AUTH = process.env.X_APP_AUTH || '';
//# sourceMappingURL=keys.js.map