"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.History = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const history = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    tool_name: {
        type: String,
        required: true,
    },
    result: {
        type: Object,
        required: true,
    },
}, { timestamps: true });
exports.History = mongoose_1.default.model('history', history);
//# sourceMappingURL=history.js.map