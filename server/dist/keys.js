"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", { value: true });
exports.X_APP_AUTH = exports.AI_AUTH = exports.AI_API_URL = exports.AUTH_TOKEN = exports.SECRET_KEY = exports.MONGO_URL = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
_a = process.env, _b = _a.PORT, exports.PORT = _b === void 0 ? '' : _b, _c = _a.MONGO_URL, exports.MONGO_URL = _c === void 0 ? '' : _c, _d = _a.SECRET_KEY, exports.SECRET_KEY = _d === void 0 ? '' : _d, _e = _a.AUTH_TOKEN, exports.AUTH_TOKEN = _e === void 0 ? '' : _e, _f = _a.AI_API_URL, exports.AI_API_URL = _f === void 0 ? '' : _f, _g = _a.AI_AUTH, exports.AI_AUTH = _g === void 0 ? '' : _g, _h = _a.X_APP_AUTH, exports.X_APP_AUTH = _h === void 0 ? '' : _h;
//# sourceMappingURL=keys.js.map