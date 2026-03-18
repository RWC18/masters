"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareAccessToken = exports.generateAccessToken = exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = async (originPassword) => {
    const saltRounds = 10;
    return await bcrypt_1.default.hash(originPassword, saltRounds);
};
exports.hashPassword = hashPassword;
const comparePassword = async (originPassword, hashedPassword) => {
    return await bcrypt_1.default.compare(originPassword, hashedPassword);
};
exports.comparePassword = comparePassword;
const generateAccessToken = async (email) => {
    const saltRounds = 10;
    return await bcrypt_1.default.hash(email, saltRounds);
};
exports.generateAccessToken = generateAccessToken;
const compareAccessToken = async (originAccessToken, hashedAccessToken) => {
    return await bcrypt_1.default.compare(originAccessToken, hashedAccessToken);
};
exports.compareAccessToken = compareAccessToken;
//# sourceMappingURL=hash.js.map