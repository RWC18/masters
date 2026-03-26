"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const users = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    full_name: {
        type: String,
        required: true,
    },
    access_token: {
        type: String,
        required: true,
    },
    credits: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
}, { timestamps: true });
exports.User = mongoose_1.default.model('users', users);
//# sourceMappingURL=users.js.map