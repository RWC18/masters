"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuthMiddleware = exports.authMiddleware = void 0;
const AuthService_1 = __importDefault(require("../services/AuthService"));
const authMiddleware = async (req, res, next) => {
    var _a, _b;
    const authHeader = req.headers.authorization;
    const token = (authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer ')) ? authHeader.slice(7) : (_a = req.body) === null || _a === void 0 ? void 0 : _a.access_token;
    if (!token) {
        res.status(401).json({ status: 'error', message: 'Unauthorized' });
        return;
    }
    const response = await AuthService_1.default.getUserByAccessToken(token);
    if (response.status && ((_b = response.result) === null || _b === void 0 ? void 0 : _b._id)) {
        req.userId = response.result._id.toString();
        next();
    }
    else {
        res.status(401).json({ status: 'error', message: 'Invalid token' });
        return;
    }
};
exports.authMiddleware = authMiddleware;
/** Optional auth: sets req.userId if valid token present, does not block request */
const optionalAuthMiddleware = async (req, res, next) => {
    var _a, _b;
    const authHeader = req.headers.authorization;
    const token = (authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer ')) ? authHeader.slice(7) : (_a = req.body) === null || _a === void 0 ? void 0 : _a.access_token;
    if (!token) {
        next();
        return;
    }
    const response = await AuthService_1.default.getUserByAccessToken(token);
    if (response.status && ((_b = response.result) === null || _b === void 0 ? void 0 : _b._id)) {
        req.userId = response.result._id.toString();
    }
    next();
};
exports.optionalAuthMiddleware = optionalAuthMiddleware;
//# sourceMappingURL=authMiddleware.js.map